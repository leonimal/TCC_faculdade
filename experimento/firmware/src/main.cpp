#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <Preferences.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <esp_netif.h>
#include <esp_system.h>
#include <time.h>

#include <Adafruit_SHT31.h>
#include <Adafruit_VEML7700.h>

#include "FirmwareConfig.h"
#include "QueueStore.h"

namespace {

constexpr char kFirmwareVersion[] = "0.1.0";
constexpr uint32_t kWifiReconnectIntervalMs = 10000;
constexpr uint32_t kTimeSyncRetryIntervalMs = 60000;
constexpr uint32_t kSendAttemptIntervalMs = 1000;
constexpr uint32_t kSensorRetryIntervalMs = 30000;
constexpr time_t kEarliestSynchronizedEpoch = 1704067200;  // 2024-01-01 UTC

QueueStore queueStore;
Preferences settingsPreferences;
Adafruit_SHT31 sht31 = Adafruit_SHT31();
Adafruit_VEML7700 veml7700 = Adafruit_VEML7700();

String bootId;
String lastConfirmedAt;
String offlineObservedAt;
bool i2cConfigured = false;
bool sht31Ready = false;
bool veml7700Ready = false;
bool wasOnline = false;
bool pendingOfflineStatus = false;
uint32_t lastWifiAttemptAt = 0;
uint32_t lastTimeSyncAttemptAt = 0;
uint32_t lastSensorAttemptAt = 0;
uint32_t lastSampleAt = 0;
uint32_t lastSendAttemptAt = 0;
uint32_t lastConfigurationPollAt = 0;
uint32_t lastStatusAt = 0;

class DeviceSettings {
 public:
  void begin() {
    settingsPreferences.begin("settings", false);
    samplingIntervalSeconds_ = settingsPreferences.getUInt(
        "interval", firmware_config::kDefaultSamplingIntervalSeconds);
    configurationVersion_ = settingsPreferences.getUInt("config-ver", 1);
    sequenceNumber_ = settingsPreferences.getULong("sequence", 0);

    if (!isValidInterval(samplingIntervalSeconds_)) {
      samplingIntervalSeconds_ = firmware_config::kDefaultSamplingIntervalSeconds;
      settingsPreferences.putUInt("interval", samplingIntervalSeconds_);
    }
  }

  uint32_t samplingIntervalSeconds() const { return samplingIntervalSeconds_; }
  uint32_t configurationVersion() const { return configurationVersion_; }

  uint32_t nextSequenceNumber() {
    const uint32_t value = sequenceNumber_++;
    settingsPreferences.putULong("sequence", sequenceNumber_);
    return value;
  }

  bool applyConfiguration(uint32_t version, uint32_t intervalSeconds) {
    if (!isValidInterval(intervalSeconds)) {
      return false;
    }
    samplingIntervalSeconds_ = intervalSeconds;
    configurationVersion_ = version;
    settingsPreferences.putUInt("interval", samplingIntervalSeconds_);
    settingsPreferences.putUInt("config-ver", configurationVersion_);
    return true;
  }

 private:
  static bool isValidInterval(uint32_t intervalSeconds) {
    return intervalSeconds >= firmware_config::kMinimumSamplingIntervalSeconds &&
           intervalSeconds <= firmware_config::kMaximumSamplingIntervalSeconds;
  }

