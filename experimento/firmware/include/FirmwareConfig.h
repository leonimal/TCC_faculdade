#pragma once

// Crie FirmwareConfig.local.h a partir do exemplo e altere somente o arquivo
// local. FirmwareConfig.local.h é ignorado pelo Git e não deve ser enviado.
// Quando existir, ele define os valores privados antes dos padrões abaixo.
#if __has_include("FirmwareConfig.local.h")
#include "FirmwareConfig.local.h"
#endif

#ifndef TCC_WIFI_SSID
#define TCC_WIFI_SSID "ALTERAR_ANTES_DE_USAR"
#endif

#ifndef TCC_WIFI_PASSWORD
#define TCC_WIFI_PASSWORD "ALTERAR_ANTES_DE_USAR"
#endif

#ifndef TCC_API_BASE_URL
// Para desenvolvimento na mesma rede, use o IP LAN do computador, nunca
// localhost. A hospedagem definitiva e a configuração HTTPS permanecem pendentes.
#define TCC_API_BASE_URL "http://192.168.0.10:3100/api/v1"
#endif

#ifndef TCC_NODE_API_KEY
#define TCC_NODE_API_KEY "ALTERAR_ANTES_DE_USAR"
#endif

#ifndef TCC_DEVICE_ID
#define TCC_DEVICE_ID "classroom-node-01"
#endif

#ifndef TCC_I2C_SDA_PIN
#define TCC_I2C_SDA_PIN -1
#endif

#ifndef TCC_I2C_SCL_PIN
#define TCC_I2C_SCL_PIN -1
#endif

#ifndef TCC_SHT31_ADDRESS
#define TCC_SHT31_ADDRESS 0x44
#endif

#ifndef TCC_LOCK_REMOTE_CONFIGURATION
#define TCC_LOCK_REMOTE_CONFIGURATION false
#endif

// Definido somente para uma execução formal ativa; vazio fora dela.
#ifndef TCC_RUN_ID
#define TCC_RUN_ID ""
#endif

// Uso exclusivo no ensaio controlado T010. Mantê-lo falso fora do ensaio.
#ifndef TCC_T010_STRESS_FILL_ON_BOOT
#define TCC_T010_STRESS_FILL_ON_BOOT false
#endif

#ifndef TCC_T010_STRESS_SESSION
#define TCC_T010_STRESS_SESSION 0
#endif

#ifndef TCC_T010_PAUSE_ACQUISITION
#define TCC_T010_PAUSE_ACQUISITION false
#endif

#ifndef TCC_T010_CLEAR_QUEUE_ON_BOOT
#define TCC_T010_CLEAR_QUEUE_ON_BOOT false
#endif

#ifndef TCC_T010_SYNTHETIC_PRELOAD_COUNT
#define TCC_T010_SYNTHETIC_PRELOAD_COUNT 0
#endif

#ifndef TCC_T010_SYNTHETIC_PRELOAD_SESSION
#define TCC_T010_SYNTHETIC_PRELOAD_SESSION 0
#endif

namespace firmware_config {

// Confirmar os GPIOs no silk-screen da placa recebida e nos módulos. Não usar
// pinos de boot/USB sem a conferência física descrita no README.
constexpr int kI2cSdaPin = TCC_I2C_SDA_PIN;
constexpr int kI2cSclPin = TCC_I2C_SCL_PIN;
constexpr uint8_t kSht31Address = TCC_SHT31_ADDRESS;

constexpr uint32_t kDefaultSamplingIntervalSeconds = 60;
constexpr uint32_t kMinimumSamplingIntervalSeconds = 10;
constexpr uint32_t kMaximumSamplingIntervalSeconds = 300;
constexpr uint32_t kConfigurationPollIntervalSeconds = 60;
constexpr uint32_t kStatusIntervalSeconds = 60;

// Antes de uma coleta válida, definir como true no arquivo local para impedir
// que uma configuração pendente seja aplicada pelo nó durante a execução.
constexpr bool kLockRemoteConfiguration = TCC_LOCK_REMOTE_CONFIGURATION;
constexpr bool kT010StressFillOnBoot = TCC_T010_STRESS_FILL_ON_BOOT;
constexpr uint16_t kT010StressSession = TCC_T010_STRESS_SESSION;
constexpr bool kT010PauseAcquisition = TCC_T010_PAUSE_ACQUISITION;
constexpr bool kT010ClearQueueOnBoot = TCC_T010_CLEAR_QUEUE_ON_BOOT;
constexpr uint16_t kT010SyntheticPreloadCount = TCC_T010_SYNTHETIC_PRELOAD_COUNT;
constexpr uint16_t kT010SyntheticPreloadSession = TCC_T010_SYNTHETIC_PRELOAD_SESSION;

// A execução experimental será registrada pelo software antes da coleta. Até
// então o firmware envia null, conforme o contrato v0.1.
constexpr const char* kRunId = TCC_RUN_ID;

}  // namespace firmware_config
