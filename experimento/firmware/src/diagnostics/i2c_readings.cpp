#include <Arduino.h>
#include <Wire.h>

#include <Adafruit_SHT31.h>
#include <Adafruit_VEML7700.h>

#include "FirmwareConfig.h"

namespace {

constexpr uint32_t kSampleIntervalMs = 10000;

Adafruit_SHT31 sht31;
Adafruit_VEML7700 veml7700;
bool sht31Ready = false;
bool veml7700Ready = false;
uint32_t lastSampleAt = 0;

void printValue(const char* label, float value, const char* unit) {
  if (isfinite(value)) {
    Serial.printf("%s=%.2f%s", label, value, unit);
    return;
  }
  Serial.printf("%s=ERRO", label);
}

void printReading() {
  const float temperature = sht31Ready ? sht31.readTemperature() : NAN;
  const float humidity = sht31Ready ? sht31.readHumidity() : NAN;
  const float illuminance = veml7700Ready ? veml7700.readLux() : NAN;

  Serial.printf("LEITURA;uptime_ms=%lu;", static_cast<unsigned long>(millis()));
  printValue("temperatura_c", temperature, "C");
  Serial.print(";");
  printValue("umidade_relativa", humidity, "%");
  Serial.print(";");
  printValue("iluminancia", illuminance, "lx");
  Serial.println();
}

}  // namespace

void setup() {
  Serial.begin(115200);
  delay(300);
  Serial.println("Diagnostico I2C do TCC iniciado.");
  Serial.printf("I2C: SDA=%d; SCL=%d; SHT3X=0x%02X\n", firmware_config::kI2cSdaPin,
                firmware_config::kI2cSclPin, firmware_config::kSht31Address);

  Wire.begin(firmware_config::kI2cSdaPin, firmware_config::kI2cSclPin);
  sht31Ready = sht31.begin(firmware_config::kSht31Address);
  veml7700Ready = veml7700.begin(&Wire);
  if (veml7700Ready) {
    veml7700.setGain(VEML7700_GAIN_1_8);
    veml7700.setIntegrationTime(VEML7700_IT_100MS);
  }

  Serial.printf("SHT31=%s; VEML7700=%s\n", sht31Ready ? "pronto" : "indisponivel",
                veml7700Ready ? "pronto" : "indisponivel");
  printReading();
  lastSampleAt = millis();
}

void loop() {
  const uint32_t now = millis();
  if (static_cast<uint32_t>(now - lastSampleAt) >= kSampleIntervalMs) {
    lastSampleAt = now;
    printReading();
  }
}