  uint32_t samplingIntervalSeconds_ = firmware_config::kDefaultSamplingIntervalSeconds;
  uint32_t configurationVersion_ = 1;
  uint32_t sequenceNumber_ = 0;
};

DeviceSettings deviceSettings;

// Trust anchor observed for the HTTPS certificate currently presented by
// *.trycloudflare.com. It validates the server without setInsecure when the
// node is outside the local network. Review it if the public issuer changes.
constexpr char kTryCloudflareRootCa[] = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDejCCAmKgAwIBAgIQf+UwvzMTQ77dghYQST2KGzANBgkqhkiG9w0BAQsFADBX
MQswCQYDVQQGEwJCRTEZMBcGA1UEChMQR2xvYmFsU2lnbiBudi1zYTEQMA4GA1UE
CxMHUm9vdCBDQTEbMBkGA1UEAxMSR2xvYmFsU2lnbiBSb290IENBMB4XDTIzMTEx
NTAzNDMyMVoXDTI4MDEyODAwMDA0MlowRzELMAkGA1UEBhMCVVMxIjAgBgNVBAoT
GUdvb2dsZSBUcnVzdCBTZXJ2aWNlcyBMTEMxFDASBgNVBAMTC0dUUyBSb290IFI0
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE83Rzp2iLYK5DuDXFgTB7S0md+8Fhzube
Rr1r1WEYNa5A3XP3iZEwWus87oV8okB2O6nGuEfYKueSkWpz6bFyOZ8pn6KY019e
WIZlD6GEZQbR3IvJx3PIjGov5cSr0R2Ko4H/MIH8MA4GA1UdDwEB/wQEAwIBhjAd
BgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUgEzW63T/STaj1dj8tT7FavCUHYwwHwYDVR0jBBgwFoAUYHtmGkUN
l8qJUC99BM00qP/8/UswNgYIKwYBBQUHAQEEKjAoMCYGCCsGAQUFBzAChhpodHRw
Oi8vaS5wa2kuZ29vZy9nc3IxLmNydDAtBgNVHR8EJjAkMCKgIKAehhxodHRwOi8v
Yy5wa2kuZ29vZy9yL2dzcjEuY3JsMBMGA1UdIAQMMAowCAYGZ4EMAQIBMA0GCSqG
SIb3DQEBCwUAA4IBAQAYQrsPBtYDh5bjP2OBDwmkoWhIDDkic574y04tfzHpn+cJ
odI2D4SseesQ6bDrarZ7C30ddLibZatoKiws3UL9xnELz4ct92vID24FfVbiI1hY
+SW6FoVHkNeWIP0GCbaM4C6uVdF5dTUsMVs/ZbzNnIdCp5Gxmx5ejvEau8otR/Cs
kGN+hr/W5GvT1tMBjgWKZ1i4//emhA1JG1BbPzoLJQvyEotc03lXjTaCzv8mEbep
8RqZ7a2CPsgRbuvTPBwcOMBBmuFeU88+FSBX6+7iP0il8b4Z0QFqIwwMHfs/L6K1
vepuoxtGzi4CZ68zJpiq1UvSqTbFJjtbD4seiMHl
-----END CERTIFICATE-----
)EOF";

const IPAddress kPrimaryPublicDns(1, 1, 1, 1);
const IPAddress kSecondaryPublicDns(8, 8, 8, 8);

bool elapsed(uint32_t now, uint32_t previous, uint32_t interval) {
  return static_cast<uint32_t>(now - previous) >= interval;
}

bool hasPlaceholder(const char* value) {
  return value == nullptr || strstr(value, "ALTERAR_ANTES_DE_USAR") != nullptr;
}

bool networkConfigurationIsUsable() {
  return !hasPlaceholder(TCC_WIFI_SSID) && !hasPlaceholder(TCC_WIFI_PASSWORD) &&
         !hasPlaceholder(TCC_API_BASE_URL) && !hasPlaceholder(TCC_NODE_API_KEY);
}

String endpoint(const char* suffix) {
  String base(TCC_API_BASE_URL);
  while (base.endsWith("/")) {
    base.remove(base.length() - 1);
  }
  return base + suffix;
}

bool beginHttpClient(HTTPClient& http, WiFiClientSecure& secureClient,
                     const String& url) {
  if (url.startsWith("https://")) {
    secureClient.setCACert(kTryCloudflareRootCa);
    return http.begin(secureClient, url);
  }
  return http.begin(url);
}

