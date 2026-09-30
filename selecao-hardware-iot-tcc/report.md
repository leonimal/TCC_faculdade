# Hardware Selection Research Report

## Table of contents

1. [Vishay VEML7700](#vishay-veml7700) — brazil_price_range: As of 2026-08-14, authorized distribution listed the bare chip around USD 1.44 to USD 1.95 depending distributor and packaging, while Mercado Livre listings for generic modules ranged from roughly BRL 17.53 to BRL 77.93, with some obvious outlier listings much higher. Seller type matters because cheap marketplace modules are not standardized. | recommendation_status: alternative
2. [Texas Instruments OPT3001](#texas-instruments-opt3001) — brazil_price_range: As of 2026-08-14, DigiKey listed the active bare chip OPT3001DNPR at about USD 2.52 in cut tape, while Brazilian marketplace listings for generic modules commonly appeared around BRL 98.54 to BRL 146.84. This makes the chip inexpensive but the ready-to-use module notably less commodity-priced than BH1750-class boards. | stated_accuracy: TI does not present one simple combined 'absolute lux accuracy' headline in the retrieved lines. Instead, the datasheet specifies typical light-source variation of about 4% for incandescent, halogen, and fluorescent sources on the bare device, typical linearity error of about 2% above 40 lx and 5% below 40 lx, infrared response around 0.2% at 850 nm, and relative range matching below 0.2%. | recommendation_status: recommended
3. [ams-OSRAM TSL2591](#ams-osram-tsl2591) — brazil_price_range: As of 2026-08-14, the bare TSL25911FN chip was around USD 1.74 at DigiKey, Adafruit's breakout was USD 6.95, and Mercado Livre marketplace modules appeared from roughly BRL 27.96 to BRL 35.34, with some higher listings around BRL 58.40 depending seller and import conditions. | recommendation_status: alternative
4. [ESP8266 / NodeMCU](#esp8266-nodemcu) — brazil_price_range: As of 2026-08-14, Brazilian NodeMCU boards were roughly in the R$25-R$60 range across marketplaces and maker stores. A MakerHero listing showed NodeMCU ESP-12 at R$49.90, while Mercado Livre listings covered cheaper clone boards as well. | recommendation_status: comparative reference
5. [ESP32-WROOM-32 / DevKit](#esp32-wroom-32-devkit) — brazil_price_range: As of 2026-08-14, common ESP32 DevKit and WROOM-32 boards in Brazil were roughly in the R$40-R$80 range. Mercado Livre listings clustered around about R$39.67 to R$50.50 for common dev boards, while a Saravati listing for ESP32 DevKitC WROOM-32U was about R$77.50. | recommendation_status: alternative
6. [ESP32-C3 / DevKit or SuperMini](#esp32-c3-devkit-or-supermini) — brazil_price_range: As of 2026-08-14, compact ESP32-C3 boards in Brazil were roughly in the R$25-R$60 range for SuperMini-style boards. MakerHero and FilipeFlop examples were around R$25.90, while marketplace SuperMini listings were commonly in the roughly R$34-R$57 bracket. Official DevKitC-02 listings were much higher, sometimes above R$200. | recommendation_status: recommended
7. [DHT22 / AM2302](#dht22-am2302) — brazil_price_range: As of 2026-08-14, Mercado Livre listings suggest roughly BRL 25-56 for local DHT22/AM2302 modules, with lower per-unit cost in multi-packs and higher prices for some branded kits. | recommendation_status: comparative reference
8. [AHT20 / DHT20](#aht20-dht20) — brazil_price_range: As of 2026-08-14, Brazilian marketplace offers cluster around BRL 31-47 for simple AHT20 modules, with higher pricing for combo boards or branded breakouts. | stated_accuracy: Typically Â±2% RH and Â±0.3 C. Aosong notes that stated accuracy is based on factory test conditions around 3.3 V and 25 C. | recommendation_status: alternative
9. [Sensirion SHT31](#sensirion-sht31) — brazil_price_range: As of 2026-08-14, marketplace breakout and probe offers range roughly from BRL 22 to BRL 62, while DigiKey Brazil lists active raw-chip supply at about USD 4-5 plus freight and import terms. | stated_accuracy: Sensirion's product page states typical Â±2% RH and Â±0.2 C. Many breakout guides round temperature messaging to Â±0.3 C, but the vendor page is the stronger source. | recommendation_status: recommended
10. [Sensirion SHT40](#sensirion-sht40) — brazil_price_range: As of 2026-08-14, DigiKey Brazil listed SHT40 chips around USD 1.88 to USD 2.50 each depending on variant; local marketplace SHT40 modules appeared around BRL 65 to BRL 75. End-user cost depends strongly on whether the purchase is bare chip, branded breakout, or imported generic module. | stated_accuracy: Typical RH accuracy is +/-1.8 %RH for SHT40; typical temperature accuracy commonly cited for SHT40 is +/-0.2 degC from 0 to 75 degC. Sensirion also shows wider maximum RH envelopes outside the central range, so system validation is still required. | recommendation_status: recommended
11. [Bosch BME280](#bosch-bme280) — brazil_price_range: As of 2026-08-14, Curto Circuito listed a BME280 module at BRL 49.90 promotional price, Shopee listings were around BRL 56.37, and Mercado Livre listings clustered around BRL 56 to BRL 66. DigiKey Brazil listed the bare chip around USD 4.00. | recommendation_status: alternative
12. [ROHM BH1750](#rohm-bh1750) — brazil_price_range: As of 2026-08-14, Mercado Livre listings were commonly around BRL 18.94 to BRL 21.90 for GY-30/GY-302 modules, while DigiKey Brazil listed the bare chip at about USD 3.42 and a DFRobot board at about USD 4.50. | recommendation_status: comparative reference

## Vishay VEML7700

### Identification

- **manufacturer:** Vishay Semiconductors
- **model:** VEML7700 family; the current Vishay ordering options are VEML7700-TR and VEML7700-TT, and common breakouts include Adafruit 4162, SparkFun Qwiic Ambient Light Sensor, DFRobot SEN0228, and generic I2C modules.
- **object_level:** Chip-level digital ambient-light sensor IC with ALS and white-light data paths; in the TCC context it will usually be purchased as a breakout module, not as the bare 4-SMD package.
- **lifecycle_status:** Active and suitable for new designs. Vishay still publishes the product page and datasheet, and DigiKey listed VEML7700-TR as Active on 2026-08-14.
- **official_documentation:** Primary sources: Vishay product page https://www.vishay.com/en/product/84286/ ; Vishay datasheet rev. 1.8, 2024-11-28 https://www.vishay.com/doc/?84286= ; Vishay application note 'Designing the VEML7700 Into an Application' revision 2019-09-20 https://docs.sparkfun.com/SparkFun_Ambient_Light_Sensor-VEML7700/assets/component_documentation/VEML7700_Application_Note.pdf ; Adafruit Arduino library https://github.com/adafruit/Adafruit_VEML7700 ; SparkFun Arduino library https://github.com/sparkfun/SparkFun_VEML7700_Arduino_Library ; ESP-IDF component registry entry https://components.espressif.com/components/esp-idf-lib/veml7700 .

### Measurement

- **measured_quantities:** Ambient illuminance in lux, plus raw ALS and white-channel readings depending on the driver.
- **measurement_principle:** Integrated ambient-light sensor with photodiode, low-noise amplifier, 16-bit ADC, internal timing/control logic, and digital I2C output.
- **response_time:** Selectable ALS integration times are 25, 50, 100, 200, 400, and 800 ms. In non-power-save operation the refresh time can be 100 ms, and in power-save modes the refresh interval extends to roughly 600 ms through 4100 ms depending on PSM configuration.
- **spectral_response:** Vishay describes the built-in photodiode response as near the human eye response, and the 2019 application note reports good matching across daylight, fluorescent, and LED sources. Halogen and other IR-rich sources can read somewhat high, so source spectrum still matters in validation.

### Integration

- **interface:** I2C, up to 400 kHz, with threshold interrupt support.
- **supply_and_logic_voltage:** Bare-chip supply range is 2.5 to 3.6 V and the I2C bus voltage range is 1.7 to 3.6 V, so the IC is naturally compatible with 3.3 V logic. Breakout boards may expose 3 to 5 V VIN only when they add regulation and logic adaptation.
- **i2c_addressing:** Fixed 7-bit I2C address 0x10. That simplicity reduces configuration mistakes, but it also means multiple identical sensors on one bus require a mux or separate bus.
- **firmware_ecosystem:** Good ecosystem coverage. Arduino support exists from Adafruit and SparkFun, CircuitPython support exists from Adafruit, and ESP-IDF support exists through the maintained esp-idf-lib/veml7700 component in Espressif's component registry.

### Operation

- **power_consumption:** Very low-power sensor. Vishay lists typical shutdown current of 0.5 uA, about 2 uA in the deepest power-save mode, about 8 uA in a lighter power-save mode, and about 45 uA in non-power-save operation with 100 ms refresh.
- **self_heating:** Chip self-heating is minor because current draw is very low. In practical nodes, board LEDs, nearby regulators, and enclosure solar loading are more likely than the sensor IC itself to disturb readings.
- **thermal_mechanical_coupling:** Optical coupling matters more than thermal coupling. Vishay's application note shows that cover-glass distance, opening size, and attenuation materially affect performance, so enclosure windows and sensor recess depth should be held constant between prototype and validation.
- **interference_and_positioning:** Avoid self-shadowing from the enclosure lip, direct glare into the package window, nearby status LEDs, and IR-rich sources if the goal is approximate photopic lux. For clear-window or outdoor-facing installations, firmware should adapt gain and integration time and may need high-lux correction.

### Validation

- **calibration_support:** Vishay provides application guidance for gain/integration selection, cover-glass attenuation compensation, and high-lux behavior. I did not find evidence of traceable per-unit calibration certificates for the bare sensor, so classroom claims still need system-level comparison against a calibrated lux meter.
- **proposed_validation_protocol:** Compare the final module against a calibrated lux meter at fixed geometry under at least four scenes: low indoor light, typical classroom artificial light, bright window-side daylight, and a higher-light stress point. Log sensor gain/integration settings, allow 30 to 60 s stabilization per point, and report mean bias, MAE, and repeatability. If the sensor sits behind a window or diffuser, validate only with that exact mechanical stack in place.
- **interpretation_limits:** This sensor can support classroom illuminance trend monitoring and approximate lux reporting, but it does not by itself justify claims of reference-grade photometry, PPFD, glare analysis, or regulatory compliance without external calibration and stable optomechanics.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, authorized distribution listed the bare chip around USD 1.44 to USD 1.95 depending distributor and packaging, while Mercado Livre listings for generic modules ranged from roughly BRL 17.53 to BRL 77.93, with some obvious outlier listings much higher. Seller type matters because cheap marketplace modules are not standardized.
- **availability:** Good. The bare part is active at authorized distribution, and generic modules are present on Brazilian marketplaces. Branded local stock is less common than generic imported modules.
- **supply_origin:** Mostly imported. Repeatable sourcing is strongest through authorized distributors for the chip and through known branded breakouts; anonymous marketplace modules are usually imported assemblies with variable BOMs and shipping times.
- **counterfeit_or_substitution_risk:** Medium. The bare Vishay part itself is straightforward to source through distribution, but marketplace modules can vary in regulator choice, pull-ups, board layout, and even the exact sensor actually mounted.

### Recommendation

- **strengths:** Wide dynamic range, very low power, simple fixed-address integration, good Arduino and ESP-IDF support, and better technical documentation than many generic lux modules.
- **weaknesses:** Absolute accuracy is less cleanly summarized than on OPT3001, marketplace modules are electrically inconsistent, and bright-scene compensation can require more firmware care than hobby examples suggest.
- **fit_for_tcc:** Good fit as a technically solid wide-range illuminance option when the project values low power and straightforward I2C integration. It is stronger than very cheap hobby sensors for documentation quality, but it is slightly less directly defensible than OPT3001 when the main argument is photopic matching and IR rejection.
- **recommendation_status:** alternative

### Other Info

- **id:** veml7700
- **name:** Vishay VEML7700
- **category:** illuminance
- **role:** Alternative with wide dynamic range

### Uncertain fields

- nominal_range
- resolution
- stated_accuracy
- repeatability_hysteresis_drift
- module_electrical_implementation
- independent_evidence
- total_node_cost


## Texas Instruments OPT3001

### Identification

- **manufacturer:** Texas Instruments
- **model:** OPT3001 family; the common active ordering code is OPT3001DNPR, while generic breakout modules are sold under names such as MCU-3001 or Noyito OPT3001 boards.
- **object_level:** Chip-level digital ambient-light sensor intended as a single-chip lux meter; in TCC practice it is often obtained as a generic breakout module because the bare USON package is not hand-solder friendly.
- **lifecycle_status:** Active and recommended for new designs. TI still markets the OPT3001 product page, and DigiKey listed OPT3001DNPR as Active on 2026-08-14. Some alternate orderable forms such as OPT3001DNPT show no longer manufactured status, so the exact suffix should be chosen carefully.
- **official_documentation:** Primary sources: TI product page https://www.ti.com/product/OPT3001 ; TI datasheet rev. C https://www.ti.com/lit/gpn/OPT3001 ; TI application guide rev. B, June 2026 https://www.ti.com/lit/pdf/sbea002 ; TI part page for OPT3001DNPR https://www.ti.com/product/OPT3001/part-details/OPT3001DNPR ; community ESP-IDF driver example https://github.com/grstat/esp32-opt3001 ; ESPHome component page https://esphome.io/components/sensor/opt3001/ .

### Measurement

- **measured_quantities:** Visible-light illuminance in lux.
- **measurement_principle:** Single-chip lux meter with precision optical filtering, optical ADC, automatic full-scale ranging, and digital I2C output designed to follow human photopic vision rather than raw broadband photodiode output.
- **nominal_range:** Manufacturer measurement range is 0.01 lx to 83 k lx with a 23-bit effective dynamic range through automatic gain ranging. This comfortably covers typical classroom and corridor illuminance levels, though it has less bright-scene headroom than VEML7700.
- **resolution:** 0.01 lx at the lowest full-scale range. The 800 ms conversion time gives the fully specified lux resolution, while 100 ms conversion can reduce effective resolution by up to three bits in the lower ranges.
- **stated_accuracy:** TI does not present one simple combined 'absolute lux accuracy' headline in the retrieved lines. Instead, the datasheet specifies typical light-source variation of about 4% for incandescent, halogen, and fluorescent sources on the bare device, typical linearity error of about 2% above 40 lx and 5% below 40 lx, infrared response around 0.2% at 850 nm, and relative range matching below 0.2%.
- **response_time:** Selectable conversion times are 100 ms and 800 ms. The sensor supports both single-shot and continuous conversion modes.
- **spectral_response:** Strong point of the part. TI states the spectral response tightly matches the photopic response of the human eye and rejects more than 99% typical IR. The 2026 TI application guide also shows the device maintaining high accuracy behind a dark window when IR transmission is higher than visible transmission.

### Integration

- **interface:** I2C with optional interrupt output.
- **supply_and_logic_voltage:** Supply range is 1.6 to 3.6 V. I2C pull-ups may operate from 1.6 to 5.5 V, and the datasheet explicitly calls the I/O 5.5 V tolerant, so direct integration with 3.3 V MCUs is easy and many mixed-voltage designs are possible.
- **i2c_addressing:** Four 7-bit I2C addresses are available via the ADDR pin: 0x44 when tied to GND, 0x45 to VDD, 0x46 to SDA, and 0x47 to SCL. This is a real advantage when multiple light sensors share one bus.

### Operation

- **self_heating:** Self-heating should be negligible in the intended classroom use because sensor current is in the low-microamp range. Board-level regulators, dark windows under solar load, and nearby MCUs are more likely to disturb the overall measurement than the IC itself.
- **thermal_mechanical_coupling:** Optomechanics matter more than thermal coupling. TI's 2026 guide notes that the active sensing area of the OPT3001 is offset from the geometric center of the USON package, so the window aperture must be centered on the sensing region rather than on the package outline.
- **interference_and_positioning:** Avoid windows darker than necessary, because lower visible transmission reduces accuracy. If the sensor is mounted behind tinted plastic or glass, the attenuation factor should be measured and compensated. TI also warns that aperture placement must respect the offset active area, otherwise geometry-induced error is added before any calibration.

### Validation

- **calibration_support:** Good support at the application level. TI's 2026 guide gives two explicit window-compensation workflows: an ALS-only method and a lux-meter-based method, including formulas for visible attenuation correction. I did not find evidence of per-unit traceable factory certificates for the sensor itself.
- **proposed_validation_protocol:** Validate the exact breakout and enclosure geometry against a calibrated lux meter at multiple indoor points such as about 50 lx, 300 lx, 500 lx, and 1000 lx, plus a brighter daylight point near the upper indoor range. Repeat once with and once without any optical window if the final node uses cover plastic. Use the same conversion time and record the chosen address and attenuation factor so the validated setup is reproducible.
- **interpretation_limits:** OPT3001 is strong for classroom illuminance monitoring, but it is still not a legal-compliance lux meter, not a spectral instrument, and not a substitute for irradiance, PPFD, or glare measurement. Outdoor high-daylight performance should not be generalized from classroom validation.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, DigiKey listed the active bare chip OPT3001DNPR at about USD 2.52 in cut tape, while Brazilian marketplace listings for generic modules commonly appeared around BRL 98.54 to BRL 146.84. This makes the chip inexpensive but the ready-to-use module notably less commodity-priced than BH1750-class boards.
- **availability:** Good for the chip through authorized distribution, weaker for local module diversity. Marketplace modules exist, but they are fewer and more clearly import-driven than BH1750 or generic VEML7700 boards.
- **supply_origin:** Mostly imported. The bare TI part is available through global authorized channels; breakout modules are usually imported generic assemblies sold through marketplaces.
- **counterfeit_or_substitution_risk:** Medium. Distributor-sourced chips are low risk, but marketplace breakout provenance and BOM transparency are weaker. Because OPT3001 modules are less common, seller descriptions and actual board electrical behavior should be checked carefully.

### Recommendation

- **strengths:** Excellent photopic matching, very strong IR rejection, four selectable I2C addresses, very low power, and the best official optomechanical guidance in this comparison group.
- **weaknesses:** Ready-made modules are less standardized and often more expensive than commodity lux boards, firmware ecosystem is less polished than Adafruit-backed sensors, and the 83 klx ceiling is lower than VEML7700 for very bright scenes.
- **fit_for_tcc:** Best fit in this subgroup when the project values defensible lux interpretation close to human vision and can tolerate either a pricier breakout or slightly harder sourcing. For classroom lighting studies, this is the strongest candidate when spectral behavior matters more than hobby convenience.
- **recommendation_status:** recommended

### Other Info

- **id:** opt3001
- **name:** Texas Instruments OPT3001
- **category:** illuminance
- **role:** Alternative with spectral response close to human vision

### Uncertain fields

- repeatability_hysteresis_drift
- module_electrical_implementation
- firmware_ecosystem
- power_consumption
- independent_evidence
- total_node_cost


## ams-OSRAM TSL2591

### Identification

- **manufacturer:** ams-OSRAM
- **model:** TSL2591 family, especially TSL25911FN for Vbus = VDD and TSL25913FN for 1.8 V bus use; common modules include Adafruit 1980 and many generic TSL2591 breakouts.
- **object_level:** Chip-level dual-channel light-to-digital converter with one broadband channel and one infrared channel; in the TCC context it is usually purchased as a breakout board rather than as the bare 6-DFN package.
- **lifecycle_status:** Active and still relevant for new designs. ams-OSRAM keeps the product page online, and DigiKey listed TSL25911FN as Active on 2026-08-14.
- **official_documentation:** Primary sources: ams-OSRAM product page https://ams-osram.com/products/sensor-solutions/ambient-light-color-spectral-proximity-sensors/ams-tsl25911-ambient-light-sensor ; ams datasheet v2-04 dated 2018-06-05 https://cdn-learn.adafruit.com/assets/assets/000/078/658/original/TSL2591_DS000338_6-00.pdf?1564168468= ; Adafruit product/guide https://www.adafruit.com/product/1980 and https://learn.adafruit.com/adafruit-tsl2591 ; Adafruit Arduino library https://github.com/adafruit/Adafruit_TSL2591_Library ; Adafruit CircuitPython library https://github.com/adafruit/Adafruit_CircuitPython_TSL2591 ; ESP-IDF component registry entry https://components.espressif.com/components/esp-idf-lib/tsl2591 .

### Measurement

- **measured_quantities:** Raw broadband/full-spectrum and infrared light-channel data, with firmware-derived lux and visible estimates depending on the driver implementation.
- **measurement_principle:** Dual-photodiode light-to-digital converter with two integrating ADCs. Lux is not measured directly by a dedicated photopic ADC; it is derived from broadband and IR channels using an empirical formula intended to approximate human-eye response.
- **response_time:** Selectable integration times are 100, 200, 300, 400, 500, and 600 ms. Continuous conversion effectively updates every integration cycle.
- **spectral_response:** The device combines a broadband photodiode and a dedicated IR photodiode, with a UV-rejection package and an empirical lux formula intended to approximate photopic vision. This is useful for separating IR contribution, but it also means final lux depends on the quality of the conversion algorithm and can remain source-spectrum dependent.

### Integration

- **interface:** I2C fast-mode compatible up to 400 kbit/s, with interrupt support.
- **supply_and_logic_voltage:** Bare-chip supply is 2.7 to 3.6 V. The TSL25911 variant uses Vbus = VDD logic levels and is directly compatible with 3.3 V systems. Breakouts that expose 3 to 5 V VIN do so by adding a regulator and, depending on the board, optional level adaptation.
- **i2c_addressing:** Primary I2C address is 0x29. The datasheet also notes a secondary 0x28 address for read-only register block access, but this does not function as a normal second configurable runtime address. In practice, multiple TSL2591 sensors on one bus usually require a mux.
- **firmware_ecosystem:** Strong and easy to adopt. Adafruit maintains Arduino and CircuitPython libraries, and ESP-IDF support exists through esp-idf-lib/tsl2591 in Espressif's component registry.

### Operation

- **power_consumption:** Higher active current than OPT3001 or VEML7700 but still modest: the datasheet gives about 275 uA typical active current and about 2.3 uA sleep-state current, while the front-page features summarize low-power sleep at about 3.0 uA.
- **self_heating:** Chip self-heating is still relatively small in absolute terms, but active current is materially higher than the other two candidates in this group. In practice, optical loading, direct radiant heat, and warm breakout regulators can disturb readings more than the silicon itself.
- **thermal_mechanical_coupling:** As with other lux sensors, optical geometry dominates. Keep the sensor opening consistent, avoid enclosure recesses that narrow the field of view, and validate with the final window or diffuser in place if one is used.
- **interference_and_positioning:** Spectrum and field of view matter a lot. Because lux is derived from broadband and IR channels, firmware implementation differences can change results. Direct sunlight, strong IR sources, shadows from the enclosure, and inconsistent sensor orientation can all produce misleading comparisons between rooms.

### Validation

- **calibration_support:** The sensor gives rich raw data, but the vendor documents lux as an empirical derivation rather than as a strictly calibrated direct photopic output. I did not find evidence of per-unit traceable calibration certificates. For a TCC, the exact firmware lux formula must be validated against a calibrated lux meter.
- **proposed_validation_protocol:** Validate both the raw channels and the final calculated lux from the exact firmware library against a calibrated lux meter under several indoor spectra: cool white LED, warm LED or fluorescent, and daylight from a window. Hold gain/integration settings constant during each comparison, log at least 30 to 60 s per point, and report not only lux error but also whether channel-ratio behavior changes across light sources.
- **interpretation_limits:** TSL2591 is useful for trend monitoring, low-light detection, and experiments where separating broadband and IR content is helpful, but it should not be presented as a reference lux meter, radiometer, PPFD meter, or compliance instrument without strong local calibration evidence.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, the bare TSL25911FN chip was around USD 1.74 at DigiKey, Adafruit's breakout was USD 6.95, and Mercado Livre marketplace modules appeared from roughly BRL 27.96 to BRL 35.34, with some higher listings around BRL 58.40 depending seller and import conditions.
- **availability:** Good. The chip is active at distributors and generic modules are widely visible on marketplaces, including Brazilian listings.
- **supply_origin:** Mostly imported. Bare parts come through authorized global distribution; most breakout modules are imported generic boards or imported branded Adafruit stock.
- **counterfeit_or_substitution_risk:** Medium to high. The chip itself is easy to source legitimately, but many low-cost modules depend on undocumented breakout circuitry, and the exact lux formula in the bundled firmware can vary between vendors and libraries.

### Recommendation

- **strengths:** Very high sensitivity, separate broadband and IR channels, strong Arduino and CircuitPython ecosystem, and solid availability through both distributors and hobby marketplaces.
- **weaknesses:** Lux is empirical rather than directly measured, there is effectively only one usable address for normal multi-sensor designs, active current is higher than the other two candidates, and absolute lux defensibility is weaker than OPT3001.
- **fit_for_tcc:** Useful as a comparative high-sensitivity option, especially if low-light monitoring or raw IR-versus-broadband experimentation is interesting. For straightforward and defensible classroom lux reporting, it is less attractive than OPT3001 and generally more calibration-sensitive than VEML7700.
- **recommendation_status:** alternative

### Other Info

- **id:** tsl2591
- **name:** ams-OSRAM TSL2591
- **category:** illuminance
- **role:** High-dynamic-range alternative

### Uncertain fields

- nominal_range
- resolution
- stated_accuracy
- repeatability_hysteresis_drift
- module_electrical_implementation
- independent_evidence
- total_node_cost


## ESP8266 / NodeMCU

### Identification

- **manufacturer:** Espressif Systems
- **model:** ESP8266EX chip; typical NodeMCU boards use ESP-12E, ESP-12F, or ESP-WROOM-02-class modules with 4 MB flash.
- **object_level:** Chip: ESP8266EX. Module: ESP-12E, ESP-12F, or ESP-WROOM-02-class Wi-Fi module. Development board: NodeMCU-style board with USB-UART bridge, 3.3 V regulator, and 5 V USB or VIN input.
- **lifecycle_status:** ESP8266EX and related modules are still obtainable, but Espressif marks the platform direction as superseded and marks ESP-WROOM-02 as not recommended for new designs. It remains useful as a historical low-cost baseline, not as the strongest new primary choice.
- **official_documentation:** - Espressif ESP8266 SoC page: https://www.espressif.com/en/products/socs/esp8266<br>- ESP8266EX datasheet: https://documentation.espressif.com/0a-esp8266ex_datasheet_en.html<br>- ESP8266 RTOS SDK guide: https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/get-started/index.html<br>- ESP-WROOM-02 datasheet and lifecycle note: https://documentation.espressif.com/0c-esp-wroom-02_datasheet_en.html<br>- Brazil retail NodeMCU board example: https://www.filipeflop.com/produto/modulo-wifi-esp8266-nodemcu-esp-12

### Measurement

- **measured_quantities:** It does not directly measure environmental variables. It reads digital buses and one ADC channel, timestamps data, and transmits the payload over Wi-Fi.
- **measurement_principle:** Single-core Wi-Fi SoC with GPIO, UART, SPI, I2C-through-firmware support, PWM, and one 10-bit SAR ADC. It is a controller and communication device, not the sensing element.
- **resolution:** CPU clock up to 160 MHz; one 10-bit SAR ADC; common NodeMCU Arduino usage exposes up to 10-bit PWM behavior.

### Integration

- **interface:** Wi-Fi 2.4 GHz 802.11 b/g/n; UART, SPI, I2C via software stacks, I2S, PWM, GPIO, and one ADC channel.
- **supply_and_logic_voltage:** 3.3 V logic only; GPIOs are not 5 V tolerant. USB-powered NodeMCU boards usually accept 5 V on USB and regulate it to 3.3 V locally.
- **i2c_addressing:** No fixed I2C address applies because the MCU is the I2C controller, not an addressed I2C peripheral. Typical NodeMCU convention uses GPIO4 for SDA and GPIO5 for SCL.
- **firmware_ecosystem:** Very strong Arduino ecosystem and very large legacy example base. Official ESP8266_RTOS_SDK still exists, but the platform is less future-facing than current ESP32 families and lacks the mainstream ESP-IDF path used by newer devices.

### Operation

- **power_consumption:** Chip-level deep sleep is documented at 20 uA, but practical NodeMCU dev boards are usually far higher because the USB-UART bridge, regulator, and power LED remain active. Awake current is typically in the tens of mA with much higher Wi-Fi transmit peaks.
- **self_heating:** NodeMCU boards with linear regulators and always-on USB bridges can warm locally during continuous Wi-Fi use. That local heating is enough to bias nearby temperature and RH sensors on compact boards.
- **thermal_mechanical_coupling:** Keep temperature and RH sensors off-board or on a short cable, away from the regulator, USB bridge, and RF section. Avoid sealed boxes with poor airflow if the sensor shares the enclosure.
- **interference_and_positioning:** Its single ADC channel and Wi-Fi activity make analog sensing comparatively fragile. Keep the antenna edge away from metal and away from the illuminance sensor body, and do not mount the sensing head directly above the PCB antenna zone.

### Validation

- **calibration_support:** There is no factory calibration for environmental measurement. For digital I2C sensors this is acceptable because calibration belongs to the sensor, not the MCU. For analog channels, ESP8266 is a weak platform for traceable calibration work.
- **proposed_validation_protocol:** Use it only as the communication-controller baseline. Validate Wi-Fi uptime, reboot rate, packet loss, timestamp integrity, and any analog-input linearity with a reference voltage source. Run a 24 h to 72 h soak test with the final sensor stack and log board temperature near the MCU.
- **interpretation_limits:** Good NodeMCU stability does not prove environmental sensor accuracy. A stable HTTP or MQTT pipeline only shows controller adequacy, not metrological quality of temperature, RH, or illuminance readings.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, Brazilian NodeMCU boards were roughly in the R$25-R$60 range across marketplaces and maker stores. A MakerHero listing showed NodeMCU ESP-12 at R$49.90, while Mercado Livre listings covered cheaper clone boards as well.
- **availability:** High in Brazilian marketplaces and maker stores because NodeMCU-compatible boards are common. Official bare chips and modules are still obtainable through distributors, but the dev-board market is dominated by third-party clones.
- **supply_origin:** Mostly Chinese clone boards sold by local resellers and marketplaces. Official chips or modules can also be sourced through distributors such as Mouser or Digi-Key with import lead time and taxes.
- **counterfeit_or_substitution_risk:** High. NodeMCU branding is loose, and sellers may silently swap USB bridges, regulator families, flash vendor, resistor ladders, or even module revision.
- **total_node_cost:** Very low for the controller alone, but hidden cost appears if the project later needs better ADC behavior, better low-power performance, or cleaner thermal separation for sensors.

### Recommendation

- **strengths:** Lowest legacy cost baseline, Huge amount of example code and tutorials, Enough for simple Wi-Fi sensor posting, Useful historical reference against which newer ESP32 options can be justified
- **weaknesses:** - Aging platform posture for new designs<br>- No Bluetooth<br>- Only one 10-bit ADC channel and weak analog story<br>- Clone variability hurts repeatability and low-power behavior<br>- Board self-heating and regulator quality can bias colocated sensors
- **fit_for_tcc:** Acceptable as a budget or historical baseline and fully compatible with the planned architecture, but weaker for a 2026 thesis that wants a defensible and current hardware-selection rationale. It is better as the economic reference than as the final preferred platform.
- **recommendation_status:** comparative reference

### Other Info

- **id:** esp8266
- **name:** ESP8266 / NodeMCU
- **category:** microcontroller
- **role:** Economic and historical reference
- **retrieved_at:** 2026-08-14

### Uncertain fields

- nominal_range
- stated_accuracy
- repeatability_hysteresis_drift
- response_time
- spectral_response
- module_electrical_implementation
- independent_evidence


## ESP32-WROOM-32 / DevKit

### Identification

- **manufacturer:** Espressif Systems
- **model:** Classic ESP32 family based on ESP32-D0WD or ESP32-D0WD-V3 silicon; for current boards, the practical target is usually ESP32-WROOM-32E or ESP32-WROOM-32UE on DevKitC-style boards.
- **object_level:** Chip: ESP32. Module: original ESP32-WROOM-32 or newer ESP32-WROOM-32E and ESP32-WROOM-32UE. Development board: ESP32 DevKitC or widespread DOIT-style 30-pin or 38-pin clones.
- **lifecycle_status:** The ESP32 family is still active and extremely mature, but the original ESP32-WROOM-32 module is marked not recommended for new designs in current module documentation. For new builds, board control should favor ESP32-WROOM-32E or 32UE rather than unspecified older WROOM-32 stock.
- **official_documentation:** - Espressif ESP32 SoC page: https://www.espressif.com/en/products/socs/esp32<br>- ESP32 series datasheet: https://documentation.espressif.com/esp32_datasheet_en.pdf<br>- ESP32-WROOM-32E and 32UE datasheet: https://documentation.espressif.com/esp32-wroom-32e_esp32-wroom-32ue_datasheet_en.pdf<br>- ESP32-DevKitC page: https://www.espressif.com/en/products/devkits/esp32-devkitc<br>- ESP-IDF stable ESP32 guide: https://docs.espressif.com/projects/esp-idf/en/stable/esp32/index.html

### Measurement

- **measured_quantities:** It does not directly measure environmental variables. It polls digital sensors, can read multiple analog channels when needed, timestamps data, and transmits it through Wi-Fi or Bluetooth.
- **measurement_principle:** Dual-core Xtensa Wi-Fi and Bluetooth SoC with 34 programmable GPIOs, 12-bit SAR ADC up to 18 channels, DAC outputs, touch sensing, and flexible digital peripherals. It is the controller, not the primary sensor.
- **resolution:** CPU clock up to 240 MHz with two cores; 12-bit SAR ADC; up to 20-bit LEDC PWM duty resolution; two 8-bit DAC outputs on dedicated pins.
- **repeatability_hysteresis_drift:** Digital interfaces are stable. Analog repeatability is clearly better than ESP8266 in practical use, but still sensitive to supply noise, attenuation setting, PCB layout, and Wi-Fi coexistence when the same board also performs radio traffic.

### Integration

- **interface:** Wi-Fi 2.4 GHz 802.11 b/g/n; Bluetooth 4.2 and BLE; two I2C controllers, SPI, UART, I2S, TWAI, PWM, ADC, DAC, touch sensor inputs, and GPIO matrix routing.
- **supply_and_logic_voltage:** 3.3 V logic only; GPIOs are not 5 V tolerant. Dev boards usually accept 5 V over USB and regulate down to 3.3 V.
- **i2c_addressing:** No fixed I2C address applies because the MCU is the I2C controller. The GPIO matrix allows practical routing of I2C signals to many pins, which reduces board-layout risk.
- **firmware_ecosystem:** Excellent. Official ESP-IDF support is current and broad, and Arduino-ESP32 remains actively maintained with very wide library support. This is the lowest-risk ecosystem of the three options for rapid integration.

### Operation

- **power_consumption:** Chip-level deep sleep is around 10 uA in current ESP32 documentation, but actual DevKit boards are much higher in practice because of board overhead. Awake current is normally still easy to supply from USB, with higher peaks than ESP8266 during radio and dual-core activity.
- **self_heating:** More processing headroom and a dual-core radio SoC can generate more local heat than a lightly loaded ESP32-C3 board. Continuous Wi-Fi plus a linear regulator can bias nearby temperature and RH sensors if all parts are placed tightly together.
- **thermal_mechanical_coupling:** Keep temperature and RH sensing away from the regulator, antenna edge, and USB-UART area. Use physical offset or a short cable if the enclosure is small or poorly ventilated.
- **interference_and_positioning:** ADC channels can pick up noise; keep analog traces short, keep sensor leads away from the antenna and switching power paths, and avoid metal obstructions near the PCB antenna. For the planned environmental stack, digital I2C sensors are preferable to analog sensors.

### Validation

- **calibration_support:** ESP-IDF provides ADC calibration support using eFuse-backed schemes when available, which helps if the project ever needs analog voltage acquisition. For digital environmental sensors, calibration responsibility remains with the sensor and the validation protocol, not the MCU.
- **independent_evidence:** There is very broad independent industry and community use of ESP32-based IoT nodes, and Espressif provides explicit ADC calibration guidance. Integration risk is better understood here than on ESP8266 clone boards.
- **proposed_validation_protocol:** Use the exact intended board revision, then run 72 h firmware soak tests while logging reboots, RSSI, packet loss, free heap, and sensor polling jitter. If any analog channels are used, validate each attenuation setting with reference voltages and enable ADC calibration in the chosen software stack.
- **interpretation_limits:** A stable ESP32 node does not prove environmental sensor accuracy. It demonstrates controller adequacy, communication robustness, and firmware stability only.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, common ESP32 DevKit and WROOM-32 boards in Brazil were roughly in the R$40-R$80 range. Mercado Livre listings clustered around about R$39.67 to R$50.50 for common dev boards, while a Saravati listing for ESP32 DevKitC WROOM-32U was about R$77.50.
- **availability:** Very high in Brazil. Dev boards are abundant in marketplaces, and official modules remain easy to source through large distributors and specialized resellers.
- **supply_origin:** Mostly Chinese-made modules and dev boards. Marketplace boards may be clones or mixed-component assemblies, while distributor channels provide more repeatable sourcing for genuine modules.
- **counterfeit_or_substitution_risk:** Moderate. Lower than NodeMCU because the module family is more standardized, but marketplace boards still vary in USB bridge, flash vendor, regulator, pin count, and antenna implementation.
- **total_node_cost:** Still low enough that the controller rarely dominates total node cost. In most classroom nodes, sensors, enclosure, power supply, cable routing, and assembly effort outweigh the MCU price delta versus ESP8266 or ESP32-C3.

### Recommendation

- **strengths:** - Best-established firmware ecosystem<br>- Dual-core headroom for future features and debugging convenience<br>- Wi-Fi plus Bluetooth on a very common platform<br>- Many GPIOs and ADC channels<br>- Low integration risk for a thesis prototype
- **weaknesses:** Original WROOM-32 module line is aging and partially NRND, Higher power draw and more self-heating than the leaner ESP32-C3 path, Analog path still needs calibration discipline, Marketplace board variance still exists
- **fit_for_tcc:** Very strong fit if the project values low firmware risk, broad library compatibility, and quick integration more than absolute minimization of controller power or strict platform modernity. It is the safest mature option if the exact board revision is controlled.
- **recommendation_status:** alternative

### Other Info

- **id:** esp32_wroom_32
- **name:** ESP32-WROOM-32 / DevKit
- **category:** microcontroller
- **role:** Mature general-purpose alternative
- **retrieved_at:** 2026-08-14

### Uncertain fields

- nominal_range
- stated_accuracy
- response_time
- spectral_response
- module_electrical_implementation


## ESP32-C3 / DevKit or SuperMini

### Identification

- **manufacturer:** Espressif Systems
- **object_level:** Chip: ESP32-C3. Module: ESP32-C3-WROOM-02 or related C3 module variant. Development board: official ESP32-C3-DevKitC-02 or third-party compact boards commonly sold as ESP32-C3 SuperMini.
- **lifecycle_status:** ESP32-C3 is an active and current platform suited to new low-cost Wi-Fi and BLE designs. Some early chip variants in the wider C3 family were marked EOL or NRND, but current WROOM-02-class module options remain current and widely recommended.
- **official_documentation:** - Espressif ESP32-C3 SoC page: https://www.espressif.com/en/products/socs/esp32-c3<br>- ESP32-C3 datasheet: https://documentation.espressif.com/esp32-c3_datasheet_en.html<br>- ESP32-C3-WROOM-02 datasheet: https://documentation.espressif.com/esp32-c3-wroom-02_datasheet_en.html<br>- ESP32-C3-DevKitC-02 guide: https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32c3/esp32-c3-devkitc-02/index.html<br>- ESP-IDF stable ESP32-C3 guide: https://docs.espressif.com/projects/esp-idf/en/stable/esp32c3/get-started/index.html

### Measurement

- **measured_quantities:** It does not directly measure environmental variables. It polls digital sensors, can read analog voltages if required, timestamps data, and transmits via Wi-Fi, with BLE available for auxiliary setup or diagnostics if desired.
- **measurement_principle:** Single-core 32-bit RISC-V Wi-Fi and Bluetooth LE SoC with 22 GPIOs, 400 KB internal RAM, ADC capability, native USB Serial and JTAG support, and modern low-power management. It is the controller and communications device, not the sensing element.
- **resolution:** Single-core CPU up to 160 MHz; 12-bit SAR ADC; PWM support through LEDC; native USB Serial and JTAG; enough memory and peripherals for a classroom environmental node without strain.
- **repeatability_hysteresis_drift:** Digital buses are stable. Analog repeatability improves when eFuse-backed ADC calibration and oversampling are used, but tiny SuperMini boards can still suffer from noise and layout-dependent variation.

### Integration

- **interface:** Wi-Fi 2.4 GHz 802.11 b/g/n; Bluetooth LE 5; UART, SPI, I2C, I2S, native USB Serial and JTAG, TWAI, PWM, GPIO, ADC, and on-chip temperature-sensor support for internal housekeeping.
- **supply_and_logic_voltage:** 3.3 V logic only; GPIOs are not 5 V tolerant. Dev boards usually accept 5 V from USB and regulate locally to 3.3 V.
- **i2c_addressing:** No fixed I2C address applies because the MCU is the I2C controller rather than an addressed peripheral. That is fully compatible with the planned digital-sensor architecture.
- **firmware_ecosystem:** Official ESP-IDF support is active, and Arduino-ESP32 also supports ESP32-C3 well. Native USB Serial and JTAG simplify bring-up and reflashing. BLE is modern, but Classic Bluetooth is not available.

### Operation

- **power_consumption:** Current Espressif documentation gives 5 uA deep sleep for the module class, and C3 is generally the easiest path here to lower controller overhead than classic ESP32 DevKit boards. Real dev boards still draw more because of regulator, USB, and LED overhead.
- **self_heating:** Usually lower than a busy dual-core ESP32 board, but still enough to bias nearby temperature and RH sensors if the sensor is cramped onto the same tiny PCB or placed too near the regulator and USB area.
- **thermal_mechanical_coupling:** Keep the sensor head physically offset from the USB connector, regulator, and antenna edge. Very small SuperMini boards make this spacing more important, not less.
- **interference_and_positioning:** Compact boards reduce antenna-to-sensor spacing, so enclosure layout matters. Keep metal away from the antenna edge, keep sensor cables away from the USB and power path, and prefer a separate sensor placement point instead of direct board stacking.

### Validation

- **calibration_support:** ESP-IDF provides ADC calibration support using on-chip eFuse-backed schemes for ESP32-C3, which is useful if an analog channel is ever needed. For the planned core sensors, the main benefit is that the controller is modern and well documented rather than that the node needs analog metrology.
- **independent_evidence:** Official documentation is strong and the market has clearly positioned ESP32-C3 as the modern low-cost successor class for simple connected nodes. The evidence base is less legacy-rich than classic ESP32, but the maintenance trajectory is more future-facing.
- **proposed_validation_protocol:** Standardize on one exact board revision, preferably a branded C3 board or official DevKitC-02. Then run 72 h Wi-Fi soak tests, validate boot and recovery behavior, log reset causes and packet loss, and if any analog input is used, compare calibrated ADC readings against reference voltages.
- **interpretation_limits:** A robust ESP32-C3 node does not prove environmental sensor accuracy. It demonstrates that the controller platform is adequate, modern, and cost-effective for the communication and acquisition role.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, compact ESP32-C3 boards in Brazil were roughly in the R$25-R$60 range for SuperMini-style boards. MakerHero and FilipeFlop examples were around R$25.90, while marketplace SuperMini listings were commonly in the roughly R$34-R$57 bracket. Official DevKitC-02 listings were much higher, sometimes above R$200.
- **availability:** Good in maker stores and very high in marketplaces for SuperMini-style boards. Official DevKitC-02 boards are available but less common and often far more expensive.
- **supply_origin:** Mostly Chinese-made modules and dev boards. Distributor channels can supply genuine modules reliably, while Brazilian retail commonly exposes third-party assembled boards.
- **counterfeit_or_substitution_risk:** Moderate to high for SuperMini boards because naming, PCB layout, regulator choice, USB implementation, and even first-boot procedure vary widely. The risk drops if the project standardizes on one specific branded or official board.
- **total_node_cost:** Usually the best balance of low controller cost and modern capability. It can keep BOM low while still giving a contemporary platform justification and lower controller overhead than classic ESP32 boards.

### Recommendation

- **strengths:** - Modern active platform for new low-cost designs<br>- Low controller cost with Wi-Fi and BLE 5<br>- Lower controller overhead than classic ESP32 DevKit boards<br>- Native USB Serial and JTAG simplify bring-up<br>- Enough peripherals for the planned digital-sensor architecture
- **weaknesses:** Single-core headroom is lower than classic dual-core ESP32, No Classic Bluetooth, SuperMini clone quality varies a lot, Official DevKit boards are much more expensive than clone boards
- **fit_for_tcc:** Very strong fit for a 2026 low-cost classroom environmental node if the team standardizes on one known-good board revision. It matches the planned digital-sensor architecture cleanly, keeps the controller cost low, and gives a more current thesis rationale than ESP8266.
- **recommendation_status:** recommended

### Other Info

- **id:** esp32_c3
- **name:** ESP32-C3 / DevKit or SuperMini
- **category:** microcontroller
- **role:** Modern low-cost alternative
- **retrieved_at:** 2026-08-14

### Uncertain fields

- model
- nominal_range
- stated_accuracy
- response_time
- spectral_response
- module_electrical_implementation


## DHT22 / AM2302

### Identification

- **object_level:** This item refers to the sensing element family and the common cabled or breakout-module implementations, not to one specific board. Bare 4-pin parts normally need an external pull-up; many 3-pin modules add the resistor and decoupling.
- **official_documentation:** AM2302 datasheet copy: https://cdn-shop.adafruit.com/datasheets/Digital%2Bhumidity%2Band%2Btemperature%2Bsensor%2BAM2302.pdf ; Adafruit guide: https://learn.adafruit.com/dht ; Arduino library docs: https://docs.arduino.cc/libraries/dht-sensor-library/ ; ESP-IDF component: https://components.espressif.com/components/esp-idf-lib/dht

### Measurement

- **measured_quantities:** Air temperature and relative humidity.
- **measurement_principle:** Capacitive humidity sensing plus integrated temperature sensing, with calibrated digital output over a proprietary single-bus interface.
- **nominal_range:** Humidity 0-99.9% RH; temperature -40 to 80 C per AM2302 documentation. Practical classroom operation is well inside that envelope, but condensation and stagnant air still reduce trustworthiness.
- **resolution:** 0.1% RH and 0.1 C.
- **repeatability_hysteresis_drift:** The AM2302 datasheet copy states repeatability of Â±1% RH and Â±0.2 C, humidity hysteresis of Â±0.3% RH, and long-term stability of Â±0.5% RH/year.
- **spectral_response:** Not applicable to a temperature and humidity sensor.

### Integration

- **interface:** Proprietary single-bus digital interface; not I2C.
- **supply_and_logic_voltage:** Typically 3.3-5.5 V supply. It can be used with 3.3 V ESP8266/ESP32 systems, but signal quality depends strongly on pull-up value, cable length, and board implementation.
- **i2c_addressing:** Not applicable; this device does not use I2C.
- **module_electrical_implementation:** Bare sensors usually need a 4.7-10 kOhm DATA pull-up. Many modules add the pull-up resistor and a capacitor, but board quality and resistor choice vary significantly by seller.
- **firmware_ecosystem:** Arduino support is mature through Adafruit's DHT library. ESP-IDF support exists through esp-idf-lib/dht and other community drivers, but the timing-critical single-bus protocol is less robust on multitasking Wi-Fi MCUs than modern I2C sensors, and issue trackers still show ESP32-related problems.

### Operation

- **power_consumption:** Adafruit documentation cites up to 2.5 mA during conversion. Average power can remain low because the sensor only updates every 2 s.
- **thermal_mechanical_coupling:** The cabled AM2302 style can be mounted away from the MCU, which is helpful. PCB-mounted DHT22 modules should be physically separated from the Wi-Fi SoC, regulator, and USB interface heat sources.
- **interference_and_positioning:** Single-wire signaling is more vulnerable to noise than short-board I2C. Avoid direct sun, supply-air jets, wall corners, and enclosed dead-air pockets; keep cable routing away from strong EMI sources.

### Validation

- **calibration_support:** Factory calibrated, but consumer modules normally do not include a traceable per-unit certificate. Practical correction is a software offset or lookup table, not a true field recalibration of the sensor internals.
- **independent_evidence:** K&R Smith's long-duration calibration notes found the factory calibration broadly usable but showed sensor-to-sensor spread and saturation behavior. A 2023 greenhouse study reported RMSE of 1.48 C and 3.18% RH versus a thermo-hygrometer, which is acceptable for basic monitoring but not precision metrology.
- **proposed_validation_protocol:** Use one calibrated thermo-hygrometer or data logger as the reference. Place the DHT22 and the reference in the same ventilated micro-environment, wait 20-30 min at each condition, then log at the device maximum rate for 10-15 min. Test at least three temperature conditions and, if possible, three RH conditions. Report mean bias, RMSE, and standard deviation; a practical TCC acceptance target is within about 0.7 C and 5% RH after any documented software offset.
- **interpretation_limits:** Do not claim laboratory-grade absolute accuracy, fast transient tracking, or whole-room spatial representativeness from one unaspirated DHT22 node. It is suitable for coarse monitoring and trend logging.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, Mercado Livre listings suggest roughly BRL 25-56 for local DHT22/AM2302 modules, with lower per-unit cost in multi-packs and higher prices for some branded kits.
- **supply_origin:** Mostly imported marketplace stock or local reseller inventory. Delivery is usually easy, but the exact chip origin and board revision are often opaque.
- **counterfeit_or_substitution_risk:** High. Naming is inconsistent across DHT22, AM2302, AM2303, and RHT03 listings, and module quality varies substantially.
- **total_node_cost:** Lowest total node cost in this comparison. It minimizes BOM cost, but may increase integration and validation effort.

### Recommendation

- **strengths:** Very low purchase cost, huge hobby ecosystem, simple 3.3/5 V electrical story, and easy to justify historically as a baseline.
- **weaknesses:** Slow updates, proprietary timing-sensitive bus, wider quality spread, weaker documentation chain, and higher substitution risk than newer I2C parts.
- **fit_for_tcc:** Useful as a low-cost comparison reference and historical baseline. It is not the strongest primary choice if the TCC needs a defensible sensor for partial validation in classrooms.
- **recommendation_status:** comparative reference

### Other Info

- **id:** dht22_am2302
- **name:** DHT22 / AM2302
- **category:** temperatura_umidade
- **role:** Widely used low-cost reference

### Uncertain fields

- manufacturer
- model
- lifecycle_status
- stated_accuracy
- response_time
- self_heating
- availability


## AHT20 / DHT20

### Identification

- **manufacturer:** Aosong / ASAIR
- **object_level:** This item refers to the AHT20 sensing chip and the common low-cost I2C breakout modules built around it. Some marketplace boards combine AHT20 with BMP280 or BME280 on the same PCB.
- **official_documentation:** Aosong datasheet: https://www.aosong.com/userfiles/files/media/Data%20Sheet%20AHT20.pdf ; Espressif component: https://components.espressif.com/components/espressif/aht20 ; Zephyr binding: https://docs.zephyrproject.org/latest/build/dts/api/bindings/sensor/aosong%2Caht20.html ; Adafruit guide: https://learn.adafruit.com/adafruit-aht20/overview

### Measurement

- **measured_quantities:** Air temperature and relative humidity.
- **measurement_principle:** MEMS capacitive humidity sensing element plus integrated temperature sensor with calibrated digital output over I2C.
- **nominal_range:** Humidity 0-100% RH; temperature -40 to 85 C. That fully covers classroom monitoring.
- **stated_accuracy:** Typically Â±2% RH and Â±0.3 C. Aosong notes that stated accuracy is based on factory test conditions around 3.3 V and 25 C.
- **spectral_response:** Not applicable to a temperature and humidity sensor.

### Integration

- **interface:** I2C.
- **supply_and_logic_voltage:** The chip is widely documented for about 2.0-5.5 V supply; breakout boards commonly advertise 3.3 V or 5 V logic compatibility.
- **i2c_addressing:** Single fixed I2C address 0x38. This is a real limitation if the node later needs multiple temperature/RH sensors on one bus.
- **module_electrical_implementation:** Most breakouts include pull-ups and decoupling, while better boards also add a regulator and Qwiic/STEMMA-style connectors. Combo boards can share pull-ups and create product-identification confusion.
- **firmware_ecosystem:** Strong low-cost ecosystem: official Espressif AHT20 component, Zephyr `aosong,aht20` binding, Adafruit and other Arduino support, plus broad ESPHome and MicroPython coverage.

### Operation

- **self_heating:** Usually better behaved than DHT22, but tiny breakouts can still read warm if mounted beside the ESP regulator, USB bridge, or status LEDs.
- **thermal_mechanical_coupling:** Because many AHT20 boards are tiny and sometimes combined with other sensors, placement discipline matters. Mount it away from the main MCU heat island or use a short cable/standoff arrangement.
- **interference_and_positioning:** I2C is electrically easier than DHT22 for short internal wiring, but long leads still need conservative bus speed and proper pull-ups. Avoid radiant heating, direct vent flow, and stagnant pockets.

### Validation

- **calibration_support:** Factory calibrated. Consumer breakouts usually do not include a traceable per-unit certificate, but application-level offset correction is straightforward.
- **proposed_validation_protocol:** Use the same reference and environment as for the other candidates, but sample at 1 Hz or slower over 10-15 min after stabilization. Test at least three temperature bands and, if possible, three RH bands. Report mean bias, RMSE, and repeatability; a practical TCC acceptance target is within about 0.5 C and 4% RH after any documented correction.
- **interpretation_limits:** Do not claim traceable metrology only from the datasheet. The fixed address also limits same-bus multi-point experiments unless the hardware adds a mux or separate bus.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, Brazilian marketplace offers cluster around BRL 31-47 for simple AHT20 modules, with higher pricing for combo boards or branded breakouts.
- **supply_origin:** Mostly imported modules or local reseller stock. Purchase repeatability improves if the project buys the same board revision repeatedly, because combined AHT20 plus BMP280/BME280 products vary.
- **counterfeit_or_substitution_risk:** Moderate. The larger risk is substitution or board ambiguity rather than pure counterfeit silicon: sellers mix AHT20, DHT20, and combo-board identities, and BMP280/BME280 labeling is often sloppy.
- **total_node_cost:** Still low total node cost; only a small step above DHT22 once enclosure, connectors, and power parts are counted.

### Recommendation

- **strengths:** Modern I2C interface, low cost, broad ESP32/ESP8266 support, and easier integration behavior than DHT22.
- **weaknesses:** Only one I2C address, thinner independent evidence base, and substantial variability between low-cost module implementations.
- **fit_for_tcc:** A credible low-cost alternative if budget pressure is high and the design only needs one temperature/RH sensor per bus. It is easier to defend than DHT22, but less robustly documented than SHT31.
- **recommendation_status:** alternative

### Other Info

- **id:** aht20
- **name:** AHT20 / DHT20
- **category:** temperatura_umidade
- **role:** Low-cost I2C alternative

### Uncertain fields

- model
- lifecycle_status
- resolution
- repeatability_hysteresis_drift
- response_time
- power_consumption
- independent_evidence
- availability


## Sensirion SHT31

### Identification

- **manufacturer:** Sensirion AG
- **model:** SHT31-DIS digital I2C family; marketplace modules may be sold as SHT31-D breakout boards or cabled probe boards.
- **object_level:** This item refers to the Sensirion SHT31 chip family and the common breakout or probe modules built around the digital I2C version.
- **lifecycle_status:** Active. Sensirion's catalog page and DigiKey Brazil listings show active availability in 2026.
- **official_documentation:** Sensirion product page: https://sensirion.com/products/catalog/SHT31-DIS-B ; Sensirion datasheet: https://sensirion.com/resource/datasheet/sht3x-d ; Sensirion specification note: https://sensirion.com/resource/application_note/sht/specification_sensors ; official Arduino library: https://github.com/Sensirion/arduino-i2c-sht3x ; official embedded driver: https://github.com/Sensirion/embedded-i2c-sht3x

### Measurement

- **measured_quantities:** Air temperature and relative humidity.
- **measurement_principle:** CMOSens capacitive humidity sensing with integrated temperature sensing, factory calibration, linearization, and digital compensation.
- **nominal_range:** Humidity 0-100% RH; temperature -40 to 125 C. Classroom operation stays in the most benign part of the range.
- **resolution:** 16-bit digital output; practical field resolution is much finer than classroom variability and is not the limiting factor for this application.
- **stated_accuracy:** Sensirion's product page states typical Â±2% RH and Â±0.2 C. Many breakout guides round temperature messaging to Â±0.3 C, but the vendor page is the stronger source.
- **repeatability_hysteresis_drift:** Sensirion's datasheet explicitly separates repeatability from calibration accuracy, and the application note explains hysteresis and long-term drift rather than collapsing them into one simplified headline number. This documentation quality is materially stronger than the lower-cost alternatives.
- **response_time:** Official product data gives 8 s RH response time (tau63%) and more than 2 s for temperature.
- **spectral_response:** Not applicable to a temperature and humidity sensor.

### Integration

- **interface:** I2C.
- **supply_and_logic_voltage:** About 2.15-5.5 V supply, with straightforward 3.3 V ESP32 and ESP8266 integration.
- **i2c_addressing:** Two user-selectable addresses, 0x44 or 0x45. That allows two sensors on one bus without adding a mux.
- **module_electrical_implementation:** Breakout quality is usually better than the low-cost average: common boards expose address selection, pull-ups, alert or heater pins, and sometimes protective membranes or weather-proof probe housings.
- **firmware_ecosystem:** Best-in-class in this comparison: official Sensirion Arduino and embedded drivers, Adafruit libraries, `esp-idf-lib/sht3x` in the ESP Component Registry, and broad Python/CircuitPython support.

### Operation

- **power_consumption:** Sensirion's product page lists 1.7 uA average supply current and 1500 uA maximum supply current, which is excellent for either USB-powered or low-duty-cycle battery logging.
- **self_heating:** Low sensor power helps, but some modules expose the internal heater or place the sensor close to regulators. Keep any heater feature off during ambient monitoring unless intentionally used for condensation handling.
- **thermal_mechanical_coupling:** The sensor rewards good mechanics: isolate it from board heat, provide vented enclosure openings, and prefer a remote probe module if the main node enclosure runs warm.
- **interference_and_positioning:** With correct pull-ups and short wiring, I2C integration is easier and more robust than DHT22. Avoid direct sun, supply-air jets, occupant breath plumes, and wall corners.

### Validation

- **calibration_support:** Factory calibrated and backed by strong vendor documentation, including a specification statement and ambient-testing guidance. Consumer modules still usually do not ship with a traceable per-unit certificate.
- **independent_evidence:** A 2025 comparative greenhouse paper and a 2026 vertical-garden comparison both indicate SHT31 produced lower error and better stability than DHT22. Additional IoT monitoring work also compares SHT31 against reference thermometer and hygrometer instruments, which strengthens its defensibility for academic use.
- **proposed_validation_protocol:** Use the same reference setup as for the lower-cost options, but target tighter acceptance. After 20-30 min stabilization at each condition, log 10-15 min of data at 1 Hz or slower across at least three temperature bands and, if possible, three RH bands. Report bias, RMSE, and repeatability; a practical TCC acceptance target is within about 0.4 C and 3% RH after any documented offset.
- **interpretation_limits:** Even SHT31 does not eliminate installation bias. One classroom node cannot prove whole-room uniformity, HVAC compliance, or laboratory traceability without careful placement and cross-checks.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, marketplace breakout and probe offers range roughly from BRL 22 to BRL 62, while DigiKey Brazil lists active raw-chip supply at about USD 4-5 plus freight and import terms.
- **availability:** Good. There are many marketplace modules and an authorized path through DigiKey Brazil for raw Sensirion parts.
- **supply_origin:** Marketplace modules are often imported generic boards; authorized raw parts are available through DigiKey Brazil with stated shipping and import terms.
- **counterfeit_or_substitution_risk:** Moderate, but lower than DHT22 when the raw part is purchased from an authorized distributor. On marketplace modules, the main risk is unlabeled substitution with SHT30, SHT35, or undocumented board revisions.
- **total_node_cost:** Highest of the three options, but still moderate in the context of a Wi-Fi node that also needs enclosure, connectors, power, and labor.

### Recommendation

- **strengths:** Strong documentation, strong firmware ecosystem, better address flexibility than AHT20, and the most defensible measurement chain for a TCC.
- **weaknesses:** Higher cost than DHT22 and AHT20, and still not immune to placement or enclosure bias.
- **fit_for_tcc:** Best primary candidate in this comparison if the objective is a technically defensible classroom monitor with partial validation and manageable firmware risk.
- **recommendation_status:** recommended

### Other Info

- **id:** sht31
- **name:** Sensirion SHT31
- **category:** temperatura_umidade
- **role:** Mid-range alternative with strong documentation


## Sensirion SHT40

### Identification

- **manufacturer:** Sensirion
- **model:** SHT40 family; baseline chip usually referenced as SHT40-AD1B, with AD1F membrane and AD1P protective-cover variants.
- **object_level:** Chip-level digital relative-humidity and temperature sensor; common breakout implementations include Adafruit SHT4x boards, DFRobot Fermion SHT40 boards, and generic GY-SHT40 modules.
- **lifecycle_status:** Active and suitable for new designs; DigiKey Brazil showed active SHT40 variants in stock on 2026-08-14.
- **official_documentation:** Primary sources: Sensirion SHT4x datasheet v7.3 (June 2026) https://sensirion.com/resource/datasheet/sht4x ; product page https://sensirion.com/products/catalog/SHT40 ; support page https://developer.sensirion.com/product-support/sht4x-humidity-and-temperature-sensor ; official embedded driver repositories https://github.com/Sensirion/embedded-sht and https://github.com/Sensirion/arduino-i2c-sht4x .

### Measurement

- **measured_quantities:** Relative humidity and air temperature.
- **measurement_principle:** Sensirion CMOSens digital humidity and temperature sensing platform with factory calibration and direct I2C digital output.
- **nominal_range:** Manufacturer range: 0 to 100 %RH and -40 to 125 degC. Expected useful classroom range is roughly 20 to 80 %RH and 15 to 35 degC if the sensor is ventilated and isolated from MCU heat.
- **stated_accuracy:** Typical RH accuracy is +/-1.8 %RH for SHT40; typical temperature accuracy commonly cited for SHT40 is +/-0.2 degC from 0 to 75 degC. Sensirion also shows wider maximum RH envelopes outside the central range, so system validation is still required.
- **response_time:** RH response time tau63 is 4 s at 25 degC and about 1 m/s airflow; conversion time is about 1.3 to 8.3 ms depending on repeatability setting.
- **spectral_response:** Not applicable; this item is not a light sensor.

### Integration

- **interface:** I2C only; supports standard, fast, and fast-mode-plus operation, with CRC-protected data words.
- **supply_and_logic_voltage:** Bare chip supply range is 1.08 to 3.6 V and is naturally compatible with 3.3 V logic. Breakout boards may expose 3.3 to 5 V VIN only when they add a regulator and level shifting.
- **i2c_addressing:** The current SHT4x datasheet lists SHT40-xD1B variants with preconfigured addresses 0x44, 0x45, and 0x46. Many breakout examples and Arduino examples default to 0x44.

### Operation

- **power_consumption:** Very low-power part; datasheet highlights about 0.4 uA average and 80 nA idle for the sensor itself. Breakout-board current can be materially higher because of regulators, pull-ups, and indicator circuitry.
- **self_heating:** Sensor self-heating is low in normal measurement mode because average current is very small, but the integrated heater intentionally disturbs ambient reading and should stay off during normal classroom logging.
- **thermal_mechanical_coupling:** Place the sensor away from ESP8266/ESP32 modules, USB regulators, and enclosed hot copper zones. Use a ventilated opening, short thermal path to ambient air, and avoid burying the sensor behind the PCB or near warm power parts.
- **interference_and_positioning:** Avoid direct sun, direct exhalation, condensation films, solvent or adhesive outgassing, stagnant enclosures, and long unshielded I2C runs. Sensor location matters more than nominal chip accuracy in a classroom node.

### Validation

- **calibration_support:** Each SHT4x is individually tested and calibrated; Sensirion states NIST-traceable calibration through an ISO/IEC 17025 accredited laboratory, unique serial numbers, and availability of sensor-specific calibration certificates for supported variants.
- **proposed_validation_protocol:** Use a calibrated reference thermo-hygrometer, stabilize both instruments for at least 15 to 20 min per point, test at minimum three temperature plateaus and three RH plateaus representative of indoor conditions, log repeated readings, and report bias, MAE, and RMSE. Acceptability for the TCC should be judged at system level, not by datasheet alone.
- **interpretation_limits:** This sensor can support defensible classroom monitoring, but it does not by itself justify claims of laboratory-grade ambient metrology, mean radiant temperature, airflow, dew-point traceability, or HVAC compliance without external reference calibration and installation controls.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, DigiKey Brazil listed SHT40 chips around USD 1.88 to USD 2.50 each depending on variant; local marketplace SHT40 modules appeared around BRL 65 to BRL 75. End-user cost depends strongly on whether the purchase is bare chip, branded breakout, or imported generic module.
- **availability:** Good on authorized distribution for bare parts and fair on marketplaces for modules. DigiKey Brazil showed thousands of SHT40-family pieces in stock, while local module choices were fewer and more heterogeneous than BME280 or BH1750.
- **supply_origin:** Mostly imported. Authorized distributors offer repeatable sourcing for the chip; marketplace modules are usually imported assemblies with less predictable BOM consistency, freight time, and tax treatment.
- **counterfeit_or_substitution_risk:** Medium. The chip family is well documented, but generic module BOM substitutions, unclear regulator choices, and variant confusion between SHT40, SHT41, and SHT45 remain realistic procurement risks.

### Recommendation

- **strengths:** Very low power, solid factory calibration story, strong documentation, good RH performance, and better technical defensibility than many hobby-market RH/T modules.
- **weaknesses:** Usually costs more than BME280-class modules, still needs careful mechanical placement, and local generic modules are less standardized than the chip itself.
- **fit_for_tcc:** Good fit if the project prioritizes defensible RH/T measurement and can accept a separate light sensor. It is especially attractive when the authors want stronger documentation and lower self-heating risk than cheaper all-in-one environmental modules.
- **recommendation_status:** recommended

### Other Info

- **id:** sht40
- **name:** Sensirion SHT40
- **category:** temperatura_umidade
- **role:** Recent alternative with good specification

### Uncertain fields

- resolution
- repeatability_hysteresis_drift
- module_electrical_implementation
- firmware_ecosystem
- independent_evidence
- total_node_cost


## Bosch BME280

### Identification

- **manufacturer:** Bosch Sensortec
- **model:** BME280 chip; common modules include generic GY-BME/P280 boards and branded breakouts such as Adafruit 2652.
- **object_level:** Chip-level combined humidity, pressure, and temperature sensor; most TCC use cases will buy it as a breakout module rather than solder the bare LGA package.
- **lifecycle_status:** Active for ongoing use; Bosch markets it with '10 years delivery'. Distributor lead time can still vary, and DigiKey Brazil showed a manufacturer lead time of 12 weeks on 2026-08-14.
- **official_documentation:** Primary sources: Bosch product page https://www.bosch-sensortec.com/en/products/environmental-sensors/humidity-sensors-bme280/ ; Bosch datasheet revision 1.24, February 2024 https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf ; official C driver https://github.com/boschsensortec/BME280_SensorAPI ; Bosch design guide https://community.bosch-sensortec.com/knowledge-base-pg631enp/post/bme280-series-humidity-sensor-design-guide-Kd4trHbdWbyNMv1 .

### Measurement

- **measured_quantities:** Relative humidity, air temperature estimate, and barometric pressure.
- **measurement_principle:** Digital MEMS environmental sensor with compensated humidity, pressure, and temperature outputs over I2C or SPI.
- **nominal_range:** Manufacturer operating range: 0 to 100 %RH, -40 to 85 degC, and 300 to 1100 hPa. For classroom TCC use, the pressure channel is extra capability rather than a core requirement.
- **repeatability_hysteresis_drift:** RH hysteresis is +/-1 %RH, RH nonlinearity 1 %RH, RH noise about 0.02 %RH RMS at highest oversampling, and RH long-term stability about 0.5 %RH/year.
- **response_time:** RH response time tau63 is 1 s. In forced mode and low-rate logging, the sensor can sleep between measurements to reduce power and self-heating.
- **spectral_response:** Not applicable; this item is not a light sensor.

### Integration

- **interface:** I2C and SPI.
- **supply_and_logic_voltage:** Bare chip supply is 1.71 to 3.6 V for VDD and 1.2 to 3.6 V for VDDIO. Many breakout boards add 3.3 V regulation and 5 V-tolerant level shifting, but not all generic boards do.
- **i2c_addressing:** Typical I2C addresses are 0x76 when SDO is tied low and 0x77 when SDO is tied high.
- **module_electrical_implementation:** Branded boards such as Adafruit explicitly provide a regulator and level shifting. Cheap marketplace boards vary: some are 3.3 V only, some include regulators, and some boards sold as 'BME280' actually carry BMP280 chips with no humidity channel.

### Operation

- **power_consumption:** Bosch lists about 1.8 uA at 1 Hz for humidity+temperature, 2.8 uA for pressure+temperature, 3.6 uA for humidity+pressure+temperature, and 0.1 uA in sleep mode.
- **self_heating:** Chip power is low, but breakout temperature readings can run warm when the module is close to the MCU, regulator, or Wi-Fi radio. In practice, placement often dominates the temperature error budget.
- **thermal_mechanical_coupling:** Keep the module away from hot regulators, USB bridges, and RF modules; expose the vent side to room air; and avoid enclosing the pressure port in a stagnant cavity if pressure is ever logged.
- **interference_and_positioning:** Use only in non-condensing environments. Direct sun, drafts across warm boards, PCB heat spreading, enclosure pressure effects, and poor airflow all distort ambient interpretation.

### Validation

- **calibration_support:** Factory trimming coefficients are stored on-chip, and Bosch provides design guidance and compensation formulas. That is useful for engineering repeatability, but it is not the same as receiving a traceable per-unit ambient calibration certificate.
- **independent_evidence:** Independent studies are easier to find than for SHT40. A 2026 low-cost weather-station study on ResearchGate reported that BME280 measurements can be useful after calibration but may still miss stricter WMO-style tolerance targets, especially for humidity. This supports using BME280 as a low-cost sensor, not as a reference instrument.
- **proposed_validation_protocol:** Compare the BME280 module against a calibrated thermo-hygrometer in at least three indoor temperature plateaus and three RH plateaus, log in forced mode at a low rate, and report bias before and after any offset correction. If pressure is not part of the TCC claims, validate only the temperature and RH channels you actually use.
- **interpretation_limits:** Do not overclaim the temperature channel as a reference ambient thermometer, and do not let the presence of a pressure channel expand the TCC scope unless pressure is also validated. Datasheet-level RH performance does not guarantee classroom-node performance on cheap breakout boards.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, Curto Circuito listed a BME280 module at BRL 49.90 promotional price, Shopee listings were around BRL 56.37, and Mercado Livre listings clustered around BRL 56 to BRL 66. DigiKey Brazil listed the bare chip around USD 4.00.
- **availability:** High. BME280 modules are easy to find in Brazil through local stores and marketplaces, and the chip is also available from international distributors.
- **supply_origin:** Both local stock and imported assemblies are common. Authorized distribution is more repeatable, while marketplace modules may vary in assembly quality and chip authenticity.
- **counterfeit_or_substitution_risk:** High for hobby-market modules. A recurring market problem is BMP280 boards being sold or labeled as BME280, which removes the humidity function entirely while looking almost identical.

### Recommendation

- **strengths:** Very common, low power, cheap, mature firmware support, and adds a pressure channel essentially for free.
- **weaknesses:** Humidity accuracy is weaker than dedicated higher-grade RH/T sensors, temperature can be installation-sensitive, and counterfeit or mislabeled modules are a real market risk.
- **fit_for_tcc:** Good as a low-cost alternative or comparison point, especially if pressure logging is interesting. Less defensible than SHT40 when the main priority is stronger RH/T measurement claims with lower procurement ambiguity.
- **recommendation_status:** alternative

### Other Info

- **id:** bme280
- **name:** Bosch BME280
- **category:** temperatura_umidade
- **role:** Common multi-variable alternative in modules

### Uncertain fields

- resolution
- stated_accuracy
- firmware_ecosystem
- total_node_cost


## ROHM BH1750

### Identification

- **manufacturer:** ROHM Semiconductor
- **model:** BH1750FVI-TR chip; common breakouts are GY-30, GY-302, and DFRobot SEN0097-style boards.
- **object_level:** Chip-level digital ambient-light sensor IC that is usually purchased as a low-cost breakout module rather than as the bare WSOF package.
- **lifecycle_status:** Distributor data on 2026-08-14 showed the chip as 'Not For New Designs' while still holding stock, so it remains usable as a market reference but is weaker for long-horizon new-platform standardization.
- **official_documentation:** Primary sources: ROHM BH1750FVI technical note/datasheet via Mouser PDF https://www.mouser.com/datasheet/2/348/bh1750fvi-e-186247.pdf ; ROHM product page https://www.rohm.com/web/global/products/-/product/BH1750FVI ; DigiKey Brazil product page https://www.digikey.com.br/pt/products/detail/rohm-semiconductor/BH1750FVI-TR/2041441 ; DFRobot module wiki https://wiki.dfrobot.com/sen0097/ ; widely used Arduino library https://github.com/claws/BH1750 .

### Measurement

- **measured_quantities:** Ambient light / illuminance reported in lux.
- **measurement_principle:** Photodiode with approximate human-eye response, integration amplifier, internal ADC, and on-chip digital illuminance calculation over I2C.
- **nominal_range:** Nominal range is 1 to 65535 lx in the standard modes. The datasheet also notes that measurement-time adjustment can extend practical detection to about 0.11 lx minimum and 100000 lx maximum. Typical classroom targets are usually far below the upper limit.
- **resolution:** High-resolution mode is 1 lx, high-resolution mode 2 is 0.5 lx, and low-resolution mode is 4 lx.
- **response_time:** High-resolution measurement time is about 120 to 180 ms; low-resolution measurement time is about 16 to 24 ms.
- **spectral_response:** The spectral response is intended to approximate the human eye and peaks around 560 nm according to distributor data. ROHM also states low infrared influence and relatively small dependence on common light-source types, but source spectrum and geometry still matter in practice.

### Integration

- **interface:** I2C.
- **supply_and_logic_voltage:** Bare chip supply is 2.4 to 3.6 V, with logic reference down to about 1.65 V. Many modules advertise 3.3 to 5 V power only because they add a regulator; that should be checked board by board.
- **i2c_addressing:** Two addresses are available: 0x23 is the common default, and 0x5C is selected when ADDR is driven high.

### Operation

- **self_heating:** Self-heating is usually negligible for classroom logging, but enclosure heating and direct radiant loading from lamps or sunlight can still bias readings.
- **thermal_mechanical_coupling:** Optical coupling matters more than thermal coupling here: the sensor should face the monitored light field consistently, avoid shading by the PCB or enclosure lip, and use a stable window or diffuser only if the same geometry is preserved during validation.
- **interference_and_positioning:** Strong directional effects, reflections, direct sun, source spectrum, shadows, and window materials can materially change readings. For classroom nodes, orientation and field-of-view consistency are essential if the data will be compared between rooms.

### Validation

- **calibration_support:** The datasheet supports measurement-time adjustment to compensate for optical-window influence, but I did not find evidence of per-unit traceable calibration or a strong manufacturer calibration workflow analogous to Sensirion's certificate path.
- **proposed_validation_protocol:** Validate against a calibrated lux meter at several indoor setpoints such as corridor low light, typical classroom artificial lighting, and window-side daylight. Keep geometry fixed, log at least 30 to 60 s per point, compare mean lux and repeatability, and document whether the node will be used for trend monitoring or for approximate compliance-style reporting.
- **interpretation_limits:** BH1750 is suitable for low-cost illuminance trends, not for claiming research-grade photometry, PPFD, solar irradiance, glare analysis, or exact regulatory lux compliance without a better reference instrument and geometry control.

### Feasibility

- **brazil_price_range:** As of 2026-08-14, Mercado Livre listings were commonly around BRL 18.94 to BRL 21.90 for GY-30/GY-302 modules, while DigiKey Brazil listed the bare chip at about USD 3.42 and a DFRobot board at about USD 4.50.
- **availability:** High for cheap modules and still acceptable for the bare chip at distributors. This is one of the easiest ambient-light sensors to buy locally in Brazil.
- **supply_origin:** Mostly marketplace modules and imported boards, with the chip also available from authorized distributors. Shipping repeatability is better through distributors than through anonymous module vendors.
- **counterfeit_or_substitution_risk:** Medium. The chip is common and inexpensive, but module electrical implementation varies widely, the lifecycle status is weaker than newer parts, and marketplace boards do not guarantee genuine Rohm silicon or a consistent regulator/level-shifter BOM.
- **total_node_cost:** Very low incremental cost. In practice the BH1750 module usually adds only about BRL 20 to BRL 30 to a classroom node, excluding enclosure changes for optical exposure.

### Recommendation

- **strengths:** Cheap, easy to integrate, fast enough for room logging, directly outputs lux, and is widely available in Brazil.
- **weaknesses:** Lifecycle status is weaker, absolute lux confidence is modest, module hardware varies, and readings depend strongly on spectrum and geometry.
- **fit_for_tcc:** Good as an economical classroom illuminance sensor when the TCC scope is trend monitoring or approximate room-light characterization rather than rigorous lux-meter replacement. It fits well as the low-cost reference option in a comparative selection.
- **recommendation_status:** comparative reference

### Other Info

- **id:** bh1750
- **name:** ROHM BH1750
- **category:** iluminancia
- **role:** Economic reference widely available

### Uncertain fields

- stated_accuracy
- repeatability_hysteresis_drift
- module_electrical_implementation
- firmware_ecosystem
- power_consumption
- independent_evidence