bool configurePublicDns() {
  esp_netif_t* stationNetif = esp_netif_get_handle_from_ifkey("WIFI_STA_DEF");
  if (stationNetif == nullptr) {
    return false;
  }

  esp_netif_dns_info_t primary{};
  primary.ip.type = ESP_IPADDR_TYPE_V4;
  primary.ip.u_addr.ip4.addr = static_cast<uint32_t>(kPrimaryPublicDns);
  esp_netif_dns_info_t secondary{};
  secondary.ip.type = ESP_IPADDR_TYPE_V4;
  secondary.ip.u_addr.ip4.addr = static_cast<uint32_t>(kSecondaryPublicDns);

  return esp_netif_set_dns_info(stationNetif, ESP_NETIF_DNS_MAIN, &primary) == ESP_OK &&
         esp_netif_set_dns_info(stationNetif, ESP_NETIF_DNS_BACKUP, &secondary) == ESP_OK;
}

String makeUuid() {
  uint8_t bytes[16];
  for (uint8_t index = 0; index < sizeof(bytes); index += 4) {
    const uint32_t randomValue = esp_random();
    memcpy(bytes + index, &randomValue, sizeof(randomValue));
  }
  bytes[6] = static_cast<uint8_t>((bytes[6] & 0x0F) | 0x40);
  bytes[8] = static_cast<uint8_t>((bytes[8] & 0x3F) | 0x80);

  char value[37];
  snprintf(value, sizeof(value),
           "%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x",
           bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6],
           bytes[7], bytes[8], bytes[9], bytes[10], bytes[11], bytes[12], bytes[13],
           bytes[14], bytes[15]);
  return String(value);
}

bool synchronizedTimestamp(String& timestamp) {
  const time_t current = time(nullptr);
  if (current < kEarliestSynchronizedEpoch) {
    return false;
  }
  tm utcTime{};
  gmtime_r(&current, &utcTime);
  char value[25];
  snprintf(value, sizeof(value), "%04d-%02d-%02dT%02d:%02d:%02d.000Z",
           utcTime.tm_year + 1900, utcTime.tm_mon + 1, utcTime.tm_mday,
           utcTime.tm_hour, utcTime.tm_min, utcTime.tm_sec);
  timestamp = value;
  return true;
}

bool synchronizeTimeFromHttpDate(HTTPClient& http) {
  String currentTimestamp;
  if (synchronizedTimestamp(currentTimestamp)) {
    return true;
  }

  const String header = http.header("Date");
  if (header.isEmpty()) {
    return false;
  }

  tm utcTime{};
  if (strptime(header.c_str(), "%a, %d %b %Y %H:%M:%S GMT", &utcTime) == nullptr) {
    return false;
  }
  const time_t epoch = mktime(&utcTime);
  if (epoch < kEarliestSynchronizedEpoch) {
    return false;
  }

  timeval serverTime{epoch, 0};
  settimeofday(&serverTime, nullptr);
  Serial.println("RelÃ³gio sincronizado pelo horÃ¡rio da API local.");
  return true;
}

void maintainTimeSynchronization(uint32_t now) {
  String timestamp;
  if (WiFi.status() != WL_CONNECTED || synchronizedTimestamp(timestamp) ||
      !elapsed(now, lastTimeSyncAttemptAt, kTimeSyncRetryIntervalMs)) {
    return;
  }

  configTime(0, 0, "pool.ntp.org", "time.google.com", "time.cloudflare.com");
  lastTimeSyncAttemptAt = now;
  Serial.println("SincronizaÃ§Ã£o NTP solicitada; aguardando horÃ¡rio confiÃ¡vel.");
}

void beginWifi() {
  if (!networkConfigurationIsUsable()) {
    Serial.println("Configuração de rede/API ainda usa valores de exemplo.");
    return;
  }
  WiFi.mode(WIFI_STA);
  WiFi.begin(TCC_WIFI_SSID, TCC_WIFI_PASSWORD);
  lastWifiAttemptAt = millis();
  Serial.println("Tentativa de conexão Wi-Fi iniciada.");
}

void maintainWifi(uint32_t now) {
  const bool online = WiFi.status() == WL_CONNECTED;
  if (online) {
    if (!wasOnline) {
      Serial.printf("Wi-Fi conectado: %s\n", WiFi.localIP().toString().c_str());
      if (configurePublicDns()) {
        Serial.printf("Public DNS configured: %s, %s\n",
                      kPrimaryPublicDns.toString().c_str(),
                      kSecondaryPublicDns.toString().c_str());
      } else {
        Serial.println("Could not set public DNS; using hotspot DNS.");
      }
    }
    wasOnline = true;
    maintainTimeSynchronization(now);
    return;
  }

  if (wasOnline) {
    String observedAt;
    if (synchronizedTimestamp(observedAt)) {
      offlineObservedAt = observedAt;
    } else {
      offlineObservedAt = "";
    }
    pendingOfflineStatus = true;
    Serial.println("Wi-Fi desconectado; aquisição e fila local continuarão ativas.");
  }
  wasOnline = false;

  if (networkConfigurationIsUsable() &&
      elapsed(now, lastWifiAttemptAt, kWifiReconnectIntervalMs)) {
    WiFi.disconnect();
    WiFi.begin(TCC_WIFI_SSID, TCC_WIFI_PASSWORD);
    lastWifiAttemptAt = now;
  }
}

void initializeSensors() {
  if (firmware_config::kI2cSdaPin < 0 || firmware_config::kI2cSclPin < 0) {
    Serial.println("GPIOs I2C pendentes de confirmação física; sensores não iniciados.");
    return;
  }
  Wire.begin(firmware_config::kI2cSdaPin, firmware_config::kI2cSclPin);
  i2cConfigured = true;
  sht31Ready = sht31.begin(firmware_config::kSht31Address);
  veml7700Ready = veml7700.begin(&Wire);
  if (veml7700Ready) {
    veml7700.setGain(VEML7700_GAIN_1_8);
    veml7700.setIntegrationTime(VEML7700_IT_100MS);
  }
  Serial.printf("SHT31=%s; VEML7700=%s\n", sht31Ready ? "pronto" : "indisponível",
                veml7700Ready ? "pronto" : "indisponível");
}

void maintainSensors(uint32_t now) {
  if ((!sht31Ready || !veml7700Ready) &&
      elapsed(now, lastSensorAttemptAt, kSensorRetryIntervalMs)) {
    lastSensorAttemptAt = now;
    initializeSensors();
  }
}

void assignReading(JsonObject target, float value, float lowerLimit, float upperLimit,
                   bool sensorAvailable) {
  if (!sensorAvailable || !isfinite(value)) {
    target["value"] = nullptr;
    target["status"] = "READ_ERROR";
    return;
  }
  if (value < lowerLimit || value > upperLimit) {
    target["value"] = nullptr;
    target["status"] = "OUT_OF_RANGE";
    return;
  }
  target["value"] = value;
  target["status"] = "VALID";
}

String newMeasurementRecord() {
  StaticJsonDocument<2048> document;
  JsonObject record = document.to<JsonObject>();
  record["replay"] = false;
  JsonObject measurement = record.createNestedObject("measurement");
  measurement["measurement_id"] = makeUuid();
  measurement["device_id"] = TCC_DEVICE_ID;
  measurement["boot_id"] = bootId;
  measurement["sequence_number"] = deviceSettings.nextSequenceNumber();
  if (strlen(firmware_config::kRunId) == 0) {
    measurement["run_id"] = nullptr;
  } else {
    measurement["run_id"] = firmware_config::kRunId;
  }
  measurement["configuration_version"] = deviceSettings.configurationVersion();
  String measuredAt;
  const bool isSynchronized = synchronizedTimestamp(measuredAt);
  if (isSynchronized) {
    measurement["measured_at"] = measuredAt;
  } else {
    measurement["measured_at"] = nullptr;
  }
  measurement["device_uptime_ms"] = millis();
  measurement["time_sync_status"] = isSynchronized ? "SYNCED" : "UNSYNCED";

  const float temperature = sht31Ready ? sht31.readTemperature() : NAN;
  const float humidity = sht31Ready ? sht31.readHumidity() : NAN;
  const float illuminance = veml7700Ready ? veml7700.readLux() : NAN;
  JsonObject readings = measurement.createNestedObject("readings");
  assignReading(readings.createNestedObject("temperature_c"), temperature, -40.0F,
                125.0F, sht31Ready);
  assignReading(readings.createNestedObject("relative_humidity_pct"), humidity, 0.0F,
                100.0F, sht31Ready);
  assignReading(readings.createNestedObject("illuminance_lx"), illuminance, 0.0F,
                140000.0F, veml7700Ready);

  String serialized;
  serializeJson(document, serialized);
  return serialized;
}

bool postJson(const String& url, const String& body, int& statusCode, String& response) {
  if (WiFi.status() != WL_CONNECTED || !networkConfigurationIsUsable()) {
    statusCode = 0;
    return false;
  }
  WiFiClientSecure secureClient;
  HTTPClient http;
  http.setTimeout(5000);
  if (!beginHttpClient(http, secureClient, url)) {
    statusCode = 0;
    return false;
  }
  const char* headers[] = {"Date"};
  http.collectHeaders(headers, 1);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", String("Bearer ") + TCC_NODE_API_KEY);
  statusCode = http.POST(body);
  if (statusCode > 0) {
    synchronizeTimeFromHttpDate(http);
  }
  response = statusCode > 0 ? http.getString() : "";
  http.end();
  return statusCode > 0;
}

bool getJson(const String& url, int& statusCode, String& response) {
  if (WiFi.status() != WL_CONNECTED || !networkConfigurationIsUsable()) {
    statusCode = 0;
    return false;
  }
  WiFiClientSecure secureClient;
  HTTPClient http;
  http.setTimeout(5000);
  if (!beginHttpClient(http, secureClient, url)) {
    statusCode = 0;
    return false;
  }
  const char* headers[] = {"Date"};
  http.collectHeaders(headers, 1);
  http.addHeader("Authorization", String("Bearer ") + TCC_NODE_API_KEY);
  statusCode = http.GET();
  if (statusCode > 0) {
    synchronizeTimeFromHttpDate(http);
  }
  response = statusCode > 0 ? http.getString() : "";
  http.end();
  return statusCode > 0;
}

bool acceptedMeasurementResponse(int statusCode, const String& response,
                                 const char* measurementId) {
  if (statusCode != HTTP_CODE_OK && statusCode != HTTP_CODE_CREATED) {
    return false;
  }
  StaticJsonDocument<512> responseDocument;
  if (deserializeJson(responseDocument, response) != DeserializationError::Ok) {
    return false;
  }
  const char* returnedId = responseDocument["measurement_id"] | "";
  const char* ingestionStatus = responseDocument["ingestion_status"] | "";
  return strcmp(returnedId, measurementId) == 0 &&
         (strcmp(ingestionStatus, "STORED") == 0 ||
          strcmp(ingestionStatus, "ALREADY_STORED") == 0);
}

void sendOldestMeasurement() {
  String path;
  String serializedRecord;
  if (!queueStore.peek(path, serializedRecord)) {
    return;
  }

  // Estes documentos são grandes para a pilha curta da loopTask do ESP32.
  // A alocação dinâmica evita o estouro durante a leitura do LittleFS e o POST.
  DynamicJsonDocument record(2304);
  if (deserializeJson(record, serializedRecord) != DeserializationError::Ok ||
      !record["measurement"].is<JsonObject>()) {
    Serial.printf("Registro de fila inválido preservado em %s.\n", path.c_str());
    return;
  }

  DynamicJsonDocument payload(3072);
  payload["schema_version"] = 1;
  payload["measurement"].set(record["measurement"]);
  JsonObject delivery = payload.createNestedObject("delivery");
  delivery["mode"] = (record["replay"] | false) ? "REPLAYED" : "ONLINE";
  String sentAt;
  if (synchronizedTimestamp(sentAt)) {
    delivery["sent_at"] = sentAt;
  } else {
    delivery["sent_at"] = nullptr;
  }
  delivery["queue_depth_before_send"] = queueStore.depth();
  delivery["queue_capacity"] = QueueStore::kCapacity;
  delivery["dropped_total"] = queueStore.droppedTotal();

  String body;
  serializeJson(payload, body);
  int statusCode = 0;
  String response;
  postJson(endpoint("/measurements"), body, statusCode, response);
  const char* measurementId = record["measurement"]["measurement_id"] | "";
  if (acceptedMeasurementResponse(statusCode, response, measurementId)) {
    queueStore.remove(path);
    synchronizedTimestamp(lastConfirmedAt);
    Serial.printf("Medição confirmada: %s\n", measurementId);
    return;
  }

  record["replay"] = true;
  String updatedRecord;
  serializeJson(record, updatedRecord);
  queueStore.replace(path, updatedRecord);
  if (statusCode == HTTP_CODE_UNPROCESSABLE_ENTITY && !response.isEmpty()) {
    Serial.printf("Validação da API: %s\n", response.c_str());
  }
  Serial.printf("Entrega não confirmada (%d); registro mantido na fila.\n", statusCode);
}

bool sendStatusReport(const char* connectionStatus, const String& observedAt) {
  StaticJsonDocument<1024> document;
  if (observedAt.isEmpty()) {
    document["observed_at"] = nullptr;
  } else {
    document["observed_at"] = observedAt;
  }
  document["firmware_version"] = kFirmwareVersion;
  document["connection_status"] = connectionStatus;
  document["queue_depth"] = queueStore.depth();
  document["queue_capacity"] = QueueStore::kCapacity;
  document["dropped_total"] = queueStore.droppedTotal();
  if (lastConfirmedAt.isEmpty()) {
    document["last_confirmed_at"] = nullptr;
  } else {
    document["last_confirmed_at"] = lastConfirmedAt;
  }
  document["time_sync_status"] = observedAt.isEmpty() ? "UNSYNCED" : "SYNCED";
  JsonObject details = document.createNestedObject("details");
  details["i2c_ready"] = i2cConfigured;
  details["sht31_ready"] = sht31Ready;
  details["veml7700_ready"] = veml7700Ready;
  details["reset_reason"] = static_cast<uint32_t>(esp_reset_reason());
  if (WiFi.status() == WL_CONNECTED) {
    details["wifi_rssi_dbm"] = WiFi.RSSI();
  }

  String body;
  serializeJson(document, body);
  int statusCode = 0;
  String response;
  postJson(endpoint((String("/devices/") + TCC_DEVICE_ID + "/status").c_str()), body,
           statusCode, response);
  return statusCode == HTTP_CODE_CREATED;
}

bool acknowledgeConfiguration(uint32_t version, const char* status,
                              const char* rejectionReason = nullptr) {
  StaticJsonDocument<768> document;
  document["version"] = version;
  document["status"] = status;
  if (rejectionReason != nullptr) {
    document["rejection_reason"] = rejectionReason;
  }
  String body;
  serializeJson(document, body);
  int statusCode = 0;
  String response;
  postJson(endpoint((String("/devices/") + TCC_DEVICE_ID + "/configuration-ack").c_str()),
           body, statusCode, response);
  return statusCode == HTTP_CODE_OK;
}

void refreshConfiguration() {
  int statusCode = 0;
  String response;
  if (!getJson(endpoint((String("/devices/") + TCC_DEVICE_ID + "/configuration").c_str()),
               statusCode, response) ||
      statusCode != HTTP_CODE_OK) {
    return;
  }

  StaticJsonDocument<1024> document;
  if (deserializeJson(document, response) != DeserializationError::Ok) {
    return;
  }
  JsonObject configuration = document["configuration"];
  if (configuration.isNull()) {
    return;
  }
  const uint32_t version = configuration["version"] | 0U;
  const uint32_t intervalSeconds = configuration["sampling_interval_seconds"] | 0U;
  const char* status = configuration["status"] | "";
  if (version == 0 || intervalSeconds < firmware_config::kMinimumSamplingIntervalSeconds ||
      intervalSeconds > firmware_config::kMaximumSamplingIntervalSeconds) {
    if (version != 0 && strcmp(status, "PENDING") == 0) {
      acknowledgeConfiguration(version, "REJECTED", "Intervalo fora dos limites do firmware.");
    }
    return;
  }

  if (version <= deviceSettings.configurationVersion()) {
    return;
  }
  if (strcmp(status, "PENDING") != 0 && strcmp(status, "APPLIED") != 0) {
    return;
  }
  if (firmware_config::kLockRemoteConfiguration) {
    if (strcmp(status, "PENDING") == 0) {
      acknowledgeConfiguration(version, "REJECTED",
                               "Coleta local bloqueia alteração remota de intervalo.");
    }
    return;
  }
  if (!deviceSettings.applyConfiguration(version, intervalSeconds)) {
    if (strcmp(status, "PENDING") == 0) {
      acknowledgeConfiguration(version, "REJECTED", "Falha ao persistir configuração local.");
    }
    return;
  }
  Serial.printf("Configuração %lu aplicada: %lu s.\n", static_cast<unsigned long>(version),
                static_cast<unsigned long>(intervalSeconds));
  if (strcmp(status, "PENDING") == 0) {
    acknowledgeConfiguration(version, "APPLIED");
  }
}

void takeMeasurement() {
  const String record = newMeasurementRecord();
  if (!queueStore.enqueue(record)) {
    Serial.println("Fila cheia ou indisponível; perda contabilizada sem descarte de pendências.");
  }
}

}  // namespace

void setup() {
  Serial.begin(115200);
  delay(200);
  setenv("TZ", "UTC0", 1);
  tzset();
  Serial.printf("TCC IoT firmware %s iniciando.\n", kFirmwareVersion);
  bootId = makeUuid();
  deviceSettings.begin();
  if (!queueStore.begin()) {
    Serial.println("ERRO: LittleFS indisponível; não é seguro iniciar a coleta.");
  }
  initializeSensors();
  beginWifi();
  lastSampleAt = millis() - deviceSettings.samplingIntervalSeconds() * 1000UL;
}

void loop() {
  const uint32_t now = millis();
  maintainWifi(now);
  maintainSensors(now);

  if (elapsed(now, lastSampleAt, deviceSettings.samplingIntervalSeconds() * 1000UL)) {
    lastSampleAt = now;
    takeMeasurement();
  }

  if (WiFi.status() == WL_CONNECTED) {
    if (pendingOfflineStatus && sendStatusReport("OFFLINE", offlineObservedAt)) {
      pendingOfflineStatus = false;
    }
    if (elapsed(now, lastSendAttemptAt, kSendAttemptIntervalMs)) {
      lastSendAttemptAt = now;
      sendOldestMeasurement();
    }
    if (elapsed(now, lastConfigurationPollAt,
                firmware_config::kConfigurationPollIntervalSeconds * 1000UL)) {
      lastConfigurationPollAt = now;
      refreshConfiguration();
    }
    if (elapsed(now, lastStatusAt, firmware_config::kStatusIntervalSeconds * 1000UL)) {
      lastStatusAt = now;
      String observedAt;
      synchronizedTimestamp(observedAt);
      sendStatusReport("ONLINE", observedAt);
    }
  }

  delay(20);
}
