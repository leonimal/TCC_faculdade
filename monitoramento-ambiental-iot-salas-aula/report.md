# Monitoramento ambiental com IoT em salas de aula

## Relatório acadêmico da pesquisa bibliográfica

Este relatório consolida a pesquisa aprofundada sobre monitoramento ambiental com Internet das Coisas em salas de aula, com ênfase no projeto e na validação de sensores de baixo custo. A síntese prioriza artigos científicos, normas técnicas, documentos oficiais e outras fontes primárias identificadas em cada eixo temático.

## Método

A revisão considerou o período de **2019-2026**, os critérios de inclusão e exclusão definidos no protocolo e os 21 objetos de pesquisa do plano. Cada resultado foi estruturado em 46 campos. Valores marcados como incertos foram omitidos da síntese detalhada, conforme o protocolo, sem que isso implique ausência de pesquisa sobre o tópico.

### Questão principal

Como sistemas IoT vem sendo projetados, validados e utilizados para monitorar as condicoes ambientais de salas de aula, e quais efeitos, limitacoes e lacunas sao relatados quanto a qualidade ambiental, saude, conforto, aprendizagem e operacao predial?

### Subquestão prática

Qual e a forma tecnicamente mais adequada e economicamente viavel de selecionar, posicionar, configurar, calibrar e validar sensores IoT baratos para medir CO2, temperatura, umidade, material particulado, VOC, ruido, iluminancia e ocupacao em uma sala de aula real?

## Sumário

1. [CO2, ventilacao e renovacao do ar](#co2-ventilacao-e-renovacao-do-ar)
2. [Temperatura, umidade e conforto termico](#temperatura-umidade-e-conforto-termico)
3. [Material particulado (PM1, PM2.5 e PM10)](#material-particulado-pm1-pm2-5-e-pm10)
4. [VOCs e poluentes gasosos (CO, NO2, O3 e formaldeido)](#vocs-e-poluentes-gasosos-co-no2-o3-e-formaldeido)
5. [Ruido e ambiente acustico](#ruido-e-ambiente-acustico)
6. [Iluminacao e conforto visual](#iluminacao-e-conforto-visual)
7. [Ocupacao, atividade e contexto de uso](#ocupacao-atividade-e-contexto-de-uso)
8. [Bioaerossois e risco de infeccao aerea](#bioaerossois-e-risco-de-infeccao-aerea)
9. [Filtracao, purificadores portateis e UVGI](#filtracao-purificadores-portateis-e-uvgi)
10. [Condicoes externas, infiltracao e eventos extremos](#condicoes-externas-infiltracao-e-eventos-extremos)
11. [Sensores de baixo custo, calibracao e QA/QC](#sensores-de-baixo-custo-calibracao-e-qa-qc)
12. [Projeto e validacao de um no IoT de baixo custo para salas de aula](#projeto-e-validacao-de-um-no-iot-de-baixo-custo-para-salas-de-aula)
13. [Conectividade, protocolos e interoperabilidade IoT](#conectividade-protocolos-e-interoperabilidade-iot)
14. [Edge, gateways, nuvem e gestao de dados](#edge-gateways-nuvem-e-gestao-de-dados)
15. [Dashboards, alertas, regras de decisao e automacao](#dashboards-alertas-regras-de-decisao-e-automacao)
16. [Indices compostos de IEQ/IAQ e ferramentas de decisao](#indices-compostos-de-ieq-iaq-e-ferramentas-de-decisao)
17. [Saude, conforto, cognicao e aprendizagem](#saude-conforto-cognicao-e-aprendizagem)
18. [Privacidade, ciberseguranca, etica e LGPD](#privacidade-ciberseguranca-etica-e-lgpd)
19. [Custo, energia, manutencao, escalabilidade e sustentabilidade](#custo-energia-manutencao-escalabilidade-e-sustentabilidade)
20. [Aceitacao, usabilidade e integracao a rotina escolar](#aceitacao-usabilidade-e-integracao-a-rotina-escolar)
21. [BIM, gemeos digitais e interoperabilidade semantica](#bim-gemeos-digitais-e-interoperabilidade-semantica)

---

## 1. CO2, ventilacao e renovacao do ar

### Identificação e base bibliográfica

#### Referências utilizadas

- ASHRAE. ASHRAE Position Document on Indoor Carbon Dioxide. Approved February 12, 2025; expires February 12, 2028.
- Ge B, Tieskens K, Vyas P, Botana Martinez MP, Yuan Y, Walsh KH, Main L, Bolton L, Yajima M, Fabian MP. Decision tools for schools using continuous indoor air quality monitors: a case study of CO2 in Boston Public Schools. The Lancet Regional Health - Americas. 2025;48:101148.
- Yuan Y, Yajima M, Lee J, Walsh KH, Tong B, Main L, Bolton L, Fabian MP. Estimating air exchange rates in thousands of elementary school classrooms using commercial CO2 sensors and machine learning. Indoor Environments. 2025.
- Honan D, Gallagher J, Garvey J, Littlewood J. Indoor Air Quality in Naturally Ventilated Primary Schools: A Systematic Review of the Assessment & Impacts of CO2 Levels. Buildings. 2024;14(12):4003.
- Mendez S, Gamelas CA, Felizardo M, Canha N, Correia C. Monitoring Indoor Air Quality in Classrooms Using Low-Cost Sensors: Does the Perception of Teachers Match Reality? Atmosphere. 2024;15(12):1450.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- US EPA. A Guide to Siting and Installing Air Sensors. Last updated January 7, 2026.
- US EPA. Air Sensor Use and Study Design. Last updated April 20, 2026.

#### Identificadores e endereços persistentes

- https://www.ashrae.org/file%20library/about/position%20documents/pd-on-indoor-carbon-dioxide-english.pdf
- https://doi.org/10.1016/j.lana.2025.101148
- https://www.sciencedirect.com/science/article/pii/S2950362025000128
- https://doi.org/10.3390/buildings14124003
- https://doi.org/10.3390/atmos15121450
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.epa.gov/air-sensor-toolbox/air-sensor-use-and-study-design
- https://sensirion.com/products/catalog/SCD41
- https://senseair.com/product/sunrise/
- https://sensirion.com/products/catalog/SGP30

#### Tipo e composição da evidência

Topic-level evidence synthesis combining peer-reviewed articles, a systematic review, district-scale field studies, IoT system papers, and official technical guidance.

#### Países e condições climáticas

Evidence spans temperate-cold northeastern United States (Boston Public Schools), maritime Ireland, Mediterranean Italy and Portugal, and mixed European school settings. The climate signal is important because winter heating seasons, shoulder seasons, and hot periods strongly affect outdoor-air use, window-opening behavior, and indoor-outdoor CO2 differentials.

### Escopo e método

#### Objetivo e questão de pesquisa

The shared objective across the literature is to use indoor CO2 as an occupancy-linked indicator of ventilation adequacy, classroom air renewal, and sometimes airborne infection risk management, while avoiding the common error of treating CO2 as a complete indoor air quality metric. For an IoT classroom deployment, the practical question is how to measure true CO2 continuously, position sensors defensibly, infer when air renewal is insufficient, and turn those signals into classroom-level or district-level actions.

#### Desenho dos estudos

The evidence base is mixed: systematic review, observational classroom monitoring, district-wide longitudinal monitoring, IoT system design papers, and applied analytics for air-exchange estimation. Most classroom studies are non-randomized field studies with repeated measurements under real occupancy and real operation of windows, doors, and HVAC.

#### Contexto educacional

The dominant context is K-12 classrooms and primary schools, with some higher-education classrooms used for method development. Ventilation modes include natural ventilation, mixed-mode rooms, and central mechanical systems; continuous CO2 monitoring is most informative in densely occupied classrooms where occupancy varies by lesson and the ability to increase outdoor air is operationally constrained.

#### Amostra e duração

The strongest large-scale field evidence is the Boston Public Schools dataset, which used 3,659 commercial IAQ monitors in 125 school buildings during the 2022-2023 school year and analyzed 245 million CO2 measurements. Complementary evidence includes a 125-study systematic review of naturally ventilated primary schools and several single-school or multi-classroom deployments with minute-scale or short-interval logging across weeks to months.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Core measured variables are indoor CO2 concentration in ppm, outdoor CO2 when available, air temperature in degrees Celsius, relative humidity in percent, and sometimes PM, CO, VOC-related indicators, and occupancy context. The most useful classroom ventilation indicators are indoor CO2, excess CO2 above outdoor baseline, daily peak CO2, time above operational thresholds, and decay or recovery behavior after occupancy.

#### Condições externas e linha de base

Outdoor CO2 and weather matter because classroom interpretation should use indoor-outdoor difference rather than indoor concentration alone whenever possible. Outdoor baseline also changes over time, and window opening, infiltration, wind, traffic-adjacent pollution, and extreme weather events can alter both ventilation effectiveness and the trade-off between fresh air and outdoor pollutant ingress.

#### Ocupação e atividade

CO2 in classrooms is dominated by human respiration, so occupancy density, class schedule, student age, lesson duration, room volume, vocal activity, and turnover between classes directly shape the signal. Short crowded periods can create fast rises, while lunch breaks, class changes, and after-school vacancy create the conditions needed for decay analysis and ventilation-rate estimation.

#### Operação da ventilação e filtração

Window and door opening, central HVAC outdoor-air delivery, exhaust operation, and demand-controlled ventilation shape indoor CO2 trajectories. The literature consistently shows lower and more stable CO2 in buildings with central mechanical ventilation; filtration can reduce particles and infection risk but does not remove CO2, so air cleaners are not substitutes for outdoor-air renewal when the problem is excess CO2.

#### Granularidade espacial

Room-level sensing is preferred because within-school and between-classroom heterogeneity is large. District-scale evidence shows that building averages can hide important classroom outliers, so one sensor per regularly occupied classroom is the defensible minimum for operational decision-making, with additional sensors only when the room is very large, unusually shaped, or known to stratify.

### Sensores, metrologia e dados

#### Especificações dos sensores

Recommended true-CO2 sensor class: NDIR or photoacoustic NDIR. Practical low-cost examples are Sensirion SCD41 (specified 400-5,000 ppm range on its main catalog page, small SMD format, low-power single-shot option) and Senseair Sunrise (NDIR, 0-10,000 ppm, accuracy about plus or minus 30 ppm plus 3 percent of reading, 30 s response, I2C/UART). These are suitable for embedded IoT nodes; higher-power modules such as Senseair S8 or K30 are also viable when mains power is available. For ventilation studies, sensor selection should favor stable true CO2 measurement over convenience features.

#### Calibração e garantia da qualidade

ASHRAE and EPA both emphasize that sensor performance, placement, and calibration determine whether the data are interpretable. A practical QA/QC workflow is pre-deployment co-location, clock synchronization, documented warm-up behavior, outdoor-background checks, periodic side-by-side rechecks, review of implausible flat lines or spikes, and explicit management of auto-baseline-correction behavior so a sensor is not silently forced toward a false baseline in persistently occupied rooms.

#### Aquisição e qualidade dos dados

Continuous logging at 1 to 5 minute intervals is usually adequate for dashboards and ventilation management, while 1 minute or finer resolution is preferable for decay modeling and event diagnosis. Data cleaning should remove startup transients, obvious communication gaps, and artifacts caused by unplugging, tampering, or relocation; completeness, uptime, and event annotation are as important as raw accuracy in school operations.

#### Sensor recomendado por variável

For CO2 and air-renewal work, recommend true CO2 by NDIR or photoacoustic NDIR as the primary variable. A robust low-cost stack is: true CO2 module (SCD41 or Sunrise), separate temperature and humidity sensor if thermal correction or comfort co-analysis is needed, and optional occupancy metadata from schedule integration rather than inferred occupancy alone. Avoid choosing an eCO2-only module for ventilation control or standards-related decisions.

#### Saídas úteis e unidades

The useful outputs are indoor CO2 in ppm, outdoor CO2 in ppm when measured, excess CO2 above outdoor baseline in ppm, time-above-threshold metrics in minutes or percent of occupied time, peak CO2 in ppm, and estimated air exchange rate in air changes per hour when the study design supports it.

#### Medição direta ou proxy

Indoor CO2 from NDIR or photoacoustic NDIR is a direct physical measurement of CO2 concentration. Ventilation adequacy, rebreathed fraction, occupancy, and infection-risk implications are derived proxies. eCO2 from MOS or VOC sensors is not direct CO2; it is a modeled estimate derived from gas-response patterns and should not be treated as interchangeable with true CO2.

#### Princípio de medição e seletividade

True classroom CO2 sensing should use NDIR or photoacoustic NDIR because these principles are selective to CO2 and widely used in building and IAQ applications. MOS/VOC devices such as the Sensirion SGP30 report TVOC and CO2eq-like outputs, which are useful for broad air-quality indication but are not selective enough for defensible ventilation-rate inference or school ventilation control.

#### Faixa útil e desempenho real

The operationally important classroom range is roughly outdoor background to 2,000 ppm, but sensors should tolerate occasional peaks far above that. District-scale evidence from Boston found an average school-day CO2 concentration of 841 ppm with daily peaks as high as 5,080 ppm, so classroom programs should not choose a sensor that saturates near 2,000 ppm if they expect diagnostic use during under-ventilated periods.

#### Regime de operação

Continuous monitoring is preferable to spot checks. A 1 minute interval supports near-real-time alerts and ventilation diagnostics; 5 minute intervals are acceptable for routine dashboards. Warm-up requirements must be respected, and continuous mains-powered operation with buffered local storage is preferable when the goal is defensible school operations data rather than personal portable monitoring.

#### Interferências e confundidores

Major confounders are poor placement near supply diffusers, returns, windows, doors, corners, direct breath plumes, or teacher stations; stratification in large rooms; changing outdoor baseline; occupancy misclassification; and automatic baseline correction in spaces that rarely reach outdoor-like concentrations. Interpretation is also confounded when users assume that high CO2 automatically identifies every IAQ hazard, which ASHRAE explicitly rejects.

#### Protocolo acessível de validação

For a TCC-scale protocol, co-locate all candidate classroom nodes together with one better reference-grade or better-characterized NDIR monitor for 7 to 14 days under real indoor conditions, then repeat an outdoor-background check at low-occupancy times. After installation, run at least one occupied-to-unoccupied decay test per classroom, document windows and HVAC state, and compare slopes across nodes. Keep photos, installation height, room geometry, and event logs so corrections remain reproducible.

#### Métricas de validação

Minimum metrics are bias in ppm, MAE, RMSE, slope and intercept versus the reference, inter-sensor correlation, uptime, missing-data fraction, and false-alert frequency. If air-exchange modeling is used, also report uncertainty of estimated ACH, sensitivity to occupancy assumptions, and repeatability of decay estimates across days.

#### Instalação e encapsulamento

EPA guidance supports placement near the breathing zone, about 3 to 6 ft above the floor. In classrooms, place the node away from windows, doors, HVAC inlets/outlets, corners, and direct solar gain; use a vented enclosure with free airflow; and physically isolate the sensing cavity from MCU heat sources when possible. If the ESP32 or power regulator warms the enclosure, temperature compensation may remain biased even when CO2 is stable.

#### Integração de hardware

Low-cost integration is straightforward with ESP32-class MCUs. SCD41 uses I2C; Sunrise supports I2C and UART; local buffering on flash or SD is useful for network outages; and a 5 V USB or DC wall supply is usually simpler than batteries for always-on school deployments. If LoRaWAN is used, edge aggregation can reduce bandwidth and preserve battery life, but Wi-Fi is simpler where campus infrastructure already exists.

#### Maturidade da evidência

Evidence maturity is high for the value of continuous true-CO2 monitoring as an operational ventilation indicator, moderate for low-cost sensor deployment methods in classrooms, and moderate for estimating classroom air-exchange rates from commercial sensor data. Evidence is weaker for universal threshold setting and for strong causal claims that common indoor CO2 levels alone directly drive health or learning effects independent of co-varying pollutants and thermal conditions.

#### Cuidados específicos por variável

Do not confuse true CO2 with eCO2 or CO2eq. Do not treat CO2 as a full IAQ score. Do not assume portable HEPA units will lower CO2. Be careful with auto-baseline correction in rooms that stay occupied most of the day. Thresholds should be operational aids, not universal health limits, and any attempt to estimate infection risk or ACH from CO2 must state assumptions about occupancy, mixing, and outdoor baseline.

### Arquitetura IoT

#### Arquitetura do sistema

A defensible architecture is classroom node to campus network to time-series database to dashboard and alerting layer. At room level, the node measures true CO2 continuously; at building or district level, dashboards rank classrooms by peak CO2, duration above action bands, and persistence of poor recovery. More advanced systems add outdoor nodes, edge filtering, and analytics for air-exchange estimation or prioritized maintenance tickets.

#### Conectividade e protocolos

Wi-Fi plus MQTT or HTTPS is the simplest pattern when school networking is available. LoRaWAN is attractive for district-scale retrofits because it lowers power use and extends range, and the Smart Healthy Schools literature explicitly highlights LoRaWAN for multi-room deployment. The best protocol choice depends more on campus infrastructure, security policy, and maintenance capacity than on sensing physics.

#### Interoperabilidade e modelo de dados

Interoperable outputs should at minimum include timestamp, room ID, sensor ID, CO2 ppm, temperature, relative humidity, occupancy status if known, and QA flags. JSON over MQTT or HTTP is sufficient for a TCC prototype; if long-term institutional integration is expected, room metadata and event logs should map cleanly to BMS, CMMS, or district dashboards so high-CO2 rooms can trigger work orders rather than just produce graphs.

#### Cibersegurança, privacidade e ética

CO2 monitoring is lower privacy risk than camera-based occupancy sensing, but room-level dashboards can still expose patterns of use, operational failures, or inequities between schools. Apply network segmentation, authenticated brokers or APIs, device identity management, encrypted transport, minimal personal data collection, and governance on who can view room-level results. If occupancy is inferred or linked to schedules, avoid creating individual-level surveillance interpretations.

### Análise, decisão e automação

#### Métodos analíticos

Common analyses include descriptive time series, occupied-period summaries, peak detection, duration-above-threshold metrics, indoor-outdoor differential analysis, clustering of classrooms by exposure profile, decay-based ACH estimation, and more recently machine-learning workflows that automate data cleaning and large-scale air-exchange estimation. For school operations, simple and explainable metrics usually outperform opaque models in usability.

#### Índice ou modelo derivado

Key derived quantities are excess CO2 above outdoor baseline, rebreathed fraction, and estimated air exchange rate. At a practical level, excess CO2 supports ventilation screening, while decay after occupancy or machine-learning workflows based on long sensor histories can estimate ACH. These models are useful only when assumptions about occupancy generation rate, mixing, and sensor quality are made explicit.

#### Regras de decisão e normas

ASHRAE does not endorse a single universal indoor CO2 limit for overall IAQ, so operational rules should be framed as action bands rather than health-based absolutes. A practical school rule set is: prioritize classrooms with repeated occupied-period peaks above about 1,000 ppm, urgent review when levels repeatedly exceed about 1,500 ppm, and diagnostic follow-up when recovery after vacancy is slow. Any band should also consider outdoor CO2, room schedule, and whether the room is naturally or mechanically ventilated.

#### Intervenção e automação

Interventions include opening windows and doors, increasing outdoor-air fraction, extending purge periods before occupancy, repairing or rebalancing fans, reducing crowding in persistently high-CO2 rooms, and using dashboards to prioritize HVAC investment. Automation can be as simple as room traffic-light alerts or as advanced as multi-room LoRa-based signaling and centralized control logic tied to ventilation equipment.

### Resultados e avaliação

#### Resultados ambientais

The clearest outcome is better visibility of under-ventilated classrooms and faster identification of rooms needing operational or capital action. Continuous monitoring supports reduced duration of excess CO2, more targeted ventilation corrections, and more defensible balancing of air renewal against thermal-energy penalties.

#### Saúde e aprendizagem

Field evidence links high classroom CO2 with poor ventilation and with worse perceived air quality, nonspecific symptoms, and poorer schoolwork outcomes in some studies, but ASHRAE states that direct evidence for pure-CO2 effects at commonly observed indoor concentrations remains inconsistent. The safer interpretation is that CO2 is a useful marker of occupancy-linked under-ventilation that may co-occur with exposures relevant to health and learning.

#### Integração objetiva e subjetiva

Several studies pair monitoring with teacher or occupant perception and show that perceptions do not always match measured conditions. For classroom management, short teacher feedback forms can complement sensor data, but decisions about ventilation upgrades should rely on measured trends rather than perception alone.

#### Resultados quantitativos

Boston Public Schools reported a school-day average CO2 concentration of 841 ppm with a standard deviation of 405 ppm, and daily peak values up to 5,080 ppm across 3,659 monitors in 125 buildings. The district-scale findings also showed lower and more stable CO2 in buildings with central mechanical ventilation, reinforcing the value of continuous room-level monitoring over occasional spot measurements.

#### Viabilidade e aceitação

True-CO2 classroom monitoring is technically feasible with low-cost hardware and scales well when installation and QA/QC are standardized. Acceptance is highest when dashboards are simple, alerts are tied to concrete actions, and the program is framed as ventilation support rather than staff surveillance. District partnerships show that the biggest barriers are maintenance workflow, network policy, and interpreting large data volumes, not sensor availability alone.

#### Validade e limitações

Limitations include room-to-room heterogeneity, imperfect mixing, missing outdoor baseline, uncertain occupancy generation rates, sensor drift, and threshold over-interpretation. Results from one district or climate do not transfer perfectly to another, and any claim about infection risk, learning, or health must separate what is directly measured from what is inferred through models and assumptions.

#### Contribuições e lacunas

The literature now supports a practical classroom-monitoring stack: room-level true CO2 sensing, defensible siting, continuous logging, and action-oriented dashboards. The main gaps are standardized low-cost validation protocols for schools, better guidance on sensor placement in complex classrooms, climate-specific action bands, and stronger evidence connecting continuous monitoring programs to long-term improvements in ventilation, equity, health, and educational outcomes.


---

## 2. Temperatura, umidade e conforto termico

### Identificação e base bibliográfica

#### Referências utilizadas

- Kirkil G. Effects of classroom temperature and humidity on student learning performance: an experimental study using sensor-based monitoring. Frontiers in Built Environment. 2025;11:1678438.
- Botana Martinez MP, Vyas PD, Walsh KH, Main L, Bolton L, Yuan Y, Yajima M, Fabian MP. Rethinking heat in thousands of school classrooms through continuous monitoring and novel exposure metrics. Indoor Environments. 2025;2(3):100105.
- de la Hoz-Torres ML, Aguilar-Aguilera AJ, Ruiz-Padillo DP, Martinez-Aires MD. An investigation of indoor thermal environments and thermal comfort in naturally ventilated educational buildings. Journal of Building Engineering. 2024;84:108677.
- Rizzo K, Camilleri M, Gatt D, Yousif C. Optimising Mechanical Ventilation for Indoor Air Quality and Thermal Comfort in a Mediterranean School Building. Sustainability. 2024;16(2):766.
- Hernandez W, Cañas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Al Jumaili T, Sabbagh M. Systematic Review for the Assessment of Indoor Environment Quality Factors and Sub-Indicators of Classrooms. International Journal of Sustainable Development and Planning. 2024;19(8):3255-3263.
- US EPA. A Guide to Siting and Installing Air Sensors. Last updated January 7, 2026.
- EPB Center. EN 16798-1: Indoor environmental input parameters for design and assessment of energy performance of buildings. Summary page accessed August 11, 2026.

#### Identificadores e endereços persistentes

- https://doi.org/10.3389/fbuil.2025.1678438
- https://doi.org/10.1016/j.indenv.2025.100105
- https://doi.org/10.1016/j.jobe.2024.108677
- https://doi.org/10.3390/su16020766
- https://doi.org/10.3390/s24165129
- https://doi.org/10.18280/ijsdp.190837
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://epb.center/document/en-16798-1/
- https://sensirion.com/products/catalog/SHT45
- https://sensirion.com/resource/datasheet/sht4x

#### Tipo e composição da evidência

Topic-level evidence synthesis combining experimental classroom studies, large-scale field monitoring, thermal-comfort field studies, IoT deployment papers, and standards-oriented guidance.

#### Países e condições climáticas

The evidence covers Türkiye, the northeastern United States, Spain, Malta, and broader international classroom reviews. Climate contexts include Mediterranean, temperate, and heat-stressed school buildings, which matters because naturally ventilated classrooms, top floors, and buildings with little or no mechanical cooling show stronger overheating and wider adaptive responses.

### Escopo e método

#### Objetivo e questão de pesquisa

The common goal is to quantify classroom temperature and relative humidity continuously, relate those measurements to thermal comfort and student outcomes, and use the results to guide ventilation, cooling, and operations. For an IoT classroom system, the key question is how to measure temperature and humidity cheaply but credibly, while recognizing that thermal comfort itself is a derived construct that also depends on radiant temperature, air speed, clothing, metabolism, adaptation, and occupant perception.

#### Desenho dos estudos

The topic relies on observational field studies, experimental or quasi-experimental classroom studies, district-scale longitudinal sensor networks, and IoT system implementation papers. Many studies pair objective measurements with surveys or comfort models such as PMV/PPD or adaptive comfort frameworks.

#### Contexto educacional

The evidence spans primary, secondary, and university classrooms with naturally ventilated, mixed-mode, and mechanically conditioned rooms. The operational problems are consistent across settings: overheating on upper floors, uneven conditions between classrooms in the same building, and comfort-energy trade-offs when ventilation is increased without adequate cooling or shading.

#### Amostra e duração

Large-scale evidence includes minute-level temperature monitoring from more than 3,600 classrooms in 125 Boston school buildings during the 2023 hot season. Other field studies follow classrooms over weeks, seasons, or a full academic year, while experimental studies use shorter controlled periods to link thermal conditions with comfort and learning performance.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Core variables are air temperature in degrees Celsius and relative humidity in percent. For full comfort assessment, the literature also highlights mean radiant temperature, operative temperature, air speed, outdoor conditions, occupancy, solar exposure, and sometimes PMV/PPD, adaptive comfort metrics, and overheating exposure metrics that capture intensity, frequency, and duration rather than simple daily averages.

#### Condições externas e linha de base

Outdoor temperature, humidity, solar gains, and building orientation strongly shape indoor thermal loads, especially in naturally ventilated and lightly conditioned classrooms. Outdoor conditions are also needed for adaptive comfort interpretation, because acceptable indoor temperature ranges widen when occupants can adapt and outdoor conditions are warmer.

#### Ocupação e atividade

Classrooms are mostly sedentary spaces, but occupancy density, lesson duration, computer use, vocal activity, and the number of bodies in the room still add internal heat and moisture loads. Class schedules matter because start-of-day conditions, occupancy peaks, and post-break recovery periods can differ sharply within the same room.

#### Operação da ventilação e filtração

Thermal comfort outcomes depend on how ventilation is delivered and whether cooling is available. Natural ventilation can improve perceived freshness but may raise or lower temperature depending on season and outdoor conditions; central AC, window AC, and no-AC classrooms show clearly different heat exposure profiles. Filtration has little direct thermal benefit unless coupled with fans that alter air movement and perceived comfort.

#### Granularidade espacial

Thermal conditions vary substantially within buildings and even within single classrooms, so one centrally placed node is a minimum, not a full map. Boston district data showed average intra-building temperature variation of 2.3 degrees Celsius and a maximum of 14.3 degrees Celsius, demonstrating that school-level or even building-level averages can mask room-level discomfort and inequity.

### Sensores, metrologia e dados

#### Especificações dos sensores

For low-cost IoT monitoring of temperature and humidity, a practical core sensor is the Sensirion SHT45: digital I2C interface, operating range of 0 to 100 percent RH and minus 40 to 125 degrees Celsius, typical accuracy around plus or minus 1 percent RH and plus or minus 0.1 degrees Celsius, and strong low-power performance. For full research-grade thermal comfort, add sensors or instruments for mean radiant temperature and air speed because temperature and humidity alone cannot fully reproduce PMV/PPD or local discomfort metrics.

#### Calibração e garantia da qualidade

Temperature and humidity nodes should be co-located before deployment, checked again after field use, and inspected for enclosure-induced self-heating or moisture lag. QA/QC should include time synchronization, removal of startup transients, shielding from direct sun, and confirmation that the sensor is not mounted in a stagnant enclosure or near a hot regulator, display, or Wi-Fi radio.

#### Aquisição e qualidade dos dados

Continuous logging at 1 to 5 minute intervals is suitable for school operations, while 30 to 60 second sampling helps research on fast indoor dynamics and exposure metrics. Data cleaning should flag implausible steps, flat lines, sensor warm-up periods, and abrupt changes caused by relocation or unplugging. Missing data and uptime should be reported explicitly because exposure metrics are sensitive to gaps on the hottest days.

#### Sensor recomendado por variável

For temperature and relative humidity, recommend a digital CMOS sensor class with documented field use and low drift, such as the SHT45. If the aim is true thermal comfort rather than simple screening, also recommend at least one radiant-temperature channel and, where drafts matter, an air-speed measurement path. For a low-cost TCC prototype, start with T and RH plus occupant surveys, and only add globe temperature or air-speed modules where the research question requires standards-grade comfort modeling.

#### Saídas úteis e unidades

Useful outputs are air temperature in degrees Celsius, relative humidity in percent, derived absolute humidity or dew point when needed, occupied-period mean and peak temperature, overheating duration, percent of time outside comfort bands, and if enough variables are available, operative temperature and comfort-classification outputs.

#### Medição direta ou proxy

Air temperature and relative humidity are direct physical measurements. Thermal comfort is not directly measured by the sensor; it is inferred through comfort models or captured subjectively with occupant votes. A node that measures only temperature and humidity provides a useful proxy for screening comfort risk but not a complete comfort diagnosis.

#### Princípio de medição e seletividade

Modern classroom T/RH nodes typically use integrated CMOS humidity and temperature sensors with digital preprocessing and humidity compensation. These sensors are selective and mature for T/RH, but they do not directly sense radiant asymmetry, air movement, or personal adaptation, which are often the missing pieces in classroom comfort interpretation.

#### Faixa útil e desempenho real

A practical classroom monitoring range is about 15 to 35 degrees Celsius and 20 to 80 percent RH, though sensors should cover wider extremes to avoid clipping during storage or severe weather. Experimental evidence from Kirkil 2025 suggests that maintaining classrooms around 20 to 22 degrees Celsius was associated with better learning performance in that study, while district-scale monitoring shows that substantial overheating still occurs in schools with weak cooling provision.

#### Regime de operação

Continuous operation is preferred, with 1 minute sampling for exposure analytics and 5 minute sampling acceptable for dashboarding and alerts. A short warm-up period and stable airflow around the sensing element are important. For dense deployments, mains-powered nodes are easier to maintain than battery nodes once communication, display, and uptime requirements are considered.

#### Interferências e confundidores

Major confounders are direct solar radiation, self-heating from the MCU or power regulation, placement near windows, doors, ducts, or occupants, condensation, and poor enclosure ventilation. Relative humidity readings are also temperature-dependent in practice, so a thermally biased node often produces both wrong temperature and misleading humidity.

#### Protocolo acessível de validação

A low-cost protocol is to co-locate all classroom nodes with one better-characterized temperature and humidity reference in a shaded indoor location for 24 to 72 hours across cool and warm conditions, then repeat a shorter post-deployment check. During installation, record room orientation, height, distance from windows and HVAC, and any shielding. If comfort modeling is required, add a black-globe or radiant-temperature measurement for a subset of rooms to calibrate how much information the simpler nodes miss.

#### Métricas de validação

Recommended metrics are temperature bias in degrees Celsius, RH bias in percent RH, MAE, RMSE, inter-sensor agreement, drift between pre- and post-checks, uptime, and missing-data fraction. For comfort analytics, also report how often simplified T/RH-based alerts agree with a fuller comfort assessment that includes radiant temperature, air speed, and occupant feedback.

#### Instalação e encapsulamento

Install the node in the occupied zone, typically near seated head height, with free airflow and protection from direct solar gain. Keep it away from windows, doors, supply vents, radiators, projectors, and electronics that radiate heat. Use a vented enclosure and, if the controller runs warm, physically separate the sensing head from the main PCB or use stand-offs and openings that prevent heat buildup.

#### Integração de hardware

SHT45-class sensors integrate easily over I2C with ESP32-class MCUs and have low power demand, making them suitable for classroom nodes with local storage and Wi-Fi or LoRa uplinks. For richer comfort nodes, add optional globe-temperature and air-speed channels, but expect higher power use, more wiring complexity, and greater calibration burden.

#### Maturidade da evidência

Evidence maturity is high for low-cost continuous temperature and humidity measurement, moderate for using dense classroom monitoring to reveal overheating inequity, and moderate for comfort inference from simplified sensor sets. Evidence is weaker whenever a study tries to infer full thermal comfort from temperature and humidity alone without radiant temperature, air speed, and subjective responses.

#### Cuidados específicos por variável

Temperature and humidity are necessary but not sufficient for thermal comfort. Avoid self-heating, sunlit walls, and HVAC drafts. RH should not be interpreted without temperature context. Simple thresholds are useful for screening, but naturally ventilated classrooms often show adaptive behavior that can make fixed narrow setpoints misleading.

### Arquitetura IoT

#### Arquitetura do sistema

A suitable architecture is classroom node to gateway or campus network to time-series storage to dashboards that summarize occupied-period temperature, RH, and overheating metrics. At scale, the dashboard should support room, building, floor, and district views so facilities teams can identify top-floor overheating, weak AC performance, and rooms that consistently fall outside operational comfort bands.

#### Conectividade e protocolos

Wi-Fi plus MQTT or HTTPS is usually the fastest route for pilot deployments. LoRaWAN is attractive for dense retrofits with sparse power and network access. The protocol decision should reflect school IT policy, expected message frequency, and whether the program needs near-real-time alerts or mainly daily analytics.

#### Interoperabilidade e modelo de dados

Each record should include timestamp, room ID, sensor ID, air temperature, RH, occupancy flag if available, and QA status. Interoperability is better when room metadata includes floor, orientation, HVAC type, and whether the room has central AC, window AC, or no AC, because these attributes materially improve later analysis and actionability.

#### Cibersegurança, privacidade e ética

Temperature and humidity monitoring carries little direct privacy risk, but room-level heat maps can expose inequities between classes or schools and can still be misused for staff performance narratives. Use authenticated devices and encrypted transport, restrict access to room-level dashboards to operational roles, and frame the system as environmental monitoring rather than behavioral surveillance.

### Análise, decisão e automação

#### Métodos analíticos

Useful methods include time-series summaries by occupied period, overheating metrics, comparison across HVAC categories, floor-level and orientation-level stratification, PMV or adaptive comfort calculations when enough variables are available, and mixed objective-subjective analysis that compares sensor outputs with occupant comfort votes.

#### Índice ou modelo derivado

Derived measures include dew point, apparent moisture patterns, occupied-period overheating duration, adaptive comfort classification, and if the instrument set is complete enough, PMV/PPD or operative temperature. The Boston heat paper also highlights the value of exposure metrics that combine intensity, frequency, and duration instead of relying only on daily mean temperature.

#### Regras de decisão e normas

A two-layer rule set is best. For rigorous comfort studies, apply ASHRAE 55 or EN 16798-style methods using operative temperature and the relevant contextual variables. For school operations dashboards, use simple screening alerts such as persistent occupied temperatures below about 20 degrees Celsius in cool periods or above about 26 degrees Celsius in warm periods, plus RH excursions above about 60 percent, while recognizing that naturally ventilated classrooms may accept broader adaptive ranges.

#### Intervenção e automação

Operational actions include shading, purge ventilation at appropriate times, HVAC schedule adjustment, fan-speed or setpoint tuning, room reassignment during extreme heat, and capital prioritization for classrooms with chronic overheating. Automation can escalate from traffic-light dashboards to rule-based HVAC or window-control logic, but the control design should avoid solving temperature problems by sacrificing ventilation quality.

### Resultados e avaliação

#### Resultados ambientais

Continuous monitoring reveals overheating hotspots, floor-to-floor inequity, and the thermal cost of inadequate cooling capacity. It also helps distinguish transient discomfort from chronic building performance problems and supports evidence-based prioritization of cooling, shading, and envelope interventions.

#### Saúde e aprendizagem

The literature consistently treats thermal comfort as relevant to concentration, satisfaction, and learning conditions. In Kirkil 2025, maintaining classrooms around 20 to 22 degrees Celsius was identified as important for academic performance in that experiment. Large-scale heat monitoring further shows that students in classrooms without effective AC face substantially higher exposure to extreme heat, which is a clear resilience and equity concern.

#### Integração objetiva e subjetiva

Combining sensors with quick thermal sensation or satisfaction surveys is strongly recommended because students often adapt differently than predicted by generic adult-centered models. Studies in educational buildings report that subjective responses can reveal broader acceptable ranges or different preferred temperatures than standard models suggest.

#### Resultados quantitativos

Key quantitative findings include: the Boston district study monitored minute-level temperature data from over 3,600 classrooms in 125 buildings; average intra-building temperature variation was 2.3 degrees Celsius, with a maximum of 14.3 degrees Celsius; and on hot days classrooms exceeded extreme-caution thresholds by 0.1 percent, 1.1 percent, and 8.4 percent in schools with central AC, window AC, and no AC, respectively. Kirkil 2025 also reported that 20 to 22 degrees Celsius was the most favorable range in that learning-performance experiment.

#### Viabilidade e aceitação

Temperature and humidity monitoring is one of the most feasible parts of a classroom IoT stack because sensors are cheap, compact, and mature. Acceptance is typically high when the output is easy to understand and clearly linked to building improvements rather than individual blame. The main challenge is not sensing cost but disciplined installation, metadata capture, and using the data to trigger real facilities action.

#### Validade e limitações

A T/RH-only node does not fully measure thermal comfort, and room-level conditions can vary enough that one sensor may not represent every desk. Seasonal adaptation, clothing, radiant asymmetry, and airflow remain important unmeasured factors in many low-cost deployments. Results also depend strongly on building type, orientation, and climate, so threshold transfer should be done cautiously.

#### Contribuições e lacunas

The literature provides a clear pathway for low-cost classroom thermal monitoring: use reliable T/RH sensors, install them carefully, log continuously, and combine room-level metrics with metadata and occupant feedback. The main gaps are more classroom studies with full comfort instrumentation, better validation of simplified alert rules against formal standards, and stronger longitudinal evidence that sensor-driven interventions improve thermal equity, learning conditions, and resilience under extreme heat.


---

## 3. Material particulado (PM1, PM2.5 e PM10)

### Identificação e base bibliográfica

#### Referências utilizadas

- World Health Organization. WHO global air quality guidelines: particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide. Geneva, 2021.
- U.S. EPA. Low-Cost Air Pollution Monitors and Indoor Air Quality. Web guidance, accessed 2026-08-11.
- U.S. EPA. A Guide to Siting and Installing Air Sensors. Web guidance, accessed 2026-08-11.
- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments, 2024.
- Barros N et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors, 2024.
- Canha N, Correia C, Mendez S, Gamelas CA, Felizardo M. Monitoring Indoor Air Quality in Classrooms Using Low-Cost Sensors: Does the Perception of Teachers Match Reality? Atmosphere, 2024.
- Azoulay Kochavi S, Kira O, Gal E. Real-Time Monitoring of Environmental Parameters in Schools to Improve Indoor Resilience Under Extreme Events. Smart Cities, 2025.
- Zou Y et al. Examining the functional range of commercially available low-cost airborne particle sensors and consequences for monitoring of indoor air quality in residences. Indoor Air, 2020.
- Sensirion. Datasheet SEN5x. 2022.
- Plantower. PMS5003 laser PM sensor product sheet. Accessed 2026-08-11.

#### Identificadores e endereços persistentes

- https://www.who.int/publications/i/item/9789240034228
- https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants
- https://www.epa.gov/indoor-air-quality-iaq/low-cost-air-pollution-monitors-and-indoor-air-quality
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://doi.org/10.3233/AIS-220577
- https://doi.org/10.3390/s24010148
- https://doi.org/10.3390/atmos15121450
- https://doi.org/10.3390/smartcities8010007
- https://doi.org/10.1111/ina.12621
- https://sensirion.com/resource/datasheet/sen5x
- https://www.plantower.com/en/products_33/74.html

#### Tipo e composição da evidência

Topic-level evidence synthesis combining guideline documents, classroom IoT field studies, sensor datasheets, and sensor-performance literature.

#### Países e condições climáticas

Multi-country evidence. Classroom studies and reviews include Portugal, Israel, Italy, North America, Europe, Africa, and Asia. Reported classroom PM behavior varies with traffic exposure, dust episodes, wildfire smoke, season, and window-driven versus HVAC-driven ventilation regimes.

### Escopo e método

#### Objetivo e questão de pesquisa

To identify the technically sound and economically viable way to monitor PM1, PM2.5, and PM10 in real classrooms using low-cost IoT nodes, while separating what is useful for trend tracking and interventions from what is reliable enough for exposure assessment. The key practical question is how to choose, place, calibrate, and validate optical PM sensors so that classroom decisions about ventilation, filtration, and source control are defensible.

#### Desenho dos estudos

Narrative topic synthesis anchored in recent classroom deployments, a 2019-2026 review window, official health guidelines, and manufacturer specifications. Evidence combines school-specific field observations with broader indoor PM sensor validation studies because classroom-only validation data remain limited.

#### Contexto educacional

Applicable to K-12 and higher-education classrooms, including naturally ventilated and mechanically ventilated rooms. The most relevant classroom features are occupancy density, teacher and student movement, chalk or whiteboard use, cleaning timing, proximity to roads or dusty yards, and the presence or absence of filtration.

#### Amostra e duração

Evidence spans short classroom campaigns, multi-room school pilots, and long-term sensor evaluations. SchoolAIR reports university-classroom testing followed by deployment in a secondary school, and a 2024 Portuguese classroom study monitored 170 class sessions; broader school exposure studies range from days to multiple seasons.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Primary variables are PM1, PM2.5, and PM10 in micrograms per cubic meter. Useful companion variables are temperature, relative humidity, occupancy schedule, window and door state, filtration status, and outdoor PM, because interpretation of PM peaks without these contextual variables is weak.

#### Condições externas e linha de base

Outdoor background strongly shapes classroom PM through infiltration, especially near traffic, dusty roads, construction, biomass burning, or wildfire smoke. Indoor spikes above outdoor baseline commonly come from resuspension, cleaning, chalk dust, crafts, and high activity. A paired outdoor node or nearby trusted outdoor monitor is highly recommended to separate infiltration from indoor generation.

#### Ocupação e atividade

PM in classrooms is highly occupancy-sensitive. Entering, exiting, walking, chair movement, sweeping, dusting, and chalk use can raise coarse and fine particle levels quickly. High indoor to outdoor ratios during occupied periods often indicate resuspension rather than outdoor intrusion alone.

#### Operação da ventilação e filtração

Natural ventilation can reduce indoor-generated PM when outdoor air is cleaner than indoor air, but it can worsen indoor PM when outdoor air is polluted. Mechanical ventilation and portable HEPA filtration are the most consistent PM control strategies in classrooms. For PM events, windows-open is not automatically good; the decision should depend on outdoor PM and wind conditions.

#### Granularidade espacial

One well-sited node per typical classroom is the minimum viable layout, plus one outdoor reference if possible. Large, elongated, or mixed-use rooms benefit from two indoor nodes to separate teacher zone, student zone, and near-window effects. Sensor height should approximate breathing-zone conditions rather than floor or ceiling extremes.

### Sensores, metrologia e dados

#### Especificações dos sensores

Best-supported low-cost PM options are fan-assisted optical particle sensors. Sensirion SEN5x reports PM1, PM2.5, PM4, and PM10 with a 1 second sampling interval, 0 to 1000 micrograms per cubic meter range, and stronger stated precision for PM1 and PM2.5 than for PM10. Plantower PMS5003 is a common ultra-low-cost laser-scattering option with PM1, PM2.5, and PM10 outputs and a minimum particle size around 0.3 micrometers, but long-term field performance depends heavily on aerosol type and QA/QC.

#### Calibração e garantia da qualidade

Factory calibration is not sufficient for defensible classroom use. Each sensor type should undergo warm-up, side-by-side duplicate checks, and at least one collocation against a trusted instrument or a higher-quality reference monitor under realistic classroom or near-classroom conditions. RH-aware correction, firmware version logging, periodic zero or clean-air checks when feasible, and replacement of drifted or fan-failed units are important QA/QC steps.

#### Aquisição e qualidade dos dados

Collect raw data at 1 to 10 second intervals when the sensor supports it, then store 1 minute and 5 minute aggregates for dashboards and analysis. Preserve timestamps, device ID, firmware, and uptime flags. Missing-data handling should distinguish communication loss from sensor fault from power loss. Short spikes are informative for source finding, so overly aggressive smoothing should be avoided.

#### Sensor recomendado por variável

PM1: prefer Sensirion SEN55 or SPS30-class optical sensors when budget allows; PMSA003I or PMS5003 are acceptable low-cost alternatives for trend monitoring. PM2.5: same recommendation as PM1, with PM2.5 usually being the most trustworthy low-cost PM output after local correction. PM10: use only as an indicative value from optical sensors and interpret cautiously because this channel is usually calculated from particle-size distribution assumptions and is more sensitive to aspiration, coarse dust, and resuspension artifacts.

#### Saídas úteis e unidades

Useful outputs are PM1, PM2.5, and PM10 mass concentration in micrograms per cubic meter. Particle number bins or counts are valuable diagnostic outputs when available because they help identify coarse dust versus fine combustion-dominated events. For decision support, PM2.5 is generally the most actionable output.

#### Medição direta ou proxy

Low-cost optical PM sensors do not directly weigh aerosol mass. They infer particle concentration from scattered light and then convert that signal into estimated PM mass using embedded assumptions about particle size distribution, density, and optical properties. In classroom practice, PM1 and PM2.5 are useful calibrated proxies; PM10 is a weaker proxy.

#### Princípio de medição e seletividade

Measurement principle is laser light scattering with fan-driven airflow. Selectivity to particle composition is limited; the sensor is sensitive to size and optical behavior rather than toxicology or chemistry. Hygroscopic particles, dust, smoke, and chalk can produce different mass errors even at the same true gravimetric concentration.

#### Faixa útil e desempenho real

For classroom use, the most relevant range is roughly from single-digit micrograms per cubic meter to low hundreds. Sensor literature indicates lower functional bounds near 3 to 15 micrograms per cubic meter and nonlinearity beginning somewhere between about 300 and 3000 micrograms per cubic meter, depending on sensor and aerosol. Real-world confidence is highest for PM2.5 trend tracking and lower for absolute PM10 values.

#### Regime de operação

Continuous operation is preferred. A 1 second native sampling cycle with 1 minute reporting is a good default for classroom IoT. Allow sensor-specific startup stabilization before trusting data after boot. Duty-cycling is usually not recommended for fan-based PM sensors unless the chosen sensor explicitly supports it, because warm-up and flow transients can bias results.

#### Interferências e confundidores

Major confounders are relative humidity, aerosol composition, coarse dust bursts, inlet obstruction, fan degradation, enclosure recirculation, and proximity to windows, doors, supply diffusers, or direct particle sources. Cleaning events and student movement can dominate PM10-like signals without representing persistent exposure conditions.

#### Protocolo acessível de validação

A practical TCC-level protocol is 7 to 14 days of collocation between the classroom node and one higher-quality PM instrument, ideally covering occupancy, cleaning, and one outdoor episode. Record PM, RH, temperature, and occupancy notes. Derive a local correction for PM2.5 if needed, inspect residuals by RH and time of day, then verify on a second short campaign. Duplicate low-cost nodes can also be colocated to quantify precision before field deployment.

#### Métricas de validação

Report bias, MAE, RMSE, normalized error, slope, intercept, Pearson r or R2, response to step changes, data completeness, and uptime. For classroom decision support, duplicate agreement and event-detection fidelity are often as important as absolute concentration accuracy.

#### Instalação e encapsulamento

Install near the breathing zone at about 3 to 6 feet, with free airflow around the inlet. Avoid corners, behind furniture, directly beside windows, doors, or HVAC supply and return jets, and avoid placing the node immediately next to chalk trays, printers, or cleaners. Use a vented enclosure that does not short-circuit the fan flow or trap self-generated heat and dust.

#### Integração de hardware

Most low-cost PM modules integrate easily with ESP32-class MCUs through UART or I2C depending on model. Fan-assisted PM sensors usually require a stable 5 V rail and have current peaks well above simple digital temperature sensors, so USB power or a well-sized regulator is preferred. Local buffering, watchdog reboot logic, and status flags for fan or laser faults improve field reliability.

#### Maturidade da evidência

Evidence maturity is relatively strong for low-cost classroom PM trend monitoring, especially for PM2.5, because there are multiple reviews, many field studies, and mature optical sensor products. Evidence is weaker for absolute PM10 accuracy in real classrooms and for long-term classroom-specific correction stability across seasons and aerosol types.

#### Cuidados específicos por variável

There is no broadly adopted health-based classroom standard for PM1. PM10 from compact optical sensors is often the least trustworthy output. Indoor humidity and aerosol chemistry can bias mass estimates. A sensor correction developed outdoors may not transfer indoors. A classroom node should not be treated as a regulatory monitor or gravimetric reference substitute.

### Arquitetura IoT

#### Arquitetura do sistema

A suitable architecture is edge sensor plus Wi-Fi or gateway connectivity, MQTT or HTTP transport, time-series storage, dashboarding, and alert rules. SchoolAIR demonstrates a scalable pattern using low-cost edge devices, MQTT messaging, and centralized storage and visualization. For single-building deployments, an ESP32 plus local broker or direct cloud ingestion is adequate.

#### Conectividade e protocolos

Wi-Fi plus MQTT is the most straightforward option for classrooms because it supports minute-scale updates and easy dashboard integration. HTTP is acceptable for simpler systems. LoRaWAN is possible when power and coverage dominate, but it is less convenient for high-frequency PM traces unless payload and duty-cycle limits are handled carefully.

#### Interoperabilidade e modelo de dados

Use timestamped records with device ID, room ID, PM variables, RH, temperature, quality flags, firmware version, and occupancy metadata. JSON or CSV transport is sufficient for small projects; InfluxDB or similar time-series schemas work well for dashboards. Vendor lock-in is reduced when raw concentrations, units, and QA flags are stored explicitly rather than only a proprietary score.

#### Cibersegurança, privacidade e ética

PM monitoring is lower privacy risk than cameras or microphones, but classroom deployments still need secure Wi-Fi credentials, authenticated MQTT or API access, basic device hardening, and a policy about who can see room-level data. Avoid linking PM data to identifiable student behavior beyond coarse schedules unless consent and governance are in place.

### Análise, decisão e automação

#### Métodos analíticos

Useful methods include time-series visualization, before and after intervention comparison, indoor to outdoor ratio analysis, occupancy-segmented summaries, spike detection, and mixed-effects or regression models using RH, occupancy, and ventilation state as covariates. Event labeling from cleaning, chalk use, and window opening greatly improves interpretation.

#### Índice ou modelo derivado

The most useful derived quantities are indoor to outdoor ratio, infiltration factor during low-occupancy periods, time above chosen PM thresholds, and intervention effect size before versus after filtration or ventilation changes. A single composite PM score is less informative than keeping PM1, PM2.5, PM10, and context variables visible together.

#### Regras de decisão e normas

WHO 2021 guideline values are the main health anchor: PM2.5 at 5 micrograms per cubic meter annual and 15 micrograms per cubic meter 24 hour, and PM10 at 15 annual and 45 24 hour. There is no widely used WHO PM1 guideline. Because classrooms are dynamic, alert logic should use persistence, occupancy context, and indoor to outdoor comparison rather than raw transient spikes alone.

#### Intervenção e automação

When indoor PM rises and outdoor PM is lower, increase outdoor air or window opening. When outdoor PM is high, prioritize portable HEPA filtration and keep windows more controlled. Reduce resuspension by changing cleaning methods and timing, managing chalk dust, and keeping sensor-informed maintenance logs. Automation can trigger traffic-light alerts or run purifiers when persistent thresholds are exceeded.

### Resultados e avaliação

#### Resultados ambientais

Continuous PM monitoring supports cleaner classroom operation, better timing of ventilation versus filtration, and faster identification of episodic indoor dust sources. Reported intervention outcomes in the literature generally show that filtration reduces PM more reliably than uncontrolled window opening when the outdoor environment is polluted.

#### Saúde e aprendizagem

PM exposure in school environments is associated with respiratory irritation, asthma aggravation, absenteeism, and poorer comfort. The causal chain to learning outcomes is less direct than for CO2, but lower particle exposure is still relevant for reducing symptoms and supporting healthier attendance and classroom conditions.

#### Integração objetiva e subjetiva

Teacher or occupant perception can help identify nuisance sources, but perception alone is not reliable for PM because fine particles are often invisible. Combining dashboards with short teacher annotations about cleaning, windows, or unusual events is more useful than relying on subjective air-quality ratings alone.

#### Viabilidade e aceitação

PM monitoring is one of the most feasible classroom IAQ variables for low-cost IoT because sensors are affordable, compact, and easy to integrate. Acceptance tends to be good when the dashboard explains what actions are appropriate and when the system does not create false precision or excessive alarm fatigue.

#### Validade e limitações

Main limitations are non-gravimetric measurement, aerosol-dependent bias, weaker PM10 fidelity, transferability of corrections, and limited long-term classroom-specific validation datasets. A low-cost PM network is valid for operational awareness and relative comparison, but not as a replacement for regulatory or research-grade reference monitoring.

#### Contribuições e lacunas

The strongest contribution of this topic is a practical classroom deployment path centered on PM2.5 and PM1 using optical sensors plus local QA/QC. Remaining gaps include long-duration classroom validation across seasons, better methods for PM10 in coarse-dust environments, clearer PM1 health-action thresholds for schools, and reproducible low-cost calibration workflows specific to educational buildings.


---

## 4. VOCs e poluentes gasosos (CO, NO2, O3 e formaldeido)

### Identificação e base bibliográfica

#### Referências utilizadas

- World Health Organization. WHO global air quality guidelines: particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide. Geneva, 2021.
- World Health Organization. WHO Guidelines for Indoor Air Quality: Selected Pollutants. Formaldehyde chapter. Copenhagen, 2010.
- U.S. EPA. Low-Cost Air Pollution Monitors and Indoor Air Quality. Web guidance, accessed 2026-08-11.
- U.S. EPA. A Guide to Siting and Installing Air Sensors. Web guidance, accessed 2026-08-11.
- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments, 2024.
- Roslan NS et al. A review of indoor air quality in classrooms: The effect of particulate matter, gaseous pollutants, and airborne pathogens. Environmental Pollution, 2026.
- Rodenas Garcia M et al. Review of low-cost sensors for indoor air quality: Features and applications. Applied Spectroscopy Reviews, 2022.
- Sensirion. Data Sheet SFA30. 2025.
- Sensirion. Compliance of Sensirion's VOC Sensors with Building Standards. 2023.
- Alphasense. CO-B4 product page and datasheet link. Accessed 2026-08-11.
- Alphasense. OX-B431 and O3 sensor product pages. Accessed 2026-08-11.
- Interlink Electronics. Nitrogen Dioxide Sensor 110-5XX datasheet. 2023.

#### Identificadores e endereços persistentes

- https://www.who.int/publications/i/item/9789240034228
- https://www.ncbi.nlm.nih.gov/books/NBK138711/
- https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants
- https://www.epa.gov/indoor-air-quality-iaq/low-cost-air-pollution-monitors-and-indoor-air-quality
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://doi.org/10.3233/AIS-220577
- https://pubmed.ncbi.nlm.nih.gov/41856267/
- https://www.tandfonline.com/doi/full/10.1080/05704928.2022.2085734
- https://sensirion.com/resource/datasheet/sfa30
- https://sensirion.com/resource/application_note/compliance_VOC_sensors_building_standards
- https://www.alphasense.com/products/view-by-target-gas/co-b4
- https://www.alphasense.com/products/view-by-target-gas/ozone-sensors-o3
- https://www.interlinkelectronics.com/downloads/subsidiary-docs/spec-sensors/Nitrogen-Dioxide-Sensor-110507_110508_110509_1.pdf

#### Tipo e composição da evidência

Topic-level evidence synthesis combining WHO and EPA guidance, low-cost sensor reviews, classroom IAQ reviews, and official gas-sensor datasheets.

#### Países e condições climáticas

Evidence is international and spans temperate, Mediterranean, arid, and urban traffic-influenced climates. Gas and VOC behavior in classrooms varies strongly with season, solar radiation, building materials, traffic emissions, gas appliances, cleaning products, and ventilation mode.

### Escopo e método

#### Objetivo e questão de pesquisa

To determine which low-cost sensor technologies are usable in classrooms for VOC-related monitoring and for the gas pollutants CO, NO2, O3, and formaldehyde, while distinguishing reliable direct sensing from broad proxy signals. The practical goal is to define a classroom-ready architecture and validation workflow that supports ventilation and source-control decisions without overstating what low-cost gas sensors can do.

#### Desenho dos estudos

Narrative evidence synthesis focused on 2019-2026 classroom and indoor-air sensor literature, plus official health thresholds and current manufacturer specifications. Because classroom deployments for NO2, O3, and formaldehyde remain sparser than for PM or CO2, the synthesis also draws on broader indoor-air sensor-performance studies.

#### Contexto educacional

Relevant to naturally ventilated and mechanically ventilated classrooms, labs, daycare rooms, and other educational spaces. Gas and VOC concerns are highest where traffic infiltration, nearby combustion, cleaning and disinfection products, new furniture or finishes, makerspace activities, and ozone-generating devices are present.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Target variables are carbon monoxide, nitrogen dioxide, ozone, formaldehyde, and VOC-related outputs. Useful companion variables are temperature, relative humidity, occupancy schedule, window and door state, nearby traffic or combustion activity, cleaning product use, and outdoor gas concentrations or regulatory-network data.

#### Condições externas e linha de base

Outdoor traffic, industrial plumes, photochemical ozone, and weather drive much of the indoor baseline for NO2 and O3 and can also influence formaldehyde chemistry indirectly. Indoor VOC and formaldehyde often have strong indoor sources from materials, cleaning agents, and activities. A classroom reading without outdoor context can be misleading, especially for oxidants and traffic-related gases.

#### Ocupação e atividade

Occupancy affects gas concentrations through door and window operation, use of cleaners and markers, classroom projects, and resuspension of sorbed compounds from surfaces. For VOC and formaldehyde, source events such as cleaning, renovation, adhesives, or new furniture can matter more than occupant count alone. For CO and NO2, nearby combustion sources dominate.

#### Operação da ventilação e filtração

Ventilation is the first control for indoor-emitted VOCs, formaldehyde, and CO when outdoor air is cleaner. For outdoor-origin NO2 and O3, opening windows can worsen exposure during traffic peaks or sunny high-ozone hours, so filtration and timing matter. Standard particle HEPA filters do not by themselves control gases well; gas-phase control usually needs source removal or sorbent media such as activated carbon or specialized chemistry.

#### Granularidade espacial

At least one classroom node plus an outdoor reference is desirable for oxidants and traffic-related gases. If there are suspected local sources, a second temporary node near the source and another in the breathing zone can help separate room-average conditions from localized peaks. Formaldehyde and VOC interpretation benefits from sampling near occupant breathing height but not directly beside emitting products.

### Sensores, metrologia e dados

#### Especificações dos sensores

CO, NO2, O3, and formaldehyde are best approached with selective electrochemical sensors rather than generic MOS IAQ chips when the goal is pollutant-specific concentration. Example devices include Alphasense CO-B4 for CO, Interlink 110-5xx for NO2, Alphasense OX-B431 paired with NO2-B43F for ozone plus NO2 separation, and Sensirion SFA30 for formaldehyde. Generic MOS sensors remain useful mainly for VOC trend or index output, not for pollutant-specific quantification.

#### Calibração e garantia da qualidade

Gas sensors need more discipline than PM sensors because cross-sensitivity, temperature, humidity, and baseline drift are strong. Recommended steps are burn-in or stabilization per manufacturer instructions, collocation with a trusted reference or at least a higher-quality portable instrument, routine baseline review, logging of temperature and RH for compensation, and periodic re-verification after deployment. Ozone and NO2 systems that rely on paired sensors must be verified as a pair, not as independent channels only.

#### Aquisição e qualidade dos dados

Collect raw values at 1 to 60 second intervals depending on sensor dynamics, and preserve 1 minute aggregates for dashboards. Store sensor temperature, RH, diagnostic flags, and timestamps. For electrochemical sensors, baseline wander and drift should be tracked explicitly. For MOS VOC outputs, keep raw or index values and avoid silently converting them into false absolute concentrations.

#### Sensor recomendado por variável

CO: use an electrochemical CO sensor such as Alphasense CO-B4 or a comparable low-level environmental CO sensor. NO2: use a filtered electrochemical NO2 sensor such as Interlink 110-507 family or Alphasense NO2-B43F class. O3: use an oxidant sensor only when paired with an NO2 channel for subtraction or source apportionment; OX-B431 plus NO2-B43F is the clearest low-cost pathway. Formaldehyde: prefer a dedicated formaldehyde sensor such as Sensirion SFA30 or another validated electrochemical HCHO module. VOCs: use MOS sensors such as Sensirion SGP4x or SEN54 and expose results as VOC index or equivalent TVOC only with explicit caveats.

#### Saídas úteis e unidades

CO is most useful in ppm or milligrams per cubic meter. NO2 and O3 are most useful in parts per billion or micrograms per cubic meter. Formaldehyde is useful in ppb and micrograms per cubic meter. VOC proxy outputs should usually be shown as VOC Index, not as absolute TVOC, unless the exact conversion method and its limitations are clearly documented.

#### Medição direta ou proxy

CO, NO2, O3, and formaldehyde can be measured with analyte-targeted electrochemical sensors, although they still require compensation and interference management. In contrast, low-cost VOC MOS sensors are mostly proxies: they generate a non-selective aggregate response to mixtures and should not be treated as species-specific measurements. OX sensors alone are also proxies for combined oxidants until paired with a selective NO2 channel.

#### Princípio de medição e seletividade

Electrochemical sensing offers the best low-cost selectivity for classroom CO, NO2, O3, and formaldehyde, but cross-sensitivity still exists and compensation is required. Interlink's NO2 sensor family includes an ozone-removal filter, and Alphasense states that OX-B431 responds to both O3 and NO2 and should be paired with NO2-B43F for better separation. MOX VOC sensing is inherently non-selective and best suited to trend detection rather than speciation.

#### Faixa útil e desempenho real

Indoor classroom concentrations are often low enough that sensor floor, drift, and cross-sensitivity matter as much as nominal range. SFA30 is designed for low-ppb formaldehyde around the WHO indoor guideline region, with a 0 to 1000 ppb standard range and 1 ppb resolution. Interlink's NO2 sensor specifies 0 to 5 ppm range with a 0.03 ppm lower detection limit and 0.01 ppm resolution, which is workable for elevated indoor or near-roadroom contexts but still requires careful interpretation at low classroom background levels.

#### Regime de operação

Use continuous monitoring with regular averaging. Electrochemical channels should not be aggressively duty-cycled unless validated, because baseline stabilization and compensation can be compromised. MOS VOC outputs often require continuous operation and learning time; for example, Sensirion notes that conversion of VOC index to equivalent TVOC is only defensible under defined laboratory conditions and tuned operation.

#### Interferências e confundidores

Temperature and RH affect nearly all low-cost gas channels. Cross-sensitivity is central: O3 and NO2 interfere with each other, VOC mixtures interfere with MOS sensors by design, and formaldehyde can be difficult at low indoor concentrations if the sensor is not purpose-built. Cleaning sprays, perfumes, alcohols, and open windows during traffic peaks can all distort interpretation if metadata are missing.

#### Protocolo acessível de validação

For a TCC-scale deployment, validate each gas channel in the most affordable credible way available. CO: compare with a certified portable CO meter during controlled low-level events and background periods. NO2 and O3: collocate with a nearby outdoor station if available and run indoor-outdoor paired checks during known traffic or photochemical periods. Formaldehyde: use a dedicated electrochemical module such as SFA30 and, if possible, compare during a short campaign against a badge or DNPH-based integrated sample analyzed externally. VOC index: compare event timing and directionality against controlled source activities rather than claiming absolute concentration accuracy.

#### Métricas de validação

Bias, MAE, RMSE, slope, intercept, correlation, detection limit behavior, baseline stability, response time, completeness, uptime, and drift over weeks are the core metrics. For paired O3 and NO2 systems, also evaluate separation logic and residual error after subtraction or compensation.

#### Instalação e encapsulamento

Install at breathing-zone height with unobstructed airflow and away from corners, HVAC jets, windows, doors, air cleaners, whiteboard solvent markers, or cleaning supply storage unless the goal is source characterization. EPA guidance for indoor sensors emphasizes free airflow, representative placement, and avoiding locations overly influenced by windows, doors, and ducts. Enclosures should not trap off-gassing materials around the sensor inlet.

#### Integração de hardware

Gas nodes usually require more analog care than PM or temperature nodes. Electrochemical sensors may need dedicated analog front ends, stable biasing, low-noise ADC paths, and temperature or humidity compensation channels. Digital modules such as SFA30 simplify integration through I2C or UART and can be handled well by ESP32-class MCUs. Store local status flags and use watchdog logic because silent channel failure is otherwise hard to detect.

#### Maturidade da evidência

Evidence maturity is uneven. CO and formaldehyde have plausible low-cost selective paths. NO2 and especially O3 become harder because of low classroom concentrations, cross-sensitivity, and the need for outdoor context. VOC monitoring is mature only as an index or trend concept, not as low-cost classroom-grade chemical speciation.

#### Cuidados específicos por variável

Never equate eCO2-style proxy thinking with gas-specific measurement. A VOC index is not the same as measured TVOC composition, and TVOC itself does not identify toxicity of the mixture. OX sensors alone do not give ozone-specific values. NOx or VOC index outputs from integrated IAQ chips are not substitutes for classroom NO2 or formaldehyde concentration. CO safety alarms remain mandatory for life-safety uses; low-cost IAQ monitors are not replacements for certified emergency alarms.

### Arquitetura IoT

#### Arquitetura do sistema

A sensible architecture is modular: selective gas channels only where the use case justifies them, plus context channels for RH, temperature, and possibly PM and CO2. Edge nodes can publish via MQTT or HTTP to a time-series database, with dashboards showing raw channels, QA flags, and action suggestions. For VOC-heavy use cases, event annotation and source logging are as important as the numeric trace.

#### Conectividade e protocolos

Wi-Fi plus MQTT is the default practical choice for classrooms, with HTTPS or HTTP acceptable for simpler implementations. Keep payloads compact but include raw channel, units, diagnostics, and calibration version. If analog electrochemical boards are used, sync timestamps carefully because cross-channel compensation depends on aligned data.

#### Interoperabilidade e modelo de dados

Store explicit pollutant names, units, averaging times, diagnostic flags, compensation state, and whether a value is direct, compensated, or proxy-derived. Avoid collapsing all gases into a single IAQ score. This topic especially benefits from transparent metadata because a VOC index, an OX sensor value, and a selective NO2 value are not interchangeable.

#### Cibersegurança, privacidade e ética

The sensing itself is low privacy risk, but room-level pollutant data can still trigger reputational or compliance concerns for staff and institutions. Access control, audit trails, and clear governance for who can view, export, or interpret classroom data are recommended. Avoid over-claiming health diagnostics from uncertain sensors.

### Análise, decisão e automação

#### Métodos analíticos

Use event-based analysis, occupancy-segmented summaries, diurnal profiles, indoor-outdoor comparison, and intervention before-and-after tests. For oxidants and traffic gases, align readings with outdoor data and window state. For VOC and formaldehyde, annotate material changes, cleaning events, and renovation periods. Compensation models should be simple and reproducible unless high-quality calibration data justify more complexity.

#### Índice ou modelo derivado

Useful derived quantities include time above WHO thresholds, indoor-outdoor difference for NO2 and O3, and source-event fingerprints for VOC index and formaldehyde. A classroom risk summary should keep the pollutant channels separate rather than combining them into one score, because sources and interventions differ by gas family.

#### Regras de decisão e normas

WHO values provide the clearest anchors. CO: 4 mg per cubic meter for 24 hours. NO2: 10 micrograms per cubic meter annual and 25 micrograms per cubic meter 24 hour. O3: 100 micrograms per cubic meter 8 hour and 60 micrograms per cubic meter peak season. Formaldehyde: 0.1 mg per cubic meter over 30 minutes. EPA also notes that low-cost monitor alert thresholds are not standardized indoors, so classroom rules should use sustained exceedance plus source context rather than a single instantaneous reading.

#### Intervenção e automação

For indoor-emitted VOCs and formaldehyde, first remove or reduce sources, then ventilate, then consider sorbent-based air cleaning if the source cannot be removed. For NO2 and O3 from outdoors, time ventilation to cleaner periods and consider filtered mechanical ventilation or sorbent media. For CO, treat any unusual sustained rise as a fault or combustion-source investigation trigger and keep certified life-safety alarms installed.

### Resultados e avaliação

#### Resultados ambientais

Gas and VOC monitoring supports targeted source control, cleaner procurement, ventilation scheduling, and avoidance of ozone-generating devices. When interpreted carefully, it can reveal whether a classroom problem is dominated by indoor materials and cleaning chemistry or by outdoor traffic and photochemical pollution.

#### Saúde e aprendizagem

The health rationale is strong: CO causes acute toxicity, NO2 and O3 aggravate respiratory conditions, and formaldehyde causes sensory irritation and is linked to long-term cancer risk at sufficient exposure. Classroom-specific learning outcomes are less directly measured than health and comfort outcomes, but reducing these pollutants supports healthier attendance and fewer irritation complaints.

#### Integração objetiva e subjetiva

Occupant complaints are especially relevant for VOCs and formaldehyde because odor or irritation can precede clear attribution. Still, subjective reports should be treated as event markers, not as measurement substitutes. Combining diaries with sensor traces and source notes is the most practical integration method.

#### Validade e limitações

The largest limitation is that low-cost gas sensing does not offer equal maturity across pollutants. VOC outputs are often proxies, oxidant channels are cross-sensitive, and low indoor concentrations may approach sensor floor or drift behavior. Therefore, these sensors are valid for operational awareness and hypothesis generation, but only some channels are suitable for pollutant-specific action thresholds after local validation.

#### Contribuições e lacunas

The main contribution is a realistic separation between what classrooms can monitor selectively at low cost and what should remain a proxy or exploratory variable. Priority gaps are long-term classroom validations for NO2 and O3, reproducible low-cost formaldehyde field protocols, clearer guidance on converting VOC-index outputs into operational actions, and more classroom deployments that publish raw calibration and drift data.


---

## 5. Ruido e ambiente acustico

### Identificação e base bibliográfica

#### Referências utilizadas

Synthesis based on Department for Education. Acoustic design of schools: performance standards (BB93), 2015; Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129; Picaut J, Can A, Fortin N, Ardouin J, Lagrange M. Low-Cost Sensors for Urban Noise Monitoring Networks: A Literature Review. Sensors. 2020;20(8):2256; Mealings K et al. The Effects of Classroom Acoustic Conditions on Teachers' Health and Well-Being: A Scoping Review. J Speech Lang Hear Res. 2024;67(1):346-367; Fretes G, Palau R. The Impact of Noise on Learning in Children and Adolescents: A Meta-Analysis. Applied Sciences. 2025;15(8):4128; Mealings K et al. The effects of classroom acoustic quality on student perception and wellbeing: a systematic review across educational levels. Frontiers in Psychology. 2025.

#### Tipo e composição da evidência

Mixed evidence synthesis: technical guidance, systematic and scoping reviews, meta-analysis, and classroom-oriented IoT sensor deployment studies.

### Escopo e método

#### Objetivo e questão de pesquisa

To determine how IoT monitoring can characterize classroom acoustic comfort, speech-supportive conditions, and harmful noise exposure, and to identify technically appropriate low-cost sensing, calibration, positioning, thresholds, and intervention logic for real classrooms. The practical question is how to measure meaningful acoustic indicators, not just raw sound presence, so that teachers and facility managers can reduce distraction, vocal strain, and noncompliance with classroom acoustic guidance.

#### Desenho dos estudos

Predominantly observational and review-based evidence. Standards define design targets; school acoustics reviews summarize effects on listening, learning, and well-being; low-cost sensing papers validate MEMS-based monitoring chains; classroom IoT deployments show feasibility for dense, continuous measurement.

#### Contexto educacional

Applies mainly to primary and secondary school classrooms, with partial transfer to preschools, lecture rooms, and higher-education teaching spaces. Relevant room conditions include naturally ventilated and mechanically ventilated classrooms, whiteboard- and speech-centered instruction, group work, exams, and inclusive settings with students who have hearing, language, or attention vulnerabilities.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Core variables are A-weighted sound pressure level metrics such as LAeq,1s, LAeq,1min, LAeq,30min, LAmax, and percentile levels such as LA10 and LA90, all in dBA. For classroom-acoustics compliance and interpretation, reverberation time (RT60, often estimated from T20 or T30) and, where possible, speech intelligibility metrics such as STI should be added. BB93 gives an upper limit of 35 dB LAeq,30min for new-build primary and secondary classrooms, 40 dB LAeq,30min for refurbishment, 30 dB for spaces for special hearing and communication needs, and states that spaces with lower indoor ambient noise limits should not regularly exceed 60 dB LA1,30min.

#### Condições externas e linha de base

Outdoor traffic, playgrounds, corridors, adjacent classrooms, rain on lightweight roofs, and HVAC plant are major baseline contributors. A useful baseline is to log unoccupied indoor levels together with outdoor or corridor reference levels and note weather, open-window condition, and unusual events. Indoor-to-outdoor comparisons are especially important when natural ventilation is used.

#### Ocupação e atividade

Noise varies sharply by occupancy density, age group, teaching mode, vocal activity, and timetable. Lecture periods, individual work, small-group work, transitions, recess spillover, and cleaning each produce different signatures. Occupancy and lesson state should therefore be logged manually or inferred from schedule metadata so that acoustic exceedances are not interpreted without context.

#### Operação da ventilação e filtração

Window and door opening often improves thermal comfort and air quality but increases intrusion from road, playground, and corridor noise. BB93 allows a +5 dB tolerance for natural ventilation and total noise under hybrid systems during normal operation in some room categories, reflecting this trade-off. Mechanical systems should still meet the table value for indoor ambient noise under normal teaching use. Filtration devices and portable cleaners are not primary acoustic devices, but their fan noise can become a confounder and should be separately documented.

#### Granularidade espacial

One sensor can show temporal patterns but is weak for spatial representativeness. A practical minimum is one central sensor at seated ear height plus one secondary point near the teacher or rear of the room to capture gradients from windows, corridors, or HVAC. For diagnostics or validation, add short-term reference positions near the facade and the back of the room. Avoid positioning directly next to loudspeakers, projectors, vents, doors, or reflective corners.

### Sensores, metrologia e dados

#### Especificações dos sensores

Recommended low-cost continuous monitoring uses a digital MEMS microphone with stable response and I2S output, such as TDK InvenSense ICS-43434 or Knowles SPH0645LM4H-B, integrated with an ESP32-class MCU. Both families are low-power bottom-port digital MEMS microphones with about 65 dBA signal-to-noise ratio and acoustic overload points near 120 dB SPL, suitable for continuous environmental logging after calibration. However, the microphone alone is not a legal sound level meter: the full chain, weighting filters, enclosure, and calibration determine whether the output is trustworthy. A Class 1 or at least Class 2 sound level meter is still needed as the validation reference.

#### Calibração e garantia da qualidade

Perform co-location against a calibrated Class 1 or Class 2 sound level meter in the final enclosure and final mounting orientation. Verify A-weighting and Leq calculations offline with known test files, and if possible use an acoustic calibrator at 94 dB and 1 kHz before and after field deployment. Record firmware version, clock source, gain settings, weighting implementation, and microphone replacement date. Re-check drift after relocation, enclosure changes, or any suspected clipping event.

#### Aquisição e qualidade dos dados

If bandwidth and privacy allow, compute 125 ms to 1 s frames on the edge, then aggregate to LAeq,1min and occupied-period summaries before upload. Use reliable timestamps via NTP, local buffering on flash or SD, and explicit missing-data flags. Report data completeness, uptime, and sensor saturation or clipping counts. Long raw-audio retention is not recommended; derived metrics and short diagnostic snippets should be enough in most cases.

#### Ciclo de vida dos sensores

The microphone itself is low maintenance, but whole-node reliability depends on power, Wi-Fi, storage endurance, and enclosure cleanliness. Expected issues are clock drift, stuck network sessions, dust at the acoustic port, and accidental obstruction. Continuous self-checks should include reboot counters, storage usage, last-upload timestamp, and impossible-value detection.

#### Sensor recomendado por variável

For continuous classroom noise level, use a digital MEMS microphone such as ICS-43434 as the primary low-cost sensor. For compliance-grade validation and periodic audit, use a reference Class 2 or Class 1 sound level meter. For reverberation time and STI, use dedicated acoustic test procedures with a reference microphone and excitation source rather than a passive always-on IoT node. For source attribution, pair the microphone with spectral features or on-edge classification, but only if privacy constraints are satisfied.

#### Saídas úteis e unidades

Most useful outputs are LAeq,1s, LAeq,1min, occupied-period LAeq,30min, LAmax, LA10, LA90, and exceedance duration above chosen thresholds, all in dBA. Secondary outputs are RT60 in seconds, octave-band levels in dB, and STI as a dimensionless score when special tests are run. For dashboards, use simple indicators such as minutes above 55 dBA, 60 dBA, and 65 dBA during instruction, plus unoccupied background noise and any measured reverberation time.

#### Medição direta ou proxy

The microphone directly measures acoustic pressure variations. dBA, Leq, percentile metrics, and octave-band indicators are derived but still physically grounded when the chain is calibrated. Reverberation time and STI are not continuously measured by a standard low-cost classroom node; they are inferred from dedicated tests. Cheap analog 'sound sensor' modules that only output thresholded amplitude are poor proxies and should not be treated as valid acoustic measurements.

#### Princípio de medição e seletividade

MEMS microphones use a capacitive microelectromechanical diaphragm and on-board signal conditioning with digital output. They are sensitive to the total sound field and are not source-selective by themselves. Selectivity can only be added algorithmically through weighting, band analysis, or source classification models, all of which require careful validation.

#### Faixa útil e desempenho real

For classroom work, the practical measurement range of interest is roughly 30 to 90 dBA, with common occupied conditions often between 45 and 75 dBA and peaks above that during disturbances. The low-cost sensor literature shows MEMS microphones can be useful for environmental noise networks after calibration, but errors increase near the self-noise floor, at low frequencies, and if the enclosure, port geometry, or DSP chain is poor. They are best treated as operational monitoring instruments rather than legal metrology instruments.

#### Regime de operação

Continuous operation is preferred. A robust regime is 16 to 48 kHz internal sampling, 1 s edge computation for SPL metrics, 1 min aggregation for upload, and occupied-period reporting by lesson block. Warm-up is short for MEMS microphones, but the full node should still ignore the first minute after reboot and any interval affected by time resynchronization or processing overload.

#### Interferências e confundidores

Key confounders are airflow across the port, vibration transmitted by furniture or walls, enclosure resonance, poor acoustic port design, clipping, near-field speech too close to the sensor, reflective surfaces, ceiling projectors, and noise from air cleaners or HVAC fans. Privacy constraints can also force the use of derived metrics instead of raw audio, which limits post hoc diagnostic analysis. Acoustic conditions are strongly confounded by classroom management style and lesson type.

#### Protocolo acessível de validação

A practical low-cost protocol is 24 to 72 h co-location with a calibrated Class 2 meter in the same room during occupied and unoccupied periods, followed by a second short co-location after installation changes. Capture at least one quiet period, one normal lecture period, one group-work period, and one open-window period. Compare 1 s and 1 min A-weighted Leq outputs, document bias and drift, and keep a simple event log for clapping, projector use, corridor traffic, and window opening.

#### Métricas de validação

Report mean bias, MAE, RMSE, slope, intercept, R or R2 versus the reference meter, plus agreement for exceedance minutes above selected thresholds. Also report completeness, uptime, clipping rate, reboot rate, and drift between pre- and post-deployment checks. For event-based or source-classification extensions, include precision, recall, and latency.

#### Instalação e encapsulamento

Mount at about 1.2 to 1.5 m above floor level, away from direct airflow, at least about 1 m from large reflective surfaces when possible, and not directly above a teacher desk or under a loudspeaker. The acoustic port must be open to the room and protected with a suitable mesh, not buried inside a sealed plastic box. Vibration isolation and a stable mounting bracket matter more than cosmetic integration.

#### Integração de hardware

An ESP32 or similar MCU with I2S is a practical choice. The microphone usually runs at low current on 1.8 to 3.3 V, while Wi-Fi bursts from the MCU dominate power demand. Use local buffering, watchdog reboot, NTP sync, and a known digital signal-processing chain for A-weighting and Leq calculation. USB power or a stable wall supply is preferable to battery for always-on classroom deployments.

#### Cuidados específicos por variável

Do not treat simple analog sound detector boards as decibel meters. dBA level alone does not reveal source identity, speech intelligibility, or reverberation. Continuous raw-audio recording raises privacy and LGPD concerns. Reverberation and STI require dedicated tests, not passive proxy inference from a single running microphone. Naturally ventilated classrooms may show acceptable air quality but poor acoustics at the same time.

### Arquitetura IoT

#### Arquitetura do sistema

A suitable architecture is edge sensing plus cloud dashboarding: microphone node computes SPL metrics locally, stores a short rolling buffer only for diagnostics if policy allows, publishes minute summaries to a broker or HTTP endpoint, and writes to a time-series database. Dashboards should show room-level trends, threshold exceedances, lesson-period summaries, and maintenance status. Local edge computation is preferred over streaming raw audio.

#### Conectividade e protocolos

Wi-Fi with MQTT or HTTPS is the simplest for schools with existing infrastructure. BLE is useful for commissioning and provisioning. LoRaWAN is possible when bandwidth is limited, but it is better suited to aggregated metrics than high-rate acoustic payloads. Timestamped JSON or line protocol payloads are sufficient for minute-level indicators.

#### Cibersegurança, privacidade e ética

Acoustic monitoring in schools must minimize personal data. The safest default is not to store intelligible audio at all; compute SPL and spectral features on the edge and upload only aggregates. Access control, encrypted transport, device authentication, retention limits, and a clear consent and governance policy are necessary. Signage and explanation to teachers and school management are important for acceptance and ethics compliance.

### Análise, decisão e automação

#### Métodos analíticos

Recommended methods are descriptive statistics by lesson block, exceedance-duration analysis, percentile distributions, occupied versus unoccupied comparisons, pre/post intervention comparisons, and if possible mixed-effects models accounting for classroom and day effects. Spectral summaries can help differentiate speech-dominated from equipment-dominated noise. Source classification or anomaly detection should be treated as optional extensions rather than baseline requirements.

#### Intervenção e automação

Likely interventions are door management, quieter ventilation settings, maintenance of noisy equipment, acoustic panels or ceiling treatment, soft visual feedback to teachers, behavior-oriented classroom cues, and scheduling changes for noisy adjacent activities. Full automation should stay modest: notify, recommend, and document rather than force classroom actions. In special cases, feedback can trigger a quieter HVAC mode or close an automated door, but human override remains important.

### Resultados e avaliação

#### Resultados ambientais

Expected outcomes are lower background noise, fewer peak disturbances, better speech intelligibility, and clearer differentiation between facade noise, internal activity noise, and equipment noise. Monitoring also exposes trade-offs between ventilation, fan operation, and acoustic comfort. Acoustic treatment and behavioral feedback can reduce exceedance time even when absolute building design limits are hard to achieve in existing rooms.

#### Saúde e aprendizagem

The evidence synthesis consistently links poorer classroom acoustic conditions with worse listening conditions and negative effects on learning-related outcomes, especially verbal tasks and well-being. The recent teacher-focused scoping review found that most results associated higher noise levels with worse health and well-being, and 39 percent of results associated longer reverberation times with negative effects. Students with hearing loss, second-language learners, and some neurodivergent groups appear more vulnerable.

#### Integração objetiva e subjetiva

The strongest practice is to combine sensor logs with short teacher and student questionnaires about disturbance, effort, voice fatigue, and board/listening difficulty. Match subjective reports to lesson-specific LAeq and peak-event windows. This allows separation of 'acceptable but annoying' conditions from true noncompliance or speech-intelligibility problems.

#### Resultados quantitativos

BB93 sets 35 dB LAeq,30min for new-build mainstream classrooms, 40 dB for refurbishment, and 30 dB for spaces for special hearing and communication needs. For many lower-noise-limit spaces, indoor ambient noise should not regularly exceed 60 dB LA1,30min. BB93 also allows a +5 dB tolerance in normal operation for some naturally ventilated teaching spaces. ANSI/ASA S12.60 guidance commonly cited for mainstream classrooms is 35 dBA background noise with reverberation time of 0.6 s for rooms under 10,000 cubic feet and 0.7 s for 10,000 to 20,000 cubic feet. In the 2024 teacher scoping review, 61 percent of reported results linked higher noise levels to worse health and well-being outcomes, and 39 percent linked longer reverberation time to negative effects.

#### Viabilidade e aceitação

Feasibility is good for low-cost continuous monitoring if raw-audio retention is avoided and calibration is taken seriously. Power and Wi-Fi are usually easier constraints than trust and interpretation. Schools are more likely to accept systems framed as environmental quality tools than as surveillance tools. Scaling to many rooms is practical when analytics are edge-based and the dashboard is simple.

#### Validade e limitações

Transferability is limited by differences in age group, pedagogy, room volume, façade noise, and ventilation strategy. Many studies report design targets or review-level conclusions rather than long continuous datasets from low-cost nodes. Low-cost microphones can track trends well but remain weaker than certified sound level meters for legal or contractual compliance. Single-point measurement is a major limitation in acoustically heterogeneous rooms.

#### Contribuições e lacunas

For classroom IoT, the main contribution is a practical monitoring pathway that distinguishes useful acoustic metrics from misleading 'sound sensor' proxies. Research gaps include classroom-specific validation of low-cost acoustic nodes, long-term drift studies, fusion of noise with occupancy and ventilation data, privacy-preserving source attribution, and evidence from tropical or naturally ventilated schools in the Global South. Better links between minute-level acoustic metrics and concrete educational outcomes are still needed.


---

## 6. Iluminacao e conforto visual

### Identificação e base bibliográfica

#### Referências utilizadas

Synthesis based on Price LLA, Dahlmann-Noor A, Khazova M. Daylight and Electric Lighting in Primary and Secondary School Classrooms in the UK: An Observational Study. Int J Environ Res Public Health. 2024;21(7):942; Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129; Suarez-Garcia A, Lorenzo-Suarez I, Alonso-Gonzalez J et al. A Low-Cost Luxometer Benchmark for Solar Illuminance Measurement System Based on the Internet of Things. Sensors. 2022;22(19):7107; Department for Education. Generic Design Brief, Daylight and lighting sections, 2014; Society of Light and Lighting. Lighting Guide 5: Lighting for Education, 2011; selected classroom visual-comfort and dynamic-lighting studies from higher and school education.

#### Identificadores e endereços persistentes

https://doi.org/10.3390/ijerph21070942 ; https://pubmed.ncbi.nlm.nih.gov/39063519/ ; https://doi.org/10.3390/s24165129 ; https://doi.org/10.3390/s22197107 ; https://assets.publishing.service.gov.uk/media/5a7c215d40f0b645ba3c6df5/ITT_Volume_5_Part_B_Generic_Design_Brief_V6_Feb_2014.pdf ; https://s3.amazonaws.com/fonteva-customer-media/00D8E0000008w4FUAQ/LG05%202011%20b.pdf ; https://pubmed.ncbi.nlm.nih.gov/27409963/ [dynamic-lighting study]

#### Tipo e composição da evidência

Mixed evidence synthesis: observational classroom study, IoT deployment study, low-cost sensor benchmark, technical design guidance, and supporting human-factors research on visual comfort and performance.

### Escopo e método

#### Objetivo e questão de pesquisa

To determine how IoT monitoring can capture meaningful classroom lighting conditions for visual comfort, task visibility, glare control, daylight use, and potentially health-relevant light exposure, and to identify low-cost sensors, placement, calibration, and decision rules suitable for real classrooms. The practical question is how to monitor light in a way that supports both learning conditions and energy-aware control without reducing visual comfort to a single lux number.

#### Desenho dos estudos

Predominantly observational and review-based evidence combined with technical design guidance and sensor benchmarking. The strongest operational evidence comes from classroom field observation, climate-based daylight modelling guidance, and low-cost lux-sensor validation studies.

#### Contexto educacional

Applies to primary and secondary school classrooms first, with partial transfer to university classrooms, lecture rooms, computer rooms, and specialist art spaces. The relevant visual tasks are reading, writing, board viewing, screen use, projector use, note taking, and face-to-face communication between teacher and students.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Core variables are horizontal illuminance on the work plane in lux, vertical illuminance at eye level in lux, daylight availability, useful daylight range, glare risk, and lighting scene state. For design and interpretation, include daylight autonomy, useful daylight illuminance or useful daylight index, whiteboard visibility, uniformity, UGR, CCT, CRI, and flicker where possible. Lux alone is necessary but not sufficient for visual comfort.

#### Condições externas e linha de base

Outdoor sky condition, solar altitude, facade orientation, season, window-to-wall ratio, shading state, and nearby obstructions strongly affect indoor lighting. A useful baseline includes weather or sky classification, time of day, blind position, and whether electric lighting is off, on, or dimmed. Indoor-to-outdoor daylight relationships can be approximated through facade orientation and daylight logger comparison, but direct solar penetration and reflections should also be noted.

#### Ocupação e atividade

Lighting needs differ by task. Reading and writing, board viewing, computer use, projector-based instruction, exams, and collaborative work all require different balances of ambient light, contrast, and glare control. Occupancy schedule, seat location, and teacher use of blinds or dimming strongly change the measured environment and should be recorded as contextual metadata.

#### Operação da ventilação e filtração

Lighting is indirectly tied to ventilation because blind position, window opening, solar gains, and occupant comfort interact. Daylighting strategies should not block natural ventilation, and solar-control actions that reduce glare can also alter thermal conditions and electric-light use. Filtration is not a main lighting variable, but fan-coil or air-cleaner layouts can constrain fixture placement and occupancy comfort.

#### Granularidade espacial

One light sensor is not spatially representative in a daylit classroom. A practical minimum is a desk-plane sensor near the room center plus a vertical eye-level sensor, with periodic grid measurements at front, middle, and rear desks and at the board. Window-side and back-of-room gradients are often large, so short-term validation across multiple points is essential.

### Sensores, metrologia e dados

#### Especificações dos sensores

For low-cost continuous lux monitoring, a strong primary choice is the Texas Instruments OPT3001 because it is a single-chip lux meter with human-eye-like spectral response, strong infrared rejection, automatic ranging, and a specified measurement span from about 0.01 lux to 83 kilolux. A strong alternative is the Vishay VEML7700, a high-accuracy I2C ambient light sensor widely used on breakouts with a practical range up to about 120 kilolux and fine low-light resolution. For classroom visual-comfort monitoring, these photopic lux sensors are suitable for desk and eye-level illuminance, but they do not directly measure glare, luminance maps, or full spectral content.

#### Calibração e garantia da qualidade

Validate the low-cost sensor against a calibrated lux meter in the same orientation and mounting geometry used in the room. Check dark offset, repeatability, saturation under bright daylight, and consistency across front, middle, and rear measurement points. Record gain, integration time, cosine-correction limitations, firmware version, and enclosure orientation. Revalidate after enclosure changes, relocation, or any persistent drift between neighboring nodes.

#### Aquisição e qualidade dos dados

A 10 to 60 s sample interval is usually enough for classroom illuminance trends, with 1 min aggregation for dashboards. If flicker or very fast scene changes matter, use a different sensor chain because standard lux sensors miss high-frequency modulation details. Data quality reporting should include completeness, uptime, saturation count, blind-state annotations, and a flag for implausible night or daytime plateaus.

#### Ciclo de vida dos sensores

Light sensors are low-power and generally stable, but performance degrades if the optical window becomes dusty, scratched, or shaded by the enclosure. Routine maintenance is simple: inspect orientation, clean the optical path, confirm time sync, and compare periodically with a handheld reference meter. Battery-powered operation is possible, though classroom nodes are simpler when mains powered.

#### Saídas úteis e unidades

Useful outputs are desk-plane illuminance in lux, vertical eye-level illuminance in lux, occupied-hour percentage above 300 lux, time within useful daylight range, lighting scene state, and if available UGR, CCT, CRI, or flicker indicators. For design-level interpretation, include daylight autonomy as a percent, useful daylight range such as 100 to 3000 lux as a percent of occupied time, and board visibility notes. Dashboards should distinguish daylight-driven from electric-light-driven conditions.

#### Medição direta ou proxy

Photopic illuminance in lux is a direct physical measurement when the sensor is calibrated and correctly oriented. Visual comfort, circadian effectiveness, glare, and board legibility are not directly measured by a simple lux sensor; they are derived or proxied. CCT or CRI cannot be trusted from a basic lux-only sensor unless a dedicated spectral measurement chain is added.

#### Princípio de medição e seletividade

The recommended sensors use a photodiode with optical filtering and digital conversion to approximate the human photopic response while suppressing infrared. They are selective for visible-light intensity but not for full spectral composition. Their response is affected by incidence angle, reflections, and sensor orientation, so cosine-response limitations matter in daylit classrooms.

#### Faixa útil e desempenho real

For teaching spaces, a useful practical target is around 300 lux as the typical classroom working-plane level, with 500 lux available for adult use or more demanding visual tasks. The UK design guidance also treats 300 lux as the typical target illumination in teaching spaces for daylight autonomy calculations and recommends allowing a scene that increases classroom lighting to 500 lux if required. The low-cost benchmark literature shows sensors such as OPT3001, VEML7700, and TSL2591 can be operationally useful, but bias changes with solar height, cloudiness, and calibration model. Near windows under direct sun, saturation and cosine-related error remain important limitations.

#### Regime de operação

Continuous logging over the school day is preferred, with 10 to 60 s sensing and 1 min aggregation. Scene-aware operation is useful: normal daylight-assisted mode, board-viewing mode, projector mode, and full-light mode. For trend analysis, store occupied versus unoccupied periods separately and annotate blind changes and projector use.

#### Interferências e confundidores

The main confounders are orientation error, self-shadowing, desk reflections, direct solar patches, spectral mismatch between daylight and LEDs, blind movement, luminaire flicker not captured by the sensor, whiteboard reflections, and obstruction by books or hands. A single sensor can overestimate or underestimate conditions depending on whether it sits in sun, shade, or a fixture hotspot. Teacher preference and task type also confound comfort judgments.

#### Protocolo acessível de validação

A practical low-cost protocol is to co-locate the node with a calibrated lux meter for several school days and repeat measurements on a front-middle-rear desk grid and at the whiteboard area. Include at least one overcast day, one sunny day, and one projector session. Compare 1 min averages, note blind and electric-light state, and if possible photograph board reflections and shading conditions for interpretation.

#### Instalação e encapsulamento

Mount one sensor horizontally on or just above desk height, about 0.75 m, with a clear upward field and no self-shadowing. If visual-exposure questions matter, add a second sensor vertically at seated eye level, about 1.1 to 1.2 m. Do not recess the optical window deeply into the enclosure, and avoid locations directly under a luminaire diffuser or in a permanent sun patch. Orientation labels should be explicit on the enclosure.

#### Integração de hardware

OPT3001 and VEML7700 integrate easily through I2C with 3.3 V microcontrollers such as ESP32 boards. Current draw is low compared with the MCU and Wi-Fi radio, so always-on operation is practical. A good node includes local buffering, NTP synchronization, remote configuration of gain or integration settings, and a dashboard path for scene-state metadata.

#### Cuidados específicos por variável

Lux alone does not equal visual comfort. A single horizontal sensor misses board reflections, eye-level exposure, glare, and spectral quality. Direct sunlight can produce apparently high lux values while reducing usability because of glare and contrast loss. CCT and CRI should not be inferred from a basic lux sensor. Projector and whiteboard scenes need different control logic than desk reading scenes.

### Arquitetura IoT

#### Arquitetura do sistema

A good architecture uses edge sensing with cloud or local dashboarding: room nodes measure desk and optionally eye-level illuminance, attach scene and occupancy tags, then publish aggregated records to a broker or HTTP endpoint and a time-series database. Dashboards should show occupied-hour compliance, daylight versus electric-light contribution, blind-related events, and maintenance status. If lighting control is added, keep teachers in control of scene overrides.

#### Conectividade e protocolos

Wi-Fi with MQTT or HTTPS is usually sufficient for classroom lighting nodes. BLE is useful for provisioning. Where bandwidth is constrained, LoRaWAN can send minute summaries, but it is less convenient for scene-rich building integration. Payloads should include timestamp, unit, sensor orientation, room ID, and scene state in a simple JSON or line-protocol format.

#### Cibersegurança, privacidade e ética

Lighting sensors raise lower privacy risk than microphones or cameras, but governance still matters. Protect network traffic, authenticate devices, document retention periods, and avoid combining light data with personally identifiable student tracking unless there is clear consent and institutional approval. If occupancy is later fused with lighting, the privacy burden rises.

### Análise, decisão e automação

#### Métodos analíticos

Recommended methods are occupied-hour compliance analysis, desk-grid mapping, front-to-back gradient analysis, scene-state comparison, time-of-day profiles, pre/post control comparisons, and climate-based daylight indicators such as daylight autonomy and useful daylight range. If outcomes research is attempted, combine illuminance logs with survey responses on glare, board visibility, eye strain, and perceived comfort.

#### Intervenção e automação

Likely interventions are blind-management guidance, daylight-harvesting dimming, separate board and desk scenes, fixture relamping or LED retrofits, glare-control films or shades, and teacher-selectable lighting scenes for projector, reading, exam, and discussion modes. Automation should support, not fight, the teacher: auto-dimming and daylight harvesting are useful, but manual override must remain easy and predictable.

### Resultados e avaliação

#### Resultados ambientais

Expected outcomes are better desk and eye-level light adequacy, lower glare complaints, better use of daylight, and lower unnecessary electric-light energy use. Monitoring also reveals when classrooms have adequate average lux but poor spatial distribution or excessive glare. Recent classroom evidence indicates that many rooms still lack recommended daylight exposure or rely on lighting conditions that are not clearly optimized for health-related visual exposure.

#### Saúde e aprendizagem

Better classroom lighting supports visual comfort, reduces eye strain, and can improve attention and task performance when glare is controlled. The recent UK classroom observational work highlights concern that children may receive insufficient daylight exposure during the school day, which is relevant to visual health discussions such as myopia risk. Dynamic-lighting studies suggest some benefits for alertness and concentration, but effects are task- and protocol-dependent rather than universal.

#### Integração objetiva e subjetiva

The best practice is to pair sensor logs with short occupant feedback on glare, board readability, screen visibility, eye strain, and preference for daylight versus blinds-down conditions. Matching subjective reports to logged lux and scene state is necessary because acceptable desk illuminance can still coexist with poor visual comfort.

#### Resultados quantitativos

The UK Generic Design Brief uses a typical target illumination of 300 lux in teaching spaces for daylight-autonomy assessment, and requires more than 50 percent daylight autonomy over more than 50 percent of the working plane in 80 percent of teaching spaces. It also requires a useful daylight band of 100 to 3000 lux to be achieved for an average of 80 percent of the time over the working plane in 80 percent of teaching spaces. Lighting Guide 5 recommends a primary classroom lighting scene of about 300 lux for child and young adult use and a full-light scene of about 500 lux if needed. In the same guide, colour rendering above Ra 80 and glare control around UGR 19 are repeatedly treated as good design references for educational spaces.

#### Viabilidade e aceitação

Feasibility is high because low-cost light sensors are inexpensive, low-power, and easy to integrate. Acceptance is usually good if the dashboard is simple and the purpose is framed as comfort and energy improvement rather than surveillance. The main practical challenge is not hardware cost but correct placement, calibration, and interpretation in spaces with strong daylight gradients.

#### Validade e limitações

Validity is limited by strong spatial and temporal variability, especially near windows and whiteboards. Single-point sensors miss glare, contrast, and spectral quality. Much of the standards literature addresses design targets rather than long-term real-school operation, and low-cost benchmarks are often performed outdoors or in nonclassroom conditions before being transferred indoors. Cross-study health thresholds remain heterogeneous.

#### Contribuições e lacunas

For classroom IoT, the main contribution is a practical methodology that separates direct lux measurement from higher-level visual-comfort constructs and recommends multi-point, scene-aware monitoring instead of single-sensor oversimplification. Research gaps include long-term classroom datasets with vertical eye-level exposure, low-cost spectral and flicker sensing, validated glare proxies for IoT deployments, and evidence from tropical and low-resource schools. Stronger links between sensed lighting conditions and actual educational outcomes are still needed.


---

## 7. Ocupacao, atividade e contexto de uso

### Identificação e base bibliográfica

#### Referências utilizadas

- Sulistiyanti SR, Komarudin M, Setyawan FXA, Septama HD, Yulianti T, Ammar MF. Analyzing the Impact of Occupancy Patterns on Indoor Air Quality in University Classrooms Using a Real-Time Monitoring System. International Journal of Advanced Computer Science and Applications. 2024;15(10).
- Ramos A, Jesus V, Goncalves C, Caetano F, Silveira C. Monitoring Indoor Air Quality and Occupancy with an IoT System: Evaluation in a Classroom Environment. 2023 18th Iberian Conference on Information Systems and Technologies (CISTI). 2023.
- Vake D, Hrovatin N, Vicic J, Tosic A. Occupancy estimation using indoor air quality data: opportunities and privacy implications. Energy and Buildings. 2025;343:115894.
- Monti L, Tse R, Tang SK, Mirri S, Delnevo G, Maniezzo V, Salomoni P. Edge-Based Transfer Learning for Classroom Occupancy Detection in a Smart Campus Context. Sensors. 2022;22(10):3692.
- Rus T, Moldovan RP, Marza CM, Corsiuc G, Ilutiu-Varvara DA. Data-driven environments: Evaluating IoT sensors and KNX protocol for monitoring indoor conditions in educational facilities. Frontiers in Built Environment. 2025;11:1688582.
- US EPA. Reference Guide for Indoor Air Quality in Schools. Accessed August 11, 2026.
- US EPA. A Guide to Siting and Installing Air Sensors. Last updated January 7, 2026.
- Texas Instruments. Catch Your Breath: Which Is a Better Occupancy Detector - mmWave or PIR? Technical article, republished 2023.

#### Identificadores e endereços persistentes

- https://doi.org/10.14569/IJACSA.2024.0151051
- https://doi.org/10.23919/CISTI58278.2023.10211974
- https://doi.org/10.1016/j.enbuild.2025.115894
- https://doi.org/10.3390/s22103692
- https://doi.org/10.3389/fbuil.2025.1688582
- https://www.epa.gov/iaq-schools/reference-guide-indoor-air-quality-schools
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.ti.com/lit/pdf/sszt759

#### Tipo e composição da evidência

Topic-level evidence synthesis combining classroom IoT pilots, machine-learning occupancy inference, edge vision counting, BAS-integrated monitoring, and official school IAQ guidance.

#### Países e condições climáticas

The evidence spans university and school settings in Indonesia, Portugal, Slovenia, Romania, and general U.S. school guidance. The climates and building operations differ, but the common pattern is that occupancy-driven indoor conditions are highly sensitive to schedule, ventilation mode, and whether rooms are naturally ventilated, mixed-mode, or mechanically conditioned.

### Escopo e método

#### Objetivo e questão de pesquisa

The central objective is to understand how occupancy density, schedules, transitions between classes, and user activity shape classroom environmental conditions and how those contextual variables should be measured in an IoT monitoring system. The practical research question is not only whether a room is occupied, but whether the system can distinguish presence, approximate people count, and capture activity context well enough to explain CO2, temperature, humidity, and perceived air-quality patterns and to trigger useful operational decisions.

#### Desenho dos estudos

The evidence base is mixed: real-world classroom pilots, observational IAQ monitoring, machine-learning occupancy estimation from environmental data, edge-AI people-counting deployments, and mixed-methods studies combining sensor streams with occupant feedback. Most studies are non-randomized field evaluations in actively used educational spaces.

#### Contexto educacional

The strongest directly relevant settings are elementary-school classrooms, university classrooms, laboratories, and lecture spaces. These environments are characterized by dense but time-varying occupancy, largely sedentary activity with periodic vocal peaks, scheduled breaks, and frequent mismatch between nominal room capacity and actual classroom use.

#### Amostra e duração

The reviewed evidence ranges from single-classroom pilot deployments to multi-classroom school programs. A strong school-based example is the Slovenian study by Vake et al. 2025, which placed 8 air-quality sensors in elementary-school classrooms and monitored VOC, CO, temperature, and humidity for 6 months while school staff collected anonymous occupancy labels. Complementary classroom pilots in Portugal and Indonesia demonstrate shorter but operationally relevant monitoring of occupancy-linked IAQ dynamics in active teaching spaces.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Occupancy-sensitive monitoring in classrooms should include explicit presence or people count when possible, plus time-stamped CO2, temperature, relative humidity, and optionally VOC or PM. The most useful contextual variables are class schedule, occupied versus unoccupied state, lesson duration, room turnover, window and door state, and whether a period involves quiet seated work, discussion, or other higher-emission activity.

#### Condições externas e linha de base

Outdoor weather and baseline conditions matter even for occupancy research because they shape window opening, infiltration, and HVAC operation, which in turn determine whether the environmental signal reflects human presence or ventilation change. The Slovenian occupancy-estimation study explicitly improved inference by pairing indoor IAQ data with external weather data, illustrating that occupancy modeling should not treat indoor signals in isolation.

#### Ocupação e atividade

Occupancy in classrooms is not a static count. Density, duration of stay, turnover between classes, absenteeism, speaking intensity, computer use, door opening, and teacher-led versus group activity all change the magnitude and timing of heat, moisture, and CO2 emissions. Sedentary classroom use is the default assumption for many comfort standards, but real classroom use repeatedly departs from that assumption through transitions, vocal activity, and bursty periods of crowding.

#### Operação da ventilação e filtração

Occupancy data is only operationally meaningful when interpreted alongside ventilation mode and control logic. The same headcount can produce very different CO2 and comfort outcomes depending on whether the room relies on natural ventilation, a fixed BAS schedule, demand-controlled ventilation, or manual window-opening behavior. Occupancy-aware monitoring is therefore most useful when it normalizes environmental data by how much outdoor air and air movement the room actually receives.

#### Granularidade espacial

Room-level monitoring is the minimum defensible granularity. For environmental sensing, one well-sited node per classroom is often enough for operational screening, but explicit occupancy sensing can require different geometry: doorway counting, ceiling coverage, or wide field-of-view wall or edge devices. The 2025 KNX educational-facility study also reinforces that fixed wall-mounted nodes may under-represent local peaks and can miss spatial heterogeneity within occupied rooms.

### Sensores, metrologia e dados

#### Especificações dos sensores

For classroom occupancy, the recommended sensing hierarchy is: privacy-preserving mmWave radar or dedicated people-counting depth/ToF systems when actual presence and count are needed; PIR when only coarse occupied or unoccupied status is required; and camera-based edge counting only when institutional privacy governance is mature and count accuracy is mission-critical. Evidence in the reviewed studies is strongest for class-level environmental sensing plus either inferred occupancy from IAQ data or vision-based people counting, rather than for one universal occupancy module or model.

#### Calibração e garantia da qualidade

QA/QC should include time synchronization across occupancy and IAQ streams, manual ground-truth head counts for selected periods, validation against schedules, and testing under both low and high occupancy. For edge vision or mmWave systems, commissioning should verify field of view, occlusion zones, and false detections at doors. For inference-based occupancy models, training and validation data should be collected across multiple rooms, seasons, and timetable conditions rather than a single classroom pattern.

#### Aquisição e qualidade dos dados

Second-level or sub-minute sampling is useful for explicit occupancy sensing and transitions, while 1 to 5 minute aggregation is usually enough for HVAC response and dashboards. Data quality problems include clock drift, missing labels, false transitions during short exits, sensor dropout, and mismatch between scheduled occupancy and actual attendance. The occupancy label itself often becomes the weakest part of the dataset unless ground truth is systematically recorded.

#### Sensor recomendado por variável

For occupied or unoccupied state, a low-cost PIR can be acceptable when false negatives for still occupants are tolerable. For classroom people counting and persistent presence, mmWave radar is the more technically robust privacy-preserving class because it can detect fine motion that PIR often misses. If the goal is occupancy-aware environmental interpretation rather than precise counting, true CO2 plus schedule metadata and optional ML inference can be an economical secondary path, but it should be labeled clearly as inferred occupancy rather than direct measurement.

#### Saídas úteis e unidades

Useful occupancy outputs are binary presence, estimated people count, occupancy density in persons per square meter or per room, occupancy duration in minutes, person-hours per day, and transition events such as class start, break, and vacancy recovery. These outputs become most valuable when aligned with CO2 ppm, temperature in degrees Celsius, relative humidity in percent, and time-above-threshold metrics for the occupied period.

#### Medição direta ou proxy

Camera, mmWave, ToF, and doorway counting provide explicit occupancy observations, although each still has edge cases and counting error. CO2, VOC, temperature, humidity, Wi-Fi association, and schedule data are occupancy proxies or inference inputs. They can be very useful operationally, but they should not be presented as direct occupancy measurements because ventilation, weather, and metabolic variation confound the relationship.

#### Princípio de medição e seletividade

PIR measures motion-linked changes in infrared radiation and is selective for movement rather than stable human presence. mmWave radar resolves range, motion, and fine micro-movements and can detect breathing-level motion that PIR misses. Camera-based systems are strongest for count and flow but raise the largest privacy burden. IAQ-based inference uses statistical or machine-learning relationships rather than a human-sensing physics principle, so its selectivity depends on the quality of labels and confounder handling.

#### Faixa útil e desempenho real

Operationally, classroom occupancy sensing should handle empty rooms, partial occupancy, and full-capacity periods without saturating. The reviewed evidence shows that occupancy can be predicted from environmental data with up to 93% presence accuracy and 2.17 mean absolute error for exact count in the Slovenian elementary-school case, while the classroom edge-vision deployment by Monti et al. reported a maximum MAE of 1.23. Sulistiyanti et al. also reported occupancy-linked sensing accuracy of 97.17% for five-person scenarios and 93.96% for ten-person scenarios, alongside a CO2 correlation coefficient of 0.982 with student count.

#### Regime de operação

Continuous operation during school hours is preferred. For direct sensing, event-level detection at seconds resolution can later be aggregated to 1 minute or 5 minute summaries. For control applications, pre-class, in-class, break, and post-class segments should be explicitly recognized because the meaning of the same CO2 or temperature value changes substantially across those regimes.

#### Interferências e confundidores

PIR misses still occupants and can be fooled by only transient motion. Cameras and doorway counters are affected by occlusion, backlighting, furniture layout, and people entering in groups. mmWave can be affected by placement, clutter, and complex reflections. IAQ-based occupancy inference is confounded by ventilation rate, window opening, weather, room volume, lesson type, and differences in metabolic and vocal activity.

#### Protocolo acessível de validação

A practical TCC-scale protocol is to instrument one or two classrooms with the chosen occupancy sensor, collect manual head counts at 5 to 10 minute intervals during selected classes for at least 1 to 2 weeks, and log the timetable, window state, and break periods. If an IAQ-based inference model is tested, pair the labels with true CO2, temperature, humidity, and weather data, and reserve entire days or rooms for holdout testing. Short doorway video audits can be used temporarily as ground truth even when the final deployed system is camera-free.

#### Métricas de validação

Minimum metrics are binary occupancy accuracy, precision, recall, false vacancy rate, MAE for people count, confusion at class transitions, uptime, and missing-data fraction. For IAQ-based inference, also report room-wise generalization, drift across seasons, and whether the model transfers to rooms with different volumes, schedules, and ventilation patterns.

#### Instalação e encapsulamento

Environmental nodes that support occupancy interpretation should remain in the breathing zone and away from direct drafts or solar gain. PIR needs a clear view of typical motion paths, while mmWave and ToF need a field of view that covers seated occupants rather than only door traffic. Camera or radar devices should avoid glare, dead angles, and direct obstruction by whiteboards, projectors, cabinets, or hanging fixtures.

#### Integração de hardware

Occupancy sensing integrates well with ESP32-class MCUs for PIR and some radar modules, while edge-vision approaches usually require a Raspberry Pi class device or stronger accelerator. The most maintainable classroom architecture is often a combined environmental node plus a separate occupancy channel, because the data rates, privacy requirements, and failure modes differ substantially between them.

#### Maturidade da evidência

Evidence maturity is moderate to high for the claim that occupancy and activity strongly shape classroom CO2 and comfort conditions. It is moderate for explicit classroom people counting and for IAQ-based occupancy inference, and lower for universal transferability across room types and institutions. The privacy literature is also maturing, especially where seemingly benign environmental streams can still reveal sensitive occupancy patterns.

#### Cuidados específicos por variável

Do not confuse occupancy presence with occupancy count, and do not confuse count with activity intensity. PIR is not a people counter. CO2-inferred occupancy lags and depends on ventilation. Device-based or schedule-based occupancy can be wrong in both directions. Even non-imaging environmental data can reveal sensitive behavior patterns, so privacy risk does not disappear simply because cameras are avoided.

### Arquitetura IoT

#### Arquitetura do sistema

A defensible architecture is room node plus occupancy stream plus gateway or campus network plus time-series storage plus dashboard. The occupancy layer can come from explicit sensing, schedule integration, or both. The highest-value outputs are not raw occupancy traces alone, but occupancy-normalized environmental indicators, class-transition events, and alerts that point facilities staff or teachers to concrete ventilation or room-management actions.

#### Conectividade e protocolos

Wi-Fi with MQTT or HTTPS is the most straightforward for pilots. KNX/BAS integration is attractive when occupancy is expected to influence HVAC control directly. Edge devices that process occupancy locally and send only counts or states are preferable to transmitting raw images or high-volume radar data whenever privacy and bandwidth are concerns.

#### Interoperabilidade e modelo de dados

The minimum data model should include timestamp, room ID, sensor ID, occupancy state or count, confidence or QA flag, and if available schedule state. To be operationally useful, occupancy records should also align cleanly with environmental variables, window or HVAC state, and lesson metadata such as course block or room use type.

#### Cibersegurança, privacidade e ética

Occupancy monitoring is significantly more sensitive than temperature or CO2 alone. The 2025 Slovenian study is especially important because it shows that occupancy can be inferred from environmental sensing, creating privacy implications even without cameras. Minimize retention of raw sensitive data, prefer edge processing, avoid personally identifiable analytics, define clear access roles, and ensure that classroom monitoring is framed as environmental and operational support rather than behavioral surveillance of teachers or students.

### Análise, decisão e automação

#### Métodos analíticos

Useful methods include descriptive time-series analysis by class period, correlation between occupancy and CO2, occupancy classification and regression, sensor fusion with schedules and weather, anomaly detection for overcapacity or prolonged stale air, and mixed objective-subjective analysis linking measured conditions to occupant feedback.

#### Índice ou modelo derivado

Important derived measures are occupancy density, person-hours, occupied-period exceedance of IAQ thresholds, vacancy recovery time, and where appropriate inferred occupancy from environmental data. Inference models should state clearly whether they predict binary presence, coarse occupancy bands, or exact count, because these are different tasks with different error tolerance.

#### Regras de decisão e normas

There is no single classroom occupancy-sensing standard that resolves every deployment choice, so operational rules should be tied to use case. Practical rules include triggering pre-occupancy purge before scheduled classes, prioritizing rooms where measured or inferred occupancy repeatedly exceeds the ventilation assumptions used by the building, and treating unexplained high CO2 during supposedly low-occupancy periods as a prompt to inspect sensing, schedules, or ventilation operation.

#### Intervenção e automação

Occupancy-aware monitoring supports demand-responsive ventilation, pre-class flushing, post-class recovery, room reassignment for overcrowded groups, and better interpretation of alarms. It can also reduce false conclusions, for example distinguishing a ventilation problem from an unusually dense or highly vocal class session. Automation should remain transparent and should degrade safely if occupancy sensing fails.

### Resultados e avaliação

#### Resultados ambientais

The main environmental gain is better attribution. Occupancy context makes CO2, temperature, and humidity trends interpretable, reduces false positives, and helps identify whether poor conditions arise from overcrowding, weak ventilation, or unusual activity. It also supports fairer comparison between classrooms with different schedules and densities.

#### Saúde e aprendizagem

Evidence is strongest for indirect benefit rather than a direct causal effect of occupancy sensing itself. When occupancy context is captured well, classrooms with repeated under-ventilation, overcrowding, or discomfort can be identified earlier, which supports cleaner air, reduced stuffiness, and better conditions for attention and learning. The KNX study also shows that subjective responses can diverge from sensor values, reinforcing the need to combine both.

#### Integração objetiva e subjetiva

A strong pattern across recent educational monitoring work is that subjective comfort and IAQ perceptions do not map perfectly onto one sensor stream. The Romanian KNX study explicitly combined sensor data with occupant feedback, showing why contextual interpretation should include both objective measurements and classroom-reported experience.

#### Resultados quantitativos

Sulistiyanti et al. 2024 reported a correlation coefficient of 0.982 between student count and CO2 level, with occupancy-sensing accuracy of 97.17% for five-person scenarios and 93.96% for ten-person scenarios. Vake et al. 2025 reported up to 93% accuracy for occupancy presence and 2.17 MAE for exact people count inferred from IAQ and weather data in an elementary-school setting. Monti et al. 2022 reported a maximum MAE of 1.23 for classroom people counting with an edge-based camera approach. Rus et al. 2025 found strong alignment between fixed KNX and professional monitor data, with correlations up to 0.98 for CO2 and relative humidity and up to 0.97 for temperature, but also showed that subjective IAQ remained mixed despite acceptable tracking performance.

#### Viabilidade e aceitação

Occupancy/context sensing is feasible in classroom IoT systems, but the best sensing class depends on the question being asked. Acceptance is usually highest for privacy-preserving modalities and for dashboards that show aggregate room conditions rather than individual behavior. The biggest implementation risks are not only hardware cost, but governance, labeling effort, and the temptation to overinterpret proxies as precise counts.

#### Validade e limitações

Ground truth is costly, room layouts differ, and models trained in one school may not transfer cleanly to another. Environmental inference can fail when ventilation changes faster than occupancy, and direct sensors can fail when occupants are still, clustered, or occluded. Results therefore need room-level validation, explicit statement of sensing limits, and caution before scaling from one building or institution to another.

#### Contribuições e lacunas

The literature already supports a practical hierarchy for classroom context sensing: explicit privacy-preserving occupancy sensing where count matters, simpler presence sensing where it does not, and environmental inference only when labeled clearly as a proxy. The main gaps are standardized classroom benchmark datasets, better protocols for aligning occupancy with subjective and environmental data, stronger comparison of mmWave, ToF, PIR, and edge-vision under real classroom layouts, and clearer governance frameworks for privacy-preserving school deployment.


---

## 8. Bioaerossois e risco de infeccao aerea

### Identificação e base bibliográfica

#### Referências utilizadas

- CDC. Ventilation in Schools and Childcare Programs. Updated October 4, 2024.
- ASHRAE. ASHRAE Standard 241, Control of Infectious Aerosols. Accessed August 11, 2026.
- Morakinyo OM, Ana GREE. Seasonal levels and size fractions of indoor air bioaerosols as predictors of respiratory morbidities among school pupils in Ibadan, Nigeria. Frontiers in Public Health. 2025;13:1611167.
- Park S, Park J, Hwang J. Evaluation of Airborne Infection Risk in a School Using Multizone Simulation: Pathogen Transmission Between Students in Different Classrooms Through Corridors. Aerosol and Air Quality Research. 2025;25:19.
- Sedighi AA, Nardell EA, Nasiri F, Haghighat F. Revisiting the Wells-Riley airborne infection model: A critical analysis of its use and misuse. Building and Environment. 2025;280:113136.
- Feng X, Hu P, Jin T, et al. On-site monitoring of airborne pathogens: recent advances in bioaerosol collection and rapid detection. Aerobiologia. 2024;40:303-341.
- Mazzoli R, Filippini T, Ghermandi G, Vinceti M, Bigi A. Mitigating indoor risk of airborne infections using CO2 and PM measurements in university classroom: the MIRAI project. Journal of Environmental Health Science and Engineering. 2026;24:13.
- Peng Z, Jimenez JL. Exhaled CO2 as a COVID-19 Infection Risk Proxy for Different Indoor Environments and Activities. Environmental Science and Technology Letters. 2021;8(5):392-397.
- Cervantes R, Pena P, Riesenberger B, Rodriguez M, Henderson D, Goncalves S, Newire E, Pogner C, Salonen H, Almeida Silva M, Ferguson RMW, Haverinen-Shaughnessy U, Viegas C. Critical insights on fungal contamination in schools: a comprehensive review of assessment methods. Frontiers in Public Health. 2025;13:1557506.

#### Identificadores e endereços persistentes

- https://www.cdc.gov/niosh/ventilation/guidelines/index.html
- https://www.ashrae.org/technical-resources/bookstore/ashrae-standard-241-control-of-infectious-aerosols
- https://doi.org/10.3389/fpubh.2025.1611167
- https://doi.org/10.1007/s44408-025-00024-y
- https://doi.org/10.1016/j.buildenv.2025.113136
- https://doi.org/10.1007/s10453-024-09824-y
- https://doi.org/10.1007/s40201-026-00984-2
- https://doi.org/10.1021/acs.estlett.1c00183
- https://doi.org/10.3389/fpubh.2025.1557506

#### Tipo e composição da evidência

Topic-level evidence synthesis combining school bioaerosol field sampling, airborne infection-risk modeling, continuous classroom proxy monitoring, methodological reviews, and official ventilation and infectious-aerosol guidance.

#### Países e condições climáticas

The evidence spans tropical wet-dry primary schools in Ibadan, Nigeria; temperate and Mediterranean university classrooms in Italy; simulation-based school scenarios in Korea; and international guidance from CDC and ASHRAE. Climate matters because temperature, humidity, rainfall, and seasonal window-opening behavior strongly affect microbial survival, resuspension, ventilation, and the interpretation of proxy signals such as CO2 and particulate matter.

### Escopo e método

#### Objetivo e questão de pesquisa

The shared objective is to determine how airborne biological particles in educational buildings can be characterized, when low-cost continuous measurements can serve as useful risk proxies, and which ventilation and air-cleaning interventions most effectively reduce airborne infection risk. For an IoT classroom deployment, the core question is how to combine direct but episodic bioaerosol assessment with continuous proxy sensing and operational decision rules without falsely treating proxy variables as direct pathogen measurements.

#### Desenho dos estudos

The topic draws on descriptive cross-sectional school studies, seasonal field sampling, respiratory-symptom linkage analyses, multizone simulation using CONTAM plus Wells-Riley, year-round continuous classroom monitoring of CO2 and PM, and review papers on collection and rapid detection technologies for airborne pathogens. Most operational classroom evidence is observational rather than randomized.

#### Contexto educacional

The directly relevant settings are public primary schools, university classrooms, and connected educational spaces such as corridors. These are high-density environments with prolonged shared-air exposure, repeated daily occupancy cycles, and ventilation systems that range from fully natural ventilation to mixed or HVAC-supported operation.

#### Amostra e duração

A strong school exposure study is Morakinyo and Ana 2025, which sampled indoor air in 9 randomly selected public primary schools in Ibadan, with occupied and unoccupied classroom sampling performed three times per week for 3 months in the wet season and 3 months in the dry season, alongside a study population of 520 pupils. A complementary continuous proxy-monitoring example is the MIRAI project, which monitored CO2 and PM in 2 Italian university classrooms from March 2022 to May 2023. Simulation evidence adds school-wide airflow and corridor coupling scenarios that cannot be isolated easily in field campaigns alone.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Bioaerosol and airborne-risk assessment in classrooms should distinguish direct and indirect variables. Direct campaign variables include culturable bacteria and fungi in CFU per cubic meter, size fractions in micrometers, indoor-outdoor differentials, and when available molecular detection of target organisms. Continuous operational variables include indoor CO2 in ppm, PM size-resolved concentration, temperature in degrees Celsius, relative humidity in percent, occupancy pattern, ventilation state, and room connectivity through shared corridors or transfer air paths.

#### Condições externas e linha de base

Outdoor microbial reservoirs, rainfall, dust, wind, and seasonal humidity are major drivers of indoor bioaerosol composition and burden. Interpretation should therefore include outdoor or corridor baseline measurements whenever possible, because naturally ventilated classrooms can import both dilution air and outdoor biological material. Seasonal differences in the Nigerian school study show how wet and dry periods can shift both concentration and respirable fraction.

#### Ocupação e atividade

Occupancy density, duration of exposure, vocalization, movement, classroom changeover, and the degree of corridor interaction all influence airborne infection risk. Bioaerosol exposure also depends on whether the activity is quiet seated work, active discussion, or a crowded transition period. In infection-risk models, human presence is not only a source term for exhaled aerosols and CO2 but also a determinant of susceptible dose accumulation over time.

#### Operação da ventilação e filtração

Ventilation and air cleaning are the most actionable control variables for airborne infection risk in classrooms. CDC guidance states that good ventilation helps reduce the number of virus particles in the air, and ASHRAE Standard 241 establishes minimum requirements to reduce exposure to infectious aerosols. The 2025 multizone school simulation adds an important nuance: natural ventilation can reduce pathogen concentration within a classroom but may also increase cross-classroom transmission through corridors if airflow pathways are not managed. In that study, air purifiers and mechanical ventilation reduced within-classroom risk by 42.4% to 91.1% and cross-classroom risk by 78.7% to 80.3%, while some corridor-coupled natural-ventilation scenarios increased cross-classroom infection risk by up to 180%.

#### Granularidade espacial

Bioaerosol risk is strongly location-dependent, so room-level monitoring is the minimum useful scale and corridor coupling can be essential in multi-room buildings. Direct bioaerosol campaigns often need multiple indoor positions, occupied and unoccupied comparisons, and at least one outdoor reference. For continuous proxy monitoring, one well-sited classroom node may be enough for routine operations, but it cannot resolve near-source exposure gradients or corridor-to-room transfer by itself.

### Sensores, metrologia e dados

#### Especificações dos sensores

There is no mature low-cost IoT sensor that directly and selectively measures infectious classroom bioaerosols in real time with the ease of a CO2 monitor. Direct measurement still relies on specialized active samplers such as impactors, impingers, filters, cyclones, or electrostatic collectors, followed by culture, microscopy, qPCR, or other laboratory or rapid-detection workflows. For continuous classroom operations, the most practical proxy stack is true CO2 by NDIR plus an optical particle counter or PM sensor, optionally complemented by temperature, relative humidity, and occupancy context. The MIRAI classroom study, for example, used ARANET4 CO2 sensors and optical particle counters covering particle diameters from 350 nm to 40 micrometers.

#### Calibração e garantia da qualidade

Bioaerosol QA/QC is more demanding than routine IAQ sensing. Active samplers need calibrated flow, sterile media handling, blank controls, documented sampling duration, and careful transport or incubation procedures to avoid sample loss and contamination. For continuous proxy nodes, QA/QC should still include warm-up checks, co-location against better references, timestamp synchronization, and inspection of improbable spikes or flat lines. If culture and molecular methods are combined, the protocol should document whether the target is culturability, total genetic signal, or a rapid-screening biomarker.

#### Aquisição e qualidade dos dados

Continuous proxy measurements can be collected every 1 to 5 minutes, but direct bioaerosol data usually comes from episodic campaigns lasting tens of minutes to hours, followed by delayed laboratory processing. This means the data architecture must accommodate both high-frequency continuous series and sparse but information-rich direct samples. Missing data, viability loss during collection, blank contamination, culture bias, and changing occupancy during sampling all affect interpretability.

#### Sensor recomendado por variável

For continuous classroom risk management, recommend true CO2 by NDIR as the primary rebreathed-air proxy, plus PM1 or PM2.5 monitoring, temperature, relative humidity, and occupancy metadata. For direct bioaerosol characterization campaigns, recommend a calibrated active sampler such as an impactor, cyclone, or liquid impinger paired with culture and, when the question requires it, molecular analysis such as qPCR. Real-time pathogen-specific biosensors are promising in the research literature, but they are not yet the default low-cost classroom choice for a TCC-scale deployment.

#### Saídas úteis e unidades

Useful outputs include CO2 in ppm, PM in micrograms per cubic meter or particle-size distribution, bacterial and fungal burden in CFU per cubic meter, aerodynamic size fractions in micrometers, occupied-period exceedance metrics, indoor-outdoor ratios, and modeled infection risk outputs such as rebreathed fraction, event infection probability, or equivalent removal effectiveness when the modeling assumptions are stated explicitly.

#### Medição direta ou proxy

CO2 and PM are not direct pathogen measurements. CO2 is a rebreathed-air proxy and PM is a broad aerosol burden proxy that includes non-biological particles. Culture, qPCR, and other direct analyses measure collected biological material more directly, but even they do not perfectly reveal real-time infectivity because viability, culturability, and infectious dose are not identical. This distinction is central to defensible classroom monitoring.

#### Princípio de medição e seletividade

Proxy sensing relies on mature physical principles such as NDIR for CO2 and optical scattering for PM. Direct bioaerosol sampling relies on aerodynamic or electrostatic collection principles such as impaction, impingement, filtration, or cyclone separation, followed by biological identification methods including culture, microscopy, immunologic assays, or nucleic-acid amplification. Reviews from 2024 to 2026 show growing interest in real-time fluorescence, microfluidics, CRISPR-assisted detection, and integrated rapid-detection platforms, but selectivity, viability preservation, and deployment practicality remain limiting factors.

#### Faixa útil e desempenho real

In the Nigerian school study, median total bacterial counts in the wet season exceeded the often-cited indoor guideline of 500 CFU per cubic meter, and fungal counts exceeded the often-cited 50 CFU per cubic meter benchmark, illustrating that school bioaerosol burdens can be substantial even outside an outbreak-specific study. More importantly for deposition risk, 67.5% of bacterial aerosols and 77.8% of fungal aerosols in the wet season were in the respirable 1.1 to 4.7 micrometer size fraction. For continuous operational proxies, the MIRAI study showed that naturally ventilated classrooms had higher and more variable CO2 and PM than HVAC-supported rooms, reinforcing proxy usefulness for screening ventilation-related infection risk even when no direct pathogen data is collected.

#### Regime de operação

A practical classroom program should use continuous proxy sensing year-round and reserve direct bioaerosol campaigns for targeted investigations: recurring symptoms, visible moisture or mold, outbreak periods, filtration intervention studies, or before and after remediation. Event-based sampling during occupied periods and immediately after class changeover is often more informative than arbitrary single-time spot sampling.

#### Interferências e confundidores

CO2 proxy interpretation is confounded by variable infectivity, occupant activity, masks, outdoor baseline, and ventilation patterns. PM is confounded by dust, chalk, outdoor pollution, and other non-biological sources. Culture methods miss viable but non-culturable organisms, while molecular methods may detect dead organisms and fragments. Well-mixed far-field models can miss near-field exposure and complex multizone flow paths, especially in rooms connected by corridors or transfer air.

#### Protocolo acessível de validação

For a TCC-scale protocol, deploy true CO2 and PM continuously in one or more classrooms, annotate occupancy and ventilation state, and run at least one targeted direct-sampling campaign during representative occupied and unoccupied periods. Use one outdoor or corridor reference, collect blanks, calibrate sampler flow before and after use, and document sampling height and duration. Pair the field results with a simple Wells-Riley or rebreathed-fraction model only after explicitly stating the assumptions and limits of far-field mixing.

#### Métricas de validação

For continuous proxy nodes, report bias, MAE, RMSE, uptime, missing-data fraction, and false-alert frequency. For direct samplers, report flow accuracy, sample duration, blank contamination, colony recovery or qPCR output, and where possible collection or biological efficiency. For infection-risk models, report sensitivity to occupancy, outdoor CO2, quanta assumptions, and ventilation uncertainty rather than only a single point estimate.

#### Instalação e encapsulamento

Continuous proxy sensors should sit in the occupied breathing zone, away from direct drafts, windows, doors, and supply jets when the goal is representative room air. Bioaerosol samplers should be installed at documented height with unobstructed inlet flow, using sterile handling and avoiding immediate proximity to walls or localized turbulence unless source tracking is the specific objective. If corridor transfer is suspected, at least one strategically placed shared-space measurement is justified.

#### Integração de hardware

CO2, PM, temperature, and humidity integrate readily with ESP32- or Raspberry Pi-class classroom IoT nodes. Direct bioaerosol collection does not yet integrate cleanly into the same low-cost always-on architecture because pumps, consumables, sterility, and downstream analysis create a separate instrumentation and workflow layer. The practical architecture is therefore hybrid: continuous proxy sensing plus portable or episodic direct-sampling equipment.

#### Maturidade da evidência

Evidence maturity is high for the value of ventilation and air cleaning in reducing airborne infection risk, moderate to high for CO2 as a useful but imperfect far-field proxy, moderate for PM as a supporting risk indicator, and moderate for school bioaerosol exposure studies involving fungi and bacteria. Evidence maturity remains low for truly real-time, low-cost, pathogen-specific classroom bioaerosol sensing that is selective, validated, and operationally simple.

#### Cuidados específicos por variável

Do not equate CO2 with pathogens, and do not equate PM with bioaerosol burden. Culture underestimates total viable burden, while qPCR can overstate viable infectious presence by counting non-viable material. Wells-Riley outputs are model-derived and apply best to far-field, well-mixed assumptions. Corridor coupling, near-field exposure, and occupant activity can make real exposure very different from what a room-average proxy suggests.

### Arquitetura IoT

#### Arquitetura do sistema

A robust architecture is classroom proxy node plus campus network plus time-series database plus alerting and dashboard layer, augmented by a portable campaign toolkit for direct bioaerosol sampling when needed. During normal operation, the system should surface occupancy-normalized CO2 and PM, ventilation events, and building zones that repeatedly show elevated airborne-risk proxies. During targeted investigations, those same timestamps should anchor direct sampling and post-hoc modeling.

#### Conectividade e protocolos

Wi-Fi with MQTT or HTTPS is typically sufficient for classroom proxy sensing. Because direct bioaerosol campaigns are usually episodic and manually handled, their results can be ingested later as annotated records rather than as a continuous stream. The key interoperability requirement is not exotic protocol support but clean alignment between proxy time series, occupancy logs, ventilation metadata, and any direct microbiological results.

#### Interoperabilidade e modelo de dados

The minimum data model should include timestamp, room ID, sensor ID, CO2, PM, temperature, relative humidity, occupancy state if known, QA flags, and ventilation mode. Direct-sampling records should additionally include sampler type, flow rate, collection medium, duration, occupied or unoccupied condition, indoor or outdoor location, and the analysis method used. Without this contextual metadata, bioaerosol comparisons across classrooms and campaigns become weak.

#### Cibersegurança, privacidade e ética

Proxy monitoring is usually low privacy risk, but outbreak or infection-risk narratives raise institutional sensitivity. Access to room-level risk views should be role-based, and dashboards should avoid stigmatizing individual teachers, students, or programs. If symptom or absenteeism data are linked for research, governance should explicitly separate environmental monitoring from personal health surveillance and comply with the local legal framework.

### Análise, decisão e automação

#### Métodos analíticos

Useful analytical methods include descriptive time-series analysis of CO2 and PM, seasonal and occupied-versus-unoccupied comparisons, indoor-outdoor ratio analysis, aerodynamic size-fraction analysis, symptom association, multizone airflow simulation, and Wells-Riley or rebreathed-fraction modeling. The strongest studies combine at least one direct measurement pathway with one operational proxy pathway instead of relying on only one of them.

#### Índice ou modelo derivado

The most common derived risk tools are rebreathed fraction based on excess CO2, Wells-Riley infection probability, and multizone simulation outputs that account for airflow between connected rooms. These models are valuable because they translate proxy measurements into operational risk logic, but they remain sensitive to assumptions about quanta generation, occupancy, masking, mixing, and pathogen removal processes.

#### Regras de decisão e normas

Operational rules should follow cleaner-air logic rather than pretend that a single microbial threshold resolves all classrooms. CDC recommends cleaner air and ventilation to reduce airborne virus transmission, and ASHRAE Standard 241 formalizes minimum infectious-aerosol control requirements. For school operations, defensible rules include prioritizing rooms with repeated high occupied-period CO2, addressing moisture or visible fungal contamination immediately, escalating when PM and CO2 remain elevated together under high occupancy, and using direct bioaerosol assessment selectively where complaints, outbreaks, or mold indicators justify it. Because microbial guideline values are not harmonized internationally, they should be treated as contextual reference points rather than universal pass-fail limits.

#### Intervenção e automação

Core interventions are increased outdoor air, better scheduling of purge ventilation, verified HVAC operation, portable HEPA filtration, cleaner corridor airflow management, and occupancy management during high-risk periods. Automated responses can include alerting staff to open windows or inspect systems, increasing fan or outdoor-air settings where the building permits, and prioritizing portable air cleaners in rooms with persistently poor proxy signals.

### Resultados e avaliação

#### Resultados ambientais

Continuous monitoring and targeted intervention improve visibility into stale-air episodes, pollutant buildup during crowded periods, and seasonal shifts in classroom airborne burden. Direct sampling studies also reveal whether the issue is mainly moisture-linked fungal contamination, occupancy-linked bacterial resuspension, or a broader ventilation inadequacy that elevates multiple airborne-risk proxies at once.

#### Saúde e aprendizagem

The strongest direct school evidence in this set is respiratory morbidity linkage rather than confirmed infection incidence. Morakinyo and Ana 2025 connects seasonal respirable bioaerosol burden with respiratory symptoms among school pupils, while broader guidance and modeling literature support the plausibility that cleaner air reduces airborne infection exposure in schools. For learning settings, the benefit pathway is mainly through healthier air, fewer respiratory complaints, and reduced time spent in poorly ventilated spaces.

#### Integração objetiva e subjetiva

Direct school bioaerosol studies often pair measurements with symptom or morbidity data, while continuous IAQ studies pair sensor values with occupant perception and operational observations. This combination is useful because microbial risk is not always obvious from perception alone, and a classroom that feels acceptable can still exhibit poor ventilation or significant respirable biological burden.

#### Resultados quantitativos

Morakinyo and Ana 2025 studied 9 public primary schools and 520 pupils, found that wet-season median total bacterial counts exceeded 500 CFU per cubic meter, and reported that 67.5% of bacterial aerosols and 77.8% of fungal aerosols were in the respirable 1.1 to 4.7 micrometer size range. The same study estimated higher absorbed bioaerosol dose in children than adults, including 667 versus 348 CFU per kilogram per day in the wet season. Park et al. 2025 reported that some natural-ventilation scenarios increased cross-classroom infection risk through corridors by up to 180%, while air purifiers and mechanical ventilation reduced within-classroom risk by 42.4% to 91.1% and cross-classroom risk by 78.7% to 80.3%. The MIRAI project found that the naturally ventilated classroom showed higher and more variable CO2 and PM than the HVAC-supported room, supporting proxy use for ventilation-risk screening.

#### Viabilidade e aceitação

A hybrid monitoring strategy is feasible and credible for educational buildings: continuous low-cost proxies for everyday management, and direct bioaerosol campaigns for focused investigations. Routine acceptance is typically high for CO2 and PM monitoring because the hardware is familiar and non-intrusive. Direct bioaerosol work is less scalable operationally because of cost, laboratory dependence, and interpretive complexity, but it adds value when schools face symptoms, dampness, outbreak concerns, or intervention evaluation needs.

#### Validade e limitações

The largest limitation is that direct pathogen presence and infectivity are rarely measured continuously in classrooms. Proxy-to-risk translation depends on assumptions, and microbial sampling results can vary with method, season, and culture or molecular workflow. Many models assume far-field mixing and therefore understate near-source variation, while many field studies are local and may not transfer cleanly across climates, building types, and pathogen contexts.

#### Contribuições e lacunas

The literature supports a practical conclusion: classroom airborne-risk management should rely on continuous proxy monitoring for daily operations and targeted direct bioaerosol assessment for higher-resolution investigation. The main gaps are validated low-cost real-time pathogen sensors, harmonized school bioaerosol sampling protocols, better fusion of direct microbiology with classroom IoT streams, and stronger studies linking intervention-driven cleaner air to measurable reductions in infection, symptoms, absenteeism, and inequity across school buildings.


---

## 9. Filtracao, purificadores portateis e UVGI

### Identificação e base bibliográfica

#### Referências utilizadas

- CDC NIOSH. Improving Air Cleanliness. October 3, 2024.
- CDC NIOSH. About Germicidal Ultraviolet (GUV). October 4, 2024.
- US EPA. Preventing the Spread of Respiratory Viruses in Public Indoor Spaces. 2026.
- ASHRAE. Design Guidance for Education Facilities: Prioritization for Advanced Indoor Air Quality (Version 2.0). 2023.
- Simona SC, Bartell SM, Vieira VM. Classroom air quality in a randomized crossover trial with portable HEPA air cleaners. Journal of Exposure Science and Environmental Epidemiology. 2025;35(4):644-648.
- Curtius J, Granzin M, Schrod J. Testing mobile air purifiers in a school classroom: Reducing the airborne transmission risk for SARS-CoV-2. Aerosol Science and Technology. 2021;55(5):586-599.
- Park S, Mistrick R, Rim D. Performance of upper-room ultraviolet germicidal irradiation (UVGI) system in learning environments: Effects of ventilation rate, UV fluence rate, and UV radiating volume. Sustainable Cities and Society. 2022;85:104048.
- Sun Y, Haghnazari D, Huang C-Y, Baig A, Kim M, Cunningham A, Skeen C, Wolfson JM, Ferguson ST, Pratt ED, Valeri L, Zhao S, Gold DR, Balaj L, Koutrakis P, Phipatanakul W, Lai PS. Air Purifier Intervention for Respiratory Viral Exposure in Elementary Schools: A Secondary Analysis of a Randomized Clinical Trial. JAMA Network Open. 2025;8(10):e2536951.
- Lindsley WG, Derk RC, Coyle JP, et al. Efficacy of portable air cleaners and masking for reducing indoor exposure to simulated exhaled SARS-CoV-2 aerosols. MMWR Morbidity and Mortality Weekly Report. 2021;70(27):972-976.

#### Identificadores e endereços persistentes

- https://www.cdc.gov/niosh/ventilation/prevention/air-cleanliness.html
- https://www.cdc.gov/niosh/ventilation/germicidal-ultraviolet/index.html
- https://www.epa.gov/indoor-air-quality-iaq/preventing-spread-respiratory-viruses-public-indoor-spaces
- https://school-infrastructure.org/resources/design-guidance-for-education-facilities-prioritization-for-advanced-indoor-air-quality-version-20-1ca/
- https://doi.org/10.1038/s41370-025-00743-9
- https://doi.org/10.1080/02786826.2021.1877257
- https://doi.org/10.1016/j.scs.2022.104048
- https://doi.org/10.1001/jamanetworkopen.2025.36951
- https://www.cdc.gov/mmwr/volumes/70/wr/mm7027e1.htm
- https://sensirion.com/products/catalog/SEN55
- https://sensirion.com/products/catalog/SCD41
- https://senseair.com/product/sunrise/

#### Tipo e composição da evidência

Topic-level evidence synthesis combining official public-health guidance, school design guidance, classroom field studies, randomized intervention studies, and mechanistic modeling of air cleaning and airborne infection control.

#### Países e condições climáticas

The evidence spans temperate classrooms in the United States and Germany plus modeled generic classrooms relevant to mixed climates. Climate matters because cold, hot, smoky, or dusty outdoor conditions change how much schools can rely on outdoor air versus supplemental filtration or UVGI.

### Escopo e método

#### Objetivo e questão de pesquisa

The core objective is to determine how portable filtration and upper-room UVGI can be used as supplemental clean-air strategies in classrooms, especially where ventilation upgrades are limited, expensive, or seasonally constrained. For an IoT classroom project, the practical question is how to size, operate, and verify portable HEPA units and UVGI systems without confusing particle control, infection-risk mitigation, and true ventilation adequacy.

#### Desenho dos estudos

The evidence base is mixed: official guidance, school design guidance, short-term classroom intervention studies, school-year randomized crossover monitoring, secondary analysis of a randomized school trial, and CFD plus material-balance modeling for upper-room UVGI. Most classroom evidence is operational rather than fully controlled, so conclusions are strongest for particle reduction and supplemental clean-air delivery, and weaker for direct long-term health outcomes.

#### Contexto educacional

The target context is K-12 classrooms and other dense school spaces such as nurse offices, special education rooms, music rooms, cafeterias, and older classrooms with limited HVAC capability. Portable HEPA units are the most practical retrofit for typical classrooms, while upper-room UVGI is most relevant in high-risk or crowded rooms with sufficient ceiling height and some air mixing.

#### Amostra e duração

Recent classroom evidence includes a school-year randomized crossover trial during September 2022 to May 2023 and a randomized clinical-trial secondary analysis covering the 2015 to 2020 academic years in 200 classrooms across 39 schools, with 532 bioaerosol samples analyzed. Complementary evidence includes a short-term high-school classroom intervention in Germany and classroom UVGI modeling under representative operating conditions rather than a single building case.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

The most useful variables are indoor PM2.5, PM1, PM10, aerosol decay rate, true CO2, temperature, relative humidity, purifier fan state, purifier runtime, filter replacement status, room volume, and estimated ACH or equivalent ACH. UVGI systems also need fixture status, maintenance status, and commissioning records because a low-cost classroom node usually cannot directly prove germicidal dose in the occupied room.

#### Condições externas e linha de base

Outdoor PM2.5, smoke episodes, dust, pollen, and weather determine whether outdoor-air ventilation should be increased or whether filtration should carry more of the clean-air burden. Filtration and UVGI can provide equivalent clean air for particles or pathogens, but neither replaces the need to understand outdoor baseline conditions or to meet minimum outdoor-air code requirements.

#### Ocupação e atividade

Portable cleaners and UVGI matter most in densely occupied classrooms with long dwell times, speaking, singing, instrument use, or repeated class turnover. Occupancy schedules also determine the best operating regime: pre-purge, occupied continuous operation, and post-occupancy purge all matter more than occasional manual use.

#### Operação da ventilação e filtração

The literature and guidance converge on a layered strategy: keep ventilation functioning, upgrade central filtration to MERV 13 or better when feasible, and add portable HEPA units where rooms are hard to ventilate or more crowded. ASHRAE school guidance highlights targeting about 4 to 6 equivalent air changes per hour in classrooms through HVAC plus portable HEPA, while CDC recommends aiming for 5 or more ACH of clean air when possible. Upper-room UVGI is a supplemental treatment, not a replacement for ventilation or filtration, and is most appropriate where adequate outdoor air or filtration cannot be maintained year-round.

#### Granularidade espacial

Room-level analysis is required because portable cleaners are inherently room specific and UVGI performance depends on room geometry, ceiling height, and airflow pattern. One monitor per classroom is the practical minimum, but larger or irregular rooms may need multiple PM sensing points or more than one purifier to avoid untreated corners and misleading averages.

### Sensores, metrologia e dados

#### Especificações dos sensores

A practical verification stack is: an indoor optical PM sensor with fan-assisted sampling such as Sensirion SEN55 for PM1, PM2.5, and PM10; a true CO2 sensor such as Sensirion SCD41 or Senseair Sunrise to confirm that filtration is not being mistaken for ventilation; a temperature and humidity sensor for context; and device telemetry from a smart plug or current sensor to confirm purifier runtime. For UVGI, low-cost continuous field verification is weak; the defensible approach is professional commissioning with a UV radiometer plus ongoing lamp-status logging rather than relying on a cheap classroom UV sensor.

#### Calibração e garantia da qualidade

QA/QC should include pre-deployment co-location of all classroom nodes, time synchronization, startup checks, documentation of purifier fan settings, and explicit logging of filter changes and UV lamp replacement dates. For PM, collocate with a better reference instrument or duplicate low-cost unit; for CO2, run outdoor-background checks and review auto-baseline-correction behavior; for UVGI, keep commissioning reports, fixture locations, maintenance logs, and restricted switch controls.

#### Aquisição e qualidade dos dados

Collect raw or near-raw data at 1 to 10 second intervals where supported, then retain 1 minute aggregates for dashboards and 5 minute summaries for reporting. Data quality depends on preserving intervention metadata such as purifier speed, occupied versus unoccupied periods, open-window events, and maintenance actions, because otherwise reductions in PM or aerosol burden are difficult to attribute correctly.

#### Sensor recomendado por variável

PM reduction verification: use a fan-assisted optical PM sensor such as SEN55, with PMS5003-class devices as lower-cost alternatives for trend tracking. Ventilation adequacy check: use true CO2 by NDIR or photoacoustic NDIR such as SCD41 or Sunrise, because HEPA and UVGI do not remove CO2. Device operation: use a smart plug, current transformer, or relay status signal to record purifier or UVGI on/off state. UVGI efficacy verification: use professional radiometric commissioning and fixture maintenance records instead of treating low-cost UV intensity modules as sufficient evidence.

#### Saídas úteis e unidades

Useful outputs are PM2.5, PM1, and PM10 in micrograms per cubic meter; true CO2 in ppm; temperature in degrees C; relative humidity in percent; purifier runtime in percent occupied time or minutes; and clean-air performance expressed as ACH or equivalent ACH. For UVGI, the most useful operational outputs are fixture status, commissioning pass/fail, and estimated equivalent clean-air contribution rather than a simple classroom UV number.

#### Medição direta ou proxy

PM, true CO2, temperature, humidity, current draw, and switch state are direct measurements. Equivalent ACH, infection-risk reduction, viral diversity change, and UVGI effectiveness are derived or inferred quantities. UVGI dose in the germicidal zone is not the same thing as measured lower-room exposure, and CO2 remains a ventilation proxy rather than a direct pathogen measurement.

#### Princípio de medição e seletividade

PM is inferred from optical light scattering and is sensitive to aerosol properties. True CO2 should be measured by NDIR or photoacoustic NDIR because these methods are selective to CO2. Runtime telemetry can be obtained electrically with high confidence. UVGI commissioning requires radiometric methods and airflow-aware design because the practical effect depends on both UV field and room air mixing.

#### Faixa útil e desempenho real

In classroom practice, portable HEPA units consistently reduce fine particle concentrations when sized and placed correctly. The 2025 randomized crossover trial reported 39.9% lower annual PM2.5 in HEPA classrooms and 13.8% to 82.4% lower infiltration of outdoor PM2.5, while Curtius et al. reported that classroom aerosol concentrations dropped by more than 90% within about 30 minutes under high-clean-air operation. For UVGI, Park et al. modeled up to 96% airborne disinfection in occupied classrooms under favorable conditions, but real performance remains highly installation dependent.

#### Regime de operação

Portable HEPA units should run continuously during occupancy and often before and after occupancy, preferably at a stable fan setting that meets the clean-air target without unacceptable noise. UVGI in occupied classrooms should run continuously when the room is in use if the system has been safely designed, commissioned, and access-controlled. Single-shot or intermittent operation is generally inferior to predictable continuous clean-air delivery.

#### Interferências e confundidores

Purifier performance is confounded by poor placement, blocked intake or discharge, filter bypass, quiet-mode underuse, and room doors or windows changing the dominant air pathway. UVGI performance is confounded by insufficient ceiling height, weak air mixing, poor fixture placement, lamp aging, dust on lamps, unauthorized switching, and room layouts that allow occupants to enter the upper-zone field. A major interpretation error is to treat lower PM or lower infection-risk proxy as evidence of adequate outdoor-air ventilation when CO2 remains high.

#### Protocolo acessível de validação

For a TCC-scale protocol, monitor one classroom for at least one week in baseline mode and one week in intervention mode, using indoor PM, outdoor PM if available, true CO2, temperature, humidity, occupancy notes, and purifier runtime. Perform at least one controlled on/off or crossover sequence, calculate PM decay or reduction, and document noise and acceptability. For UVGI, require professional commissioning at installation, then pair fixture status logs with classroom PM and CO2 data to show the broader room context even though the microbial effect itself is indirect.

#### Métricas de validação

Minimum metrics are PM bias and duplicate agreement, annual or occupied-period mean reduction, peak reduction, indoor/outdoor ratio change, estimated ACH or eACH, uptime, missing-data fraction, and false-alert frequency. For interventions, also report occupied CO2 trends, noise in dBA, and operational adherence. If infection-risk models are used, report assumptions and sensitivity, not just a single percentage reduction.

#### Instalação e encapsulamento

Place monitoring nodes in the breathing zone and away from purifier exhaust jets, corners, windows, doors, and direct sunlight. Portable purifiers should have clear airflow around intake and outlet, and multiple units are preferable to one oversized unit in rooms with poor mixing. CDC indicates upper-room GUV is especially suitable when ceilings are at least 8 feet tall, with 8.5 feet preferred, and fixtures should be installed above occupied space with restricted switches and professional safety checks.

#### Integração de hardware

An ESP32-class node can integrate PM, CO2, temperature, humidity, and runtime telemetry over I2C, UART, or power-monitoring interfaces. Classroom nodes should be mains powered, locally buffered, and able to tag intervention state changes. UVGI systems are usually separate building devices; the IoT layer should ingest dry-contact status, switch status, or BMS points rather than trying to control lamp power directly from an experimental classroom node.

#### Maturidade da evidência

Evidence maturity is high for portable HEPA as a practical way to lower classroom particle concentrations and supplement clean-air delivery. Evidence is moderate for direct school infection-outcome benefits because results are mixed and depend on study endpoint, operation, and concurrent controls. Evidence is moderate to high for upper-room UVGI as an airborne infection control technology, but much weaker for low-cost field verification methods that a student project could deploy without specialist equipment.

#### Cuidados específicos por variável

Portable filters remove particles, not CO2, and usually not gaseous pollutants unless specific sorbent media are included. UVGI inactivates microorganisms but does not remove particles or dilute indoor gases. Avoid ozone-generating or poorly documented air treatment devices. Match CADR to room size, preserve safe noise levels, and do not substitute eCO2 for true CO2 when judging whether ventilation is actually adequate.

### Arquitetura IoT

#### Arquitetura do sistema

A defensible IoT architecture is room node to campus network to time-series database to dashboard, with separate telemetry for IAQ, intervention status, and maintenance status. The dashboard should show PM, CO2, occupancy schedule, purifier runtime, and intervention mode together so facility staff can distinguish insufficient outdoor air from insufficient particle cleaning. UVGI status should be integrated as a managed facility asset, not as an opaque black-box intervention.

#### Conectividade e protocolos

Wi-Fi plus MQTT or HTTPS is the simplest pattern for classroom deployment. Purifier runtime can be ingested via smart plugs, relay contacts, or submetered power. If school networking is constrained, LoRaWAN can transport summary telemetry, but room-level intervention studies usually benefit from higher-frequency local logging over Wi-Fi or buffered local storage.

#### Interoperabilidade e modelo de dados

Store timestamp, room ID, sensor ID, PM variables, CO2, temperature, humidity, purifier status, UVGI status, occupancy label, and QA flags in an open schema such as JSON or CSV. Interoperability improves when clean-air interventions are recorded as explicit states or events rather than hidden in free-text notes, allowing later comparison with BMS data, maintenance systems, and school IAQ dashboards.

#### Cibersegurança, privacidade e ética

The intervention stack is low privacy relative to cameras, but device telemetry can still expose occupancy patterns or staff behavior. Use authenticated network communication, encrypted transport where feasible, role-based dashboard access, and minimal personal data. UVGI controls should not be remotely exposed without strict safeguards because unauthorized switching or misconfiguration creates safety risk.

### Análise, decisão e automação

#### Métodos analíticos

Useful analyses include before-after comparisons, randomized crossover contrasts, aerosol or PM decay analysis, occupied-versus-unoccupied summaries, interrupted time-series analysis, and equivalent ACH estimation from CADR and room volume. For airborne infection framing, Wells-Riley or rebreathed-fraction style models can be used, but they must stay clearly separated from direct measurements.

#### Índice ou modelo derivado

The key derived construct is equivalent air changes per hour, calculated from outdoor air plus filtered or treated air divided by room volume. Indoor/outdoor PM ratio, purifier-normalized removal efficiency, and modeled infection-risk reduction are also useful. For UVGI, the most defensible derived output for non-specialists is estimated equivalent clean-air contribution from a commissioned system rather than a homemade microbiological efficacy claim.

#### Regras de decisão e normas

CDC recommends aiming for 5 or more ACH of clean air when possible, and EPA and ASHRAE guidance consistently recommend MERV 13 or better central filtration where systems can accommodate it. ASHRAE school guidance emphasizes 4 to 6 equivalent ACH in classrooms through HVAC plus portable HEPA when needed. Portable HEPA should be prioritized in hard-to-ventilate or high-occupancy rooms. Upper-room UVGI should only be selected when ceiling height, safe access control, and specialist design are available, and it should always complement rather than replace ventilation and filtration.

#### Intervenção e automação

Portable filtration is the fastest classroom retrofit and can be automated through occupancy schedules, PM triggers, smoke-event modes, or daily timed purge periods. UVGI can be scheduled to operate during occupied periods once professionally installed and access-restricted. Combined strategies should avoid the common mistake of reducing outdoor air too aggressively just because particle counts improve.

### Resultados e avaliação

#### Resultados ambientais

The clearest environmental outcome is lower indoor particle burden and lower infiltration-driven PM when outdoor air is polluted. Portable HEPA also adds equivalent clean air without the thermal penalty of maximizing outdoor-air intake at all times. UVGI adds pathogen inactivation capacity but does not improve particle, gas, or comfort metrics directly.

#### Saúde e aprendizagem

Portable HEPA and UVGI are expected to support healthier classrooms by reducing aerosol exposure, and recent school evidence suggests HEPA can reduce viral diversity in classrooms even when high viral exposure is not fully eliminated. The strongest direct classroom health evidence is still emerging, so the most defensible claim is reduced exposure potential and likely support for better attendance resilience during respiratory-virus seasons and smoke periods.

#### Integração objetiva e subjetiva

Teacher and student feedback is especially important for portable purifier acceptance because noise, drafts, floor footprint, and switch tampering can undermine performance. Subjective feedback is still secondary to measured trends, but it helps explain why a theoretically adequate purifier may underperform in daily operation. UVGI acceptance depends more on communication, safety signage, and trust in professional installation because the treatment is invisible.

#### Resultados quantitativos

Recent classroom and near-classroom evidence is consistent on direction of effect. Curtius et al. reported more than 90% reduction in aerosol concentration within about 30 minutes in a classroom using mobile air purifiers. Simona et al. reported 39.9% lower school-year PM2.5 in HEPA classrooms and 13.8% to 82.4% lower infiltration of outdoor PM2.5. Park et al. modeled up to 96% airborne disinfection from upper-room UVGI under favorable classroom conditions. Sun et al. found HEPA purifiers were associated with a 32.8% reduction in viral diversity but not with a reduction in high viral exposure overall, which reinforces the need for layered control rather than single-device thinking.

#### Viabilidade e aceitação

Portable HEPA is the most feasible intervention for existing schools because it avoids major HVAC retrofits and can be installed room by room. Acceptance is highest when units are quiet enough for teaching, clearly assigned to a room, and supported by a filter-replacement workflow. UVGI is feasible in a narrower subset of rooms because it requires adequate ceiling height, specialist design, electrical coordination, and safety management.

#### Validade e limitações

Limitations include strong room-to-room heterogeneity, mixed endpoints across studies, dependence on correct operation, and the fact that particle reductions do not prove adequate ventilation. UVGI school evidence relies heavily on modeling and transfer from healthcare and tuberculosis control literature. Low-cost classroom monitoring can verify context and some outcomes, but it cannot by itself validate microbiological inactivation in the upper-room treatment zone.

#### Contribuições e lacunas

The literature now supports a practical hierarchy for classrooms: fix ventilation first, add MERV 13 or better where possible, deploy portable HEPA as the primary retrofit, and reserve upper-room UVGI for suitable high-risk spaces under professional design. Key research gaps are long-term school outcome studies, better methods for integrating clean-air interventions with thermal and energy management, classroom-specific validation of UVGI field performance, and standardized low-cost protocols that distinguish ventilation, filtration, and germicidal treatment effects without overclaiming.


---

## 10. Condicoes externas, infiltracao e eventos extremos

### Identificação e base bibliográfica

#### Referências utilizadas

- US EPA. Wildfires and Indoor Air Quality in Schools and Commercial Buildings. Accessed August 11, 2026.
- US EPA. Best Practices Guide for Improving Indoor Air Quality in Commercial/Public Buildings During Wildland Fire Smoke Events. May 2025.
- US EPA. Using Air Quality Sensors for Smoke: What to Consider. 2026.
- Stampfer O, Zuidema C, Allen RW, Fox J, Sampson P, Seto E, Karr CJ. Practical considerations for using low-cost sensors to assess wildfire smoke exposure in school and childcare settings. Journal of Exposure Science and Environmental Epidemiology. 2024.
- Azoulay Kochavi S, Kira O, Gal E. Real-Time Monitoring of Environmental Parameters in Schools to Improve Indoor Resilience Under Extreme Events. Smart Cities. 2025;8(1):7.
- Kim S, Kang K, Park D, Kim T. Assessment of PM2.5 penetration based on airflow paths in Korean classrooms. Building and Environment. 2024;248:111103.
- Simona SC, Bartell SM, Vieira VM. Classroom air quality in a randomized crossover trial with portable HEPA air cleaners. Journal of Exposure Science and Environmental Epidemiology. 2025;35(4):644-648.
- Balmes JR. Should Schools Be Made Clean Air Spaces for Wildfire Smoke Episodes? JAMA Network Open. 2023;6(4):e235780.

#### Identificadores e endereços persistentes

- https://www.epa.gov/emergencies-iaq/wildfires-and-indoor-air-quality-schools-and-commercial-buildings
- https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P101HCVK.TXT
- https://www.epa.gov/wildfires/using-air-quality-sensors-smoke-what-consider
- https://stacks.cdc.gov/view/cdc/169969
- https://doi.org/10.3390/smartcities8010007
- https://doi.org/10.1016/j.buildenv.2023.111103
- https://doi.org/10.1038/s41370-025-00743-9
- https://doi.org/10.1001/jamanetworkopen.2023.5780
- https://www.airnow.gov/publications/wildfire-smoke-guide/wildfire-smoke-a-guide-for-public-health-officials/
- https://www.epa.gov/air-sensor-toolbox/wildfire-smoke-air-monitoring-response-technology-wsmart

#### Tipo e composição da evidência

Topic-level evidence synthesis combining official wildfire and indoor-air guidance, school field studies, low-cost sensor methodology papers, infiltration studies, and extreme-event resilience research.

#### Países e condições climáticas

The evidence spans wildfire-prone western United States schools, an arid sandstorm-prone school in Eilat, Israel, and temperate Korean classrooms influenced by prevailing winds and corridor leakage. The topic is climate sensitive because smoke, sandstorms, dust, heat, wind, and outdoor pollution episodes can rapidly change whether outdoor air helps or harms classroom conditions.

### Escopo e método

#### Objetivo e questão de pesquisa

The objective is to define how classroom monitoring systems should account for outdoor conditions, infiltration pathways, and extreme events rather than treating indoor readings as isolated room phenomena. For an IoT classroom project, the practical question is how to combine indoor sensing, outdoor baseline sensing, event detection, and operational rules so schools can respond to smoke, dust, heat, and polluted-air episodes without losing awareness of ventilation and comfort tradeoffs.

#### Desenho dos estudos

The evidence base includes official preparedness guidance, school field studies during wildfire smoke and sandstorms, airflow-path infiltration studies, and intervention studies that estimate how filtration changes indoor penetration from outdoor sources. Most of the strongest evidence is observational and event driven rather than experimental, which is appropriate because the hazards themselves are episodic and cannot be randomized.

#### Contexto educacional

The most relevant settings are K-12 classrooms, especially older buildings, naturally ventilated rooms, corridor-linked classrooms, and schools used as community refuge spaces during smoke or heat events. Extreme-event resilience is particularly important in schools because students stay for long periods, many buildings have aging ventilation systems, and children are a vulnerable population.

#### Amostra e duração

Stampfer et al. monitored indoor and outdoor PM2.5 at four Washington State schools during wildfire smoke in 2020 to 2021, with episodes lasting 4 to 19 days. Azoulay Kochavi et al. monitored four classrooms in one elementary school in Eilat during the entire month of May 2022, including a sandstorm event. Kim et al. analyzed airflow-path infiltration in a typical Korean school classroom configuration. Simona et al. added a school-year view of outdoor PM2.5 infiltration into classrooms during September 2022 to May 2023.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

The core variables are outdoor PM2.5, indoor PM2.5, PM10, temperature, relative humidity, true CO2, occupancy state, door and window state, purifier or HVAC mode, and contextual weather indicators such as wind direction, heat, precipitation, or smoke alerts. The most informative derived quantities are indoor to outdoor ratio, infiltration factor, event flags, persistence above thresholds, and room-to-room variance during the same event.

#### Condições externas e linha de base

Outdoor baseline is not optional for this topic; it is the topic. Schools need access to nearby regulatory or trusted community air data, plus at least one on-site outdoor sensor when possible, because wildfire smoke, traffic, dust, construction, and seasonal meteorology all change the meaning of indoor PM. Event-aware interpretation should also include corridor conditions, because infiltration may arrive indirectly through hallways or shared spaces rather than only through the exterior wall of the classroom.

#### Ocupação e atividade

Indoor activity changes the interpretation of infiltration because movement, cleaning, and chair scraping can produce indoor PM spikes that are unrelated to outdoor events. Occupancy also changes thermal stress and CO2 accumulation during smoke or heat response, especially when windows are closed for long periods and students remain in place through the school day.

#### Operação da ventilação e filtração

During smoke or severe dust events, guidance favors tightening the building, limiting window opening, reducing unnecessary door opening, optimizing HVAC settings, and relying more on high-efficiency filtration and designated cleaner-air spaces. After the event, outdoor-air dampers and normal ventilation practice must be restored. The operational challenge is that reduced outdoor air may protect against outdoor PM while worsening indoor CO2 or heat, so event mode must always be paired with indoor monitoring rather than assumed to be safe by default.

#### Granularidade espacial

Multiple indoor locations matter because within-building variation can be large during extreme events. Stampfer et al. found median hourly PM2.5 differences inside a single facility of up to 49.6 micrograms per cubic meter during school hours. That means a single central school monitor is insufficient for response decisions in larger buildings; at minimum, schools should monitor representative rooms with different orientations, ventilation types, and corridor relationships, plus one outdoor point.

### Sensores, metrologia e dados

#### Especificações dos sensores

A practical low-cost stack is an outdoor PM2.5 sensor designed for continuous use, one indoor PM2.5 sensor per representative classroom, true CO2 by NDIR indoors, temperature and humidity in every monitored room, and simple door or window state sensing where feasible. PurpleAir-class outdoor PM2.5 monitors are widely used in wildfire practice, while indoor room nodes can use Sensirion SEN55 or Plantower PMS5003-class optical PM sensors plus SCD41 or Sunrise CO2 sensors. A small weather station or API feed for wind, temperature, and smoke alerts is useful but should supplement rather than replace local pollutant measurements.

#### Calibração e garantia da qualidade

Outdoor and indoor PM nodes should be co-located before deployment, checked against a trusted reference or gravimetric method when available, and reviewed for humidity sensitivity, clock drift, and communication loss. Event studies need especially careful QA because smoke and dust can push sensors into regimes where bias changes. Sensor placement and room metadata should be documented with photos, height, distance from openings, and notes on whether the room is corridor facing or facade facing.

#### Aquisição e qualidade dos dados

High temporal resolution is important because extreme events are dynamic. Stampfer et al. found that during unstable air quality the next hour indoors was more strongly correlated with the last 10 minutes of data than with the last 3 hours, so 1 minute to 5 minute logging is preferable to sparse spot measurements. Data cleaning should preserve event transitions, not smooth them away, and should distinguish actual pollutant changes from unplugged devices or communications outages.

#### Sensor recomendado por variável

Outdoor PM2.5 baseline: use a weather-tolerant optical PM2.5 monitor or trusted regulatory/community monitor feed, preferably with dual sensing or a known evaluation history. Indoor event tracking: use a fan-assisted optical PM sensor such as SEN55 or a validated Plantower-class module. Indoor ventilation tradeoff check: use true CO2 by NDIR such as SCD41 or Sunrise. Thermal resilience: use digital temperature and relative humidity sensors. Building-operation context: add door or window reed switches, purifier or HVAC runtime telemetry, and an external weather or smoke-data feed.

#### Saídas úteis e unidades

Useful outputs are outdoor and indoor PM2.5 in micrograms per cubic meter, PM10 in micrograms per cubic meter when relevant to dust, true CO2 in ppm, temperature in degrees C, relative humidity in percent, indoor to outdoor ratio, infiltration factor, and event-mode status. For operations, the most useful dashboard outputs are trend lines and room comparisons rather than a single static daily average.

#### Medição direta ou proxy

Outdoor PM2.5, indoor PM2.5, temperature, humidity, CO2, and door state are direct measurements. Infiltration factor, smoke penetration, building resilience, and exposure risk are derived constructs. Even AQI-based school decisions are proxies because the local indoor experience depends on building characteristics and response actions, not only on outdoor AQI.

#### Princípio de medição e seletividade

Most school-scale event monitoring relies on optical light-scattering PM sensors, which are responsive and affordable but composition sensitive. True CO2 should be measured with selective NDIR or photoacoustic methods. Temperature and humidity use standard digital sensing. Wind or weather feeds may come from nearby professional stations rather than classroom-integrated sensors, which is often preferable for reliability.

#### Faixa útil e desempenho real

This topic must handle both normal and extreme conditions. Stampfer et al. reported median hourly indoor to outdoor PM2.5 ratios ranging from 0.22 to 0.91 across schools during wildfire smoke, showing that schools differ dramatically in protection. Azoulay Kochavi et al. observed statistically significant indoor PM2.5 increases greater than 16% during a sandstorm even with windows and doors closed. Kim et al. showed infiltration can be dominated by corridor pathways rather than direct exterior leakage alone, so real performance depends on the whole airflow network, not only the facade.

#### Regime de operação

Continuous monitoring is preferable year-round, with higher attention and more frequent review during forecast events. A good operating regime is 1 minute measurement and 5 minute retained reporting, with event flags from smoke alerts, dust alerts, or local weather conditions. Schools should also log when event mode is activated, such as windows closed, outdoor-air dampers adjusted, or portable filtration turned on.

#### Interferências e confundidores

Optical PM measurements are confounded by humidity, aerosol composition, and local particle sources inside the room. Infiltration estimates are confounded by occupancy-generated dust, cleaning, door opening, corridor exchange, and unmeasured airflow routes. Extreme-event interpretation can also fail if staff close windows but leave other leakage paths or pressure relationships unchanged.

#### Protocolo acessível de validação

A defensible TCC protocol is to install one outdoor node and at least two indoor nodes in contrasting classrooms, co-locate them for several days before deployment, and compare trends with a trusted external source such as AirNow during event days. Collect 1 minute data, annotate room operation, and compare normal days versus event days. Repeat a short post-event co-location to check drift. If possible, pair one better reference PM monitor with the low-cost nodes during at least one smoke or dust episode.

#### Métricas de validação

Minimum metrics are bias, MAE, RMSE, duplicate agreement, uptime, missing-data fraction, and correlation with a better reference or trusted baseline. For infiltration analysis, add indoor to outdoor ratio, infiltration factor, room-to-room spread during the same event, event detection timeliness, and false-positive event alerts. For operational usefulness, report how often the monitoring system changed or confirmed a school response action.

#### Instalação e encapsulamento

Indoor event sensors should sit 3 to 6 feet above the floor with free airflow and should be kept away from windows, doors, vents, humidifiers, and purifier exhaust. EPA smoke guidance also emphasizes protecting sensors from damage and making sure airflow is not restricted. Outdoor nodes need weather-tolerant mounting, power, and communications, and should avoid direct exhaust plumes, rain splash, or sheltered dead-air pockets that do not represent school exposure.

#### Integração de hardware

A practical implementation uses mains-powered indoor nodes with PM plus CO2 plus temperature and humidity, one outdoor PM node, and a shared time base. ESP32-class hardware is usually sufficient indoors. Outdoor hardware must account for weather protection, Wi-Fi reach, and easier service access. The software stack should ingest local sensors plus external feeds such as AirNow smoke maps, local meteorology, and event advisories.

#### Maturidade da evidência

Evidence maturity is moderate for wildfire-smoke and outdoor-PM monitoring in schools because multiple field studies and official guidance now exist, but the number of long-duration, paired indoor-outdoor school datasets is still limited. Evidence is stronger for the need to monitor outdoor PM2.5 and the usefulness of low-cost sensors for trends, and weaker for all-hazard generalization across wildfire smoke, dust, heat, and mixed urban pollution episodes.

#### Cuidados específicos por variável

Closing windows can reduce smoke ingress but may worsen CO2 and thermal conditions. Low-cost PM sensors are valuable for trend detection but are not regulatory-grade measurements. PM10 during dust events can rise for reasons that differ from wildfire PM2.5 and may stress optical sensors differently. Corridor infiltration can dominate classroom exposure even when the exterior wall is not the main leakage route. Event rules should therefore be room specific and verified by data rather than assumed from general building policy.

### Arquitetura IoT

#### Arquitetura do sistema

The most useful architecture is a distributed indoor-outdoor network connected to a time-series backend and an alert layer that merges local sensor data with external smoke and weather feeds. Dashboards should surface room orientation, corridor relationship, outdoor baseline, and event mode, because raw PM values without building context lead to poor decisions. A school-level map of representative rooms is more actionable than a single campus average.

#### Conectividade e protocolos

Wi-Fi plus MQTT or HTTPS is usually sufficient for classrooms and outdoor school nodes. External data can be pulled by HTTP APIs from air-quality or weather services. Buffered local storage is important because event days are precisely when power or network disruptions are more likely. For larger campuses, gateway architectures or LoRaWAN summaries may help, but minute-scale local storage should still remain available.

#### Interoperabilidade e modelo de dados

Store timestamp, room ID, outdoor reference ID, PM variables, CO2, temperature, relative humidity, room-operation state, and QA flags in a simple open schema. Event metadata should include whether windows were closed, purifiers activated, outdoor-air dampers reduced, and whether the room was designated a cleaner-air space. This structure supports later linkage to BMS records, school closure decisions, and health or attendance analyses without vendor lock-in.

#### Cibersegurança, privacidade e ética

The privacy burden is low if the network focuses on environmental data and coarse operational metadata rather than surveillance of individuals. Still, room-level data can expose inequities between schools or the operational weaknesses of specific classrooms, so access control and clear governance matter. Schools should communicate that the system is for environmental protection and resilience, not staff performance monitoring.

### Análise, decisão e automação

#### Métodos analíticos

Useful methods include event segmentation, indoor to outdoor ratio analysis, infiltration-factor estimation, room clustering by exposure protection, before-and-after intervention comparison, and regression or mixed-effects models using weather and room operation as covariates. During smoke or dust events, high-frequency time-series analysis is preferable to daily averages because operational decisions are often made hour by hour.

#### Índice ou modelo derivado

The central derived outputs are indoor to outdoor PM ratio, infiltration factor, and event-mode effectiveness. A practical resilience score can combine pollutant penetration, CO2 penalty during event mode, and room-to-room stability. However, composite scores should not replace the underlying measurements because the tradeoff between smoke protection, ventilation, and heat tolerance is context dependent.

#### Regras de decisão e normas

A defensible school rule set is: monitor outdoor AQI and PM2.5 continuously during forecast events, close windows and reduce unnecessary openings when outdoor smoke or dust is clearly harmful, activate filtration or cleaner-air rooms, and verify that indoor PM improves without letting CO2 or temperature drift unacceptably. EPA guidance emphasizes preparing low-cost indoor PM2.5 monitoring, using cleaner-air spaces, and managing HVAC settings during smoke episodes. After the event, restore normal outdoor-air settings and document what worked.

#### Intervenção e automação

Monitoring should drive a clear event workflow: detect outdoor hazard, shift the building into event mode, verify indoor response room by room, and escalate to designated cleaner-air classrooms or school-level protective actions if needed. Automation can include notifications when outdoor PM rises sharply, when indoor to outdoor ratios stop improving, or when a smoke-response setting solves PM but causes high CO2 or heat stress. Portable HEPA units are especially useful in rooms that remain weakly protected during event mode.

### Resultados e avaliação

#### Resultados ambientais

The main environmental outcome is improved understanding and reduction of pollutant penetration during outdoor events. With monitoring, schools can identify which rooms are relatively protected, which corridors or facades leak most, and where filtration materially improves resilience. This supports cleaner indoor air during smoke and dust episodes and more rational recovery to normal ventilation afterward.

#### Saúde e aprendizagem

Extreme outdoor pollution and heat can aggravate respiratory symptoms, discomfort, absenteeism, and reduced learning readiness. Balmes argues that with adequate filtration schools can often provide safer air than homes during wildfire smoke events, which matters for both health protection and continuity of in-person education. The evidence is strongest for exposure reduction logic and weaker for direct classroom-specific long-term learning effects.

#### Integração objetiva e subjetiva

Teacher and staff event logs remain useful because they explain whether unusual readings came from smoke, dust, cleaning, corridor traffic, or operational changes. Student and teacher comfort reports can also reveal when a smoke-protective setting creates thermal or stuffiness complaints. Still, event response should be anchored in measured indoor and outdoor data rather than perception alone.

#### Resultados quantitativos

The recent evidence provides actionable magnitudes. Stampfer et al. found median hourly indoor to outdoor PM2.5 ratios of 0.22 to 0.91 across schools during wildfire smoke and within-facility differences up to 49.6 micrograms per cubic meter. Azoulay Kochavi et al. observed indoor PM2.5 increases greater than 16% and temperature increases greater than 5% during a sandstorm. Kim et al. found that the corridor contributed about 25% of total PM2.5 infiltration in one south-facing classroom and 79% and 58% in east- and west-facing classrooms, respectively. Simona et al. reported that portable HEPA reduced infiltration of outdoor PM2.5 into classrooms by 13.8% to 82.4%, depending on school. Balmes noted that California students experienced more than 5,000,000 student-days per year above 12 micrograms per cubic meter of wildfire PM2.5 in the analyzed period.

#### Viabilidade e aceitação

This topic is highly feasible for low-cost IoT because PM2.5 sensing, outdoor data integration, and event alerting are mature enough for school-scale deployment. The harder part is operational discipline: maintaining outdoor nodes, interpreting tradeoffs between protection and ventilation, and making room-specific rather than campus-average decisions. Acceptance tends to improve when the system clearly supports protective action rather than just generating more graphs.

#### Validade e limitações

Limitations include event heterogeneity, low-cost sensor bias under varying aerosol properties, incomplete room coverage, and difficulty separating infiltration from indoor generation without careful metadata. Results from wildfire-prone, arid, or corridor-dominated schools do not transfer perfectly to every climate or building type. The monitoring system can support rapid decision-making, but it cannot by itself solve the structural building weaknesses it reveals.

#### Contribuições e lacunas

The strongest contribution is a clear design requirement for classroom IAQ monitoring: indoor sensors without outdoor context are insufficient for resilient school operation. The literature supports paired indoor-outdoor PM monitoring, representative room coverage, event-mode logging, and integration with filtration response. Research gaps remain in long-duration multi-hazard school datasets, automated control logic that balances smoke protection against CO2 and heat, and standardized methods for comparing protection performance across classrooms, schools, and event types.


---

## 11. Sensores de baixo custo, calibracao e QA/QC

### Identificação e base bibliográfica

#### Referências utilizadas

- US EPA. How to Use Air Sensors: Air Sensor Guidebook. Enhanced 2022 version, accessed 2026-08-11.
- US EPA. A Guide to Siting and Installing Air Sensors. Accessed 2026-08-11.
- US EPA. Low-Cost Air Pollution Monitors and Indoor Air Quality. Accessed 2026-08-11.
- South Coast AQMD. AQ-SPEC Home Page and sensor evaluation program description. Accessed 2026-08-11.
- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments. 2024;16(2).
- Rodenas Garcia M, Spinazze A, Branco PTBS, Borghi F, Villena G, Cattaneo A, et al. Review of low-cost sensors for indoor air quality: Features and applications. Applied Spectroscopy Reviews. 2022.
- Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Barros N, Mota T, Viegas C, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- ASHRAE. ASHRAE Position Document on Indoor Carbon Dioxide. Approved 2025-02-12.
- World Health Organization. WHO global air quality guidelines: particulate matter, ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide. 2021.

#### Identificadores e endereços persistentes

- https://www.epa.gov/air-sensor-toolbox/how-use-air-sensors-air-sensor-guidebook
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.epa.gov/indoor-air-quality-iaq/low-cost-air-pollution-monitors-and-indoor-air-quality
- https://www.aqmd.gov/aq-spec
- https://doi.org/10.3233/AIS-220577
- https://www.tandfonline.com/doi/full/10.1080/05704928.2022.2085734
- https://doi.org/10.3390/s24165129
- https://doi.org/10.3390/s24010148
- https://www.ashrae.org/file%20library/about/position%20documents/pd-on-indoor-carbon-dioxide-english.pdf
- https://www.who.int/publications/i/item/9789240034228
- https://www.epa.gov/air-sensor-toolbox/air-sensor-collocation-opportunities
- https://www.epa.gov/air-research/instruction-guide-and-macro-analysis-tool-evaluating-air-sensors-collocation-federal

#### Tipo e composição da evidência

Topic-level evidence synthesis combining official sensor-use guidance, a public performance-evaluation program, systematic reviews, classroom IoT deployments, and current manufacturer documentation.

#### Países e condições climáticas

The evidence base is international and spans temperate, Mediterranean, hot, cold, urban, and mixed-mode school settings. The calibration implications are consistent across climates: outdoor baseline, season, humidity, dust loading, and ventilation regime materially affect classroom interpretation, especially for CO2, PM, VOC proxies, and occupancy inference.

### Escopo e método

#### Objetivo e questão de pesquisa

The central objective is to define how low-cost sensors can be used credibly in classroom environmental monitoring when the deployment must remain affordable. The practical question is not only which sensors to buy, but how to separate direct measurement from proxy outputs, how to install and validate each channel, and how to run QA/QC so the resulting classroom data support real decisions rather than false precision.

#### Desenho dos estudos

This is a synthesis of classroom field studies, low-cost sensor reviews, official guidance for study design and collocation, and current commercial module specifications. The strongest evidence comes from mature variables such as CO2, temperature, humidity, and PM2.5; weaker variables such as VOC, PM10, and occupancy inference are treated more cautiously.

#### Contexto educacional

The target context is K-12 and university classrooms with dense occupancy, recurring schedules, mixed natural and mechanical ventilation, and a need for scalable room-level monitoring. These spaces are operationally difficult because occupancy is bursty, users open windows and doors unpredictably, and low-cost nodes must survive dust, heat, power interruptions, and limited maintenance capacity.

#### Amostra e duração

Classroom evidence ranges from short pilot studies to district-scale deployments with continuous logging over months. For a defensible low-cost program, the evidence supports a staged timeline: bench acceptance before deployment, 7 to 14 days of pre-installation collocation, several weeks of pilot operation in real classrooms, and periodic rechecks after installation or seasonal change.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

The highest-value classroom variables for low-cost monitoring are true CO2 in ppm, air temperature in degrees C, relative humidity in percent, and PM1 or PM2.5 in micrograms per cubic meter. Secondary or exploratory variables include PM10, illuminance in lux, A-weighted noise metrics in dBA, VOC or NOx indexes from MOX sensors, and occupancy from PIR, mmWave, ToF, or inference from schedules and environmental data.

#### Condições externas e linha de base

Low-cost classroom sensing is much more interpretable when paired with outdoor context. Outdoor CO2 baseline, traffic-related PM and gases, weather, solar gains, wildfire smoke, and season can all distort indoor conclusions if only indoor traces are observed. At minimum, classroom deployments should record nearby weather and, where feasible, one outdoor or corridor reference node.

#### Ocupação e atividade

Occupancy density, speaking level, class length, turnover between classes, cleaning periods, and student movement are first-order drivers of classroom sensor signals. They control CO2 rise, PM resuspension, heat and moisture loads, and the acoustic environment, so low-cost monitoring without schedule and activity metadata is substantially weaker.

#### Operação da ventilação e filtração

Window opening, door state, HVAC outdoor-air fraction, purge periods, recirculation, and portable filtration determine whether a classroom trace reflects source emissions, weak air renewal, or outdoor intrusion. Calibration and QA/QC should therefore record the operating state of ventilation and filtration during both validation and routine monitoring, because a well-calibrated sensor can still be misinterpreted if the building state is unknown.

#### Granularidade espacial

One well-sited node per ordinary classroom is the minimum defensible operational layout for CO2, temperature, humidity, and coarse IAQ screening. Additional sensors become justified in very large rooms, spaces with strong front-to-back gradients, complex airflow, strong window effects, or source-localized emissions. Spatial spot checks are especially important during validation because low-cost networks can create a false sense of representativeness.

### Sensores, metrologia e dados

#### Especificações dos sensores

The evidence supports a sensor-class hierarchy rather than one universal module. True CO2 should use NDIR or photoacoustic NDIR modules such as Sensirion SCD41 or Senseair Sunrise. Temperature and humidity are mature with digital CMOS sensors such as SHT45. PM is best handled with fan-assisted optical particle modules such as SEN55, SPS30, or Plantower-class sensors. Illuminance can use photopic lux sensors such as OPT3001. Noise should use calibrated digital MEMS microphones rather than threshold-only sound modules. VOC channels from SGP40 or SGP41 class sensors are useful as index outputs, not as pollutant-specific concentration substitutes.

#### Calibração e garantia da qualidade

The strongest cross-source consensus is that low-cost classroom sensing only becomes credible after explicit QA/QC. A practical workflow is: verify hardware and firmware on the bench; synchronize clocks; run side-by-side collocation with duplicates and at least one better reference; document warm-up behavior; inspect bias, slope, RMSE, uptime, and flat-line failures; install with metadata and photos; run post-installation checks; review time series for drift, clipping, implausible steps, and communication gaps; and repeat targeted rechecks after relocation, enclosure changes, or seasonal shifts. Auto-baseline and onboard correction features should never remain undocumented because they can silently change the meaning of the signal.

#### Aquisição e qualidade dos dados

Continuous logging with preserved raw cadence and aggregated operational summaries is preferred. In practice, 1 minute reporting is usually enough for dashboards, while native sampling can be faster for PM, acoustic frames, and occupancy transitions. Data-quality review should flag startup transients, missing packets, time drift, impossible values, saturation, clipping, repeated constants, and unexplained discontinuities. Completeness and uptime are core QA variables, not optional metadata.

#### Sensor recomendado por variável

Recommended low-cost classroom stack by variable: true CO2 by NDIR or photoacoustic NDIR; temperature and relative humidity by a digital CMOS sensor; PM1 and PM2.5 by fan-assisted optical scattering sensors with local correction; PM10 only as an indicative optical output; illuminance by a calibrated lux sensor with horizontal and, when possible, vertical placement; environmental noise by a calibrated MEMS microphone reporting LAeq and related metrics; VOC or NOx only as index or exploratory outputs from MOX sensors unless a selective dedicated gas sensor is justified; occupancy by PIR for coarse presence, mmWave or ToF for stronger direct presence or count, and schedule-plus-CO2 methods only when clearly labeled as inference.

#### Saídas úteis e unidades

The most useful outputs are true CO2 in ppm, temperature in degrees C, relative humidity in percent, PM1 and PM2.5 in micrograms per cubic meter, lux, LAeq in dBA, binary occupancy or estimated count, and explicit QA flags. VOC outputs are most useful as VOC Index or equivalent trend metrics rather than as absolute chemical concentration claims.

#### Medição direta ou proxy

True CO2, air temperature, relative humidity, illuminance, and acoustic pressure are direct physical measurements when the sensor chain is well-characterized. PM from compact optical sensors is an inferred mass estimate, useful but not gravimetric. VOC and NOx outputs from MOX sensors are proxies. Occupancy derived from CO2, Wi-Fi, or schedules is also a proxy. The classroom literature consistently supports keeping these distinctions explicit in dashboards and reports.

#### Princípio de medição e seletividade

The recommended principles are selective and mature where possible: NDIR or photoacoustic NDIR for CO2, CMOS for T and RH, optical scattering for PM, photopic photodiodes for lux, and MEMS microphones for noise. MOX gas sensors are intentionally non-selective and should be used as broad-response indicators. PM selectivity is limited by aerosol composition and humidity, and occupancy selectivity depends strongly on whether the channel is direct sensing or inference.

#### Faixa útil e desempenho real

Operational classroom ranges are narrower than many datasheet maxima, so real performance matters more than nominal range. For classrooms, the decisive question is whether the sensor remains stable and informative in the occupied regime: outdoor to high-but-not-saturated CO2, ordinary comfort temperature and humidity bands, low-to-moderate PM episodes, daylit lux levels, and common speech-and-activity noise levels. Real-world evidence is strongest for relative tracking and event detection; absolute accuracy degrades first for PM10, oxidant gases, and VOC-proxy channels.

#### Regime de operação

Continuous operation is preferred for all core channels. Warm-up time must be respected, and reporting should be matched to the physics of the variable: 1 to 5 minute reporting for CO2 and T/RH, faster native sampling with aggregation for PM and acoustics, and event-level capture for occupancy transitions. Aggressive duty cycling is generally a poor choice for PM and many gas channels unless the manufacturer explicitly supports it.

#### Interferências e confundidores

Common confounders include poor siting near windows, doors, ducts, corners, heat sources, direct breath plumes, chalk trays, cleaners, or teacher stations; self-heating from the MCU; high humidity for optical PM; baseline drift for gas sensors; direct sun for light sensors; airflow and vibration for microphones; and blind spots or still occupants for PIR. Many apparent sensor problems in classrooms are actually installation or interpretation problems.

#### Protocolo acessível de validação

A reproducible low-cost protocol is to build at least two candidate classroom nodes, collocate them with one better reference per variable for 7 to 14 days, and cover occupied periods, vacancy, cleaning, and at least one different weather pattern. Then install one node in a real classroom, keep a short event log, run duplicate spot checks after installation, and repeat a shorter collocation after any hardware or enclosure change. If no regulatory-grade reference is available, the next-best affordable strategy is a better-characterized portable instrument plus duplicate low-cost nodes and transparent uncertainty reporting.

#### Métricas de validação

Minimum metrics are bias, MAE, RMSE, slope, intercept, correlation, response time where relevant, completeness, uptime, reboot rate, and drift between pre- and post-checks. For occupancy add accuracy, precision, recall, false-vacancy rate, and MAE for count. For PM and gas channels, inspect residuals against RH and temperature. For operational dashboards, false-alert rate is also a key QA metric.

#### Instalação e encapsulamento

Install classroom nodes in the occupied zone, typically near breathing height, with free airflow and away from strong local disturbances. Enclosures should be vented, should not trap heat from the MCU or regulator, and should not create recirculation around PM inlets or acoustic ports. The mounting geometry used in calibration should match field installation as closely as possible, especially for light, PM, and noise channels.

#### Integração de hardware

Low-cost classroom nodes are usually easiest to maintain when they combine digital sensors over I2C, UART, or I2S with an ESP32-class MCU, mains power, local buffering, and watchdog recovery. Integration complexity rises sharply for analog electrochemical gas channels and for privacy-sensitive occupancy sensing. Hardware QA/QC should therefore include power-rail stability, timestamp integrity, local storage behavior, and thermal separation between the sensing head and the MCU.

#### Maturidade da evidência

Evidence maturity is high for low-cost T/RH sensing, high for true CO2 as a ventilation indicator when measured directly, and moderate for PM2.5 trend monitoring after local validation. It is weaker for PM10, MOS VOC concentration claims, oxidant gases at low classroom levels, and occupancy inference from environmental variables alone. This uneven maturity is the main reason QA/QC design must be variable-specific.

#### Cuidados específicos por variável

Do not confuse true CO2 with eCO2. Do not treat VOC index as chemical speciation. Do not present PM10 from a compact optical sensor as if it were gravimetric truth. Do not assume a lux value alone proves visual comfort. Do not use raw microphone amplitude as a classroom acoustic metric. Do not claim occupancy count from CO2 alone without calling it an inference. These distinctions are central, not peripheral, to classroom QA/QC.

### Arquitetura IoT

#### Arquitetura do sistema

A defensible architecture is room node to campus network or gateway to time-series storage to dashboards with QA flags and intervention rules. The QA/QC layer should be built into the architecture: device identity, firmware version, calibration version, health telemetry, local buffering, and recoverable transport failures should all be first-class features rather than later add-ons.

#### Conectividade e protocolos

Wi-Fi plus MQTT or HTTPS is the most practical default for classroom pilots because it supports minute-scale reporting and simple dashboards. LoRaWAN can be attractive where power or network coverage dominates, but it is less convenient for high-frequency PM or acoustic data. Protocol choice is secondary to reliability, local buffering, and the ability to keep timestamps and QA metadata intact.

#### Interoperabilidade e modelo de dados

Each record should store timestamp, room ID, node ID, variable name, unit, QA flag, firmware version, and, where applicable, calibration version and whether the output is direct or proxy-derived. A simple open JSON or CSV schema is sufficient at TCC scale, but transparent metadata are essential so that later analyses do not confuse true CO2 with eCO2-like proxy outputs or direct occupancy with inferred occupancy.

#### Cibersegurança, privacidade e ética

Environmental sensing is lower-risk than cameras, but classroom deployments still create governance obligations. Use authenticated devices, encrypted transport, minimal secrets on the node, access control to room-level dashboards, and a clear retention policy. Occupancy and acoustic channels require extra care because even non-image and non-audio outputs can reveal behavior patterns. The program should be framed as environmental support, not personal surveillance.

### Análise, decisão e automação

#### Métodos analíticos

Recommended analyses include occupied-period summaries, threshold-duration metrics, duplicate agreement checks, indoor-outdoor comparison, decay analysis for ventilation, residual analysis after correction, intervention before-versus-after comparisons, and mixed objective-subjective analysis when occupant feedback is available. A low-cost program should prefer interpretable analytics over opaque models unless high-quality labels justify more complexity.

#### Índice ou modelo derivado

Useful derived quantities include excess CO2 above outdoor baseline, overheating duration, indoor-outdoor PM ratio, occupancy-normalized exposure metrics, and simple traffic-light operational bands. Composite IEQ scores can be used for dashboards, but only if they preserve the distinction between direct physical measurements and proxy channels and do not hide variable-specific uncertainty.

#### Regras de decisão e normas

Health and design anchors should come from established standards and guidance rather than arbitrary device defaults. For example, WHO provides PM and gas health reference values, while ASHRAE explicitly cautions against overinterpreting indoor CO2 as a complete IAQ metric. In practice, classroom low-cost systems should use action bands and persistence rules rather than single-point alarm logic, and each rule should state whether it is based on a direct measurement or a proxy.

#### Intervenção e automação

The best interventions from low-cost classroom monitoring are operational and targeted: opening windows when outdoor air is cleaner, increasing outdoor air, repairing or rebalancing ventilation, changing cleaning timing, adding filtration for PM, reducing glare, or adjusting classroom use. Automation should be limited to transparent actions such as alerts, dashboards, and simple rule-based recommendations unless the sensing and controls are well validated.

### Resultados e avaliação

#### Resultados ambientais

When QA/QC is done well, low-cost monitoring improves visibility of under-ventilated, overheated, noisy, dusty, or poorly lit classrooms and supports more consistent operations. The environmental gain is less about the sensor itself and more about making room-level building performance observable at a scale that schools can afford.

#### Saúde e aprendizagem

Low-cost sensors do not directly measure health or learning, but the evidence supports their use as operational tools for conditions linked to comfort, symptom burden, attention, and resilience. The causal chain is strongest when direct measurements are paired with specific interventions and weaker when proxy variables are treated as if they were health endpoints by themselves.

#### Integração objetiva e subjetiva

Multiple classroom studies show that teacher or occupant perception does not perfectly track measured conditions. Low-cost QA/QC programs therefore benefit from short occupant annotations on stuffiness, glare, noise, thermal discomfort, and unusual events, but the sensor network should remain the primary quantitative layer and subjective data should be used for interpretation rather than substitution.

#### Resultados quantitativos

Recent classroom literature provides useful orientation numbers for both sensing and context. Boston Public Schools analyzed 245 million CO2 measurements from 3,659 monitors in 125 buildings and reported a mean school-day CO2 of 841 ppm with peaks above 5,000 ppm. District heat monitoring found substantial room-to-room variation within buildings. Occupancy studies have reported presence accuracy near 93 percent and count MAE near 2.17 when inferred from IAQ plus weather data. These results reinforce that low-cost sensing can be operationally valuable, but only after variable-specific validation and with transparent uncertainty.

#### Viabilidade e aceitação

Feasibility is high for a classroom core stack built around true CO2, T/RH, and PM, and moderate for optional lux, noise, and direct occupancy channels. Acceptance improves when the system is simple, action-oriented, and visibly maintains QA flags and uncertainty disclosures. The most common failure mode is not hardware cost but poor installation, weak metadata, and overclaiming what proxy channels can tell.

#### Validade e limitações

The main limitation is that low-cost sensing does not mature equally across variables. Classroom conditions are also spatially heterogeneous and behaviorally dynamic, which means that even a well-calibrated node may underrepresent the room if placement is poor. Program validity therefore depends on honest scoping: operational awareness and intervention support are realistic goals, whereas regulatory equivalence and pollutant-speciation claims usually are not.

#### Contribuições e lacunas

The strongest contribution of the current evidence base is a clear practical rule: low-cost classroom monitoring works best when direct core variables are prioritized, proxy variables are labeled transparently, and QA/QC is planned as part of system design rather than added later. The main gaps are long-term classroom drift studies, reproducible low-cost validation workflows for VOC and occupancy channels, better PM10 and coarse-dust methods, and more published school deployments that share raw QA/QC results instead of only dashboards or summary claims.


---

## 12. Projeto e validacao de um no IoT de baixo custo para salas de aula

**Foco:** Comparar tecnologias e modulos comerciais por variavel, distinguindo medicao direta de proxy, e definir selecao, instalacao, amostragem, calibracao, validacao, custo total, consumo, conectividade e manutencao.

### Identificação e base bibliográfica

#### Referências utilizadas

- Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments. 2024;16(2).
- Barros N, Mota T, Viegas C, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- US EPA. How to Use Air Sensors: Air Sensor Guidebook. Enhanced 2022 version, accessed 2026-08-11.
- US EPA. A Guide to Siting and Installing Air Sensors. Accessed 2026-08-11.
- ASHRAE. ASHRAE Position Document on Indoor Carbon Dioxide. Approved 2025-02-12.
- Sensirion. Product pages for SCD41, SHT45, SEN55, and SGP41. Accessed 2026-08-11.
- Plantower. PMS5003 product page. Accessed 2026-08-11.
- Texas Instruments. OPT3001 ambient light sensor datasheet and technical article on mmWave versus PIR. Accessed 2026-08-11.
- TDK InvenSense. ICS-43434 digital MEMS microphone product page. Accessed 2026-08-11.
- Vake D, Hrovatin N, Vicic J, Tosic A. Occupancy estimation using indoor air quality data: opportunities and privacy implications. Energy and Buildings. 2025;343:115894.

#### Identificadores e endereços persistentes

- https://doi.org/10.3390/s24165129
- https://doi.org/10.3233/AIS-220577
- https://doi.org/10.3390/s24010148
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://www.epa.gov/air-sensor-toolbox/how-use-air-sensors-air-sensor-guidebook
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.ashrae.org/file%20library/about/position%20documents/pd-on-indoor-carbon-dioxide-english.pdf
- https://sensirion.com/products/catalog/SCD41
- https://sensirion.com/products/catalog/SHT45
- https://sensirion.com/products/catalog/SEN55
- https://sensirion.com/products/catalog/SGP41
- https://www.plantower.com/en/products_33/74.html
- https://www.ti.com/lit/gpn/OPT3001
- https://www.ti.com/document-viewer/lit/html/SSZT759
- https://www.invensense.tdk.com/products/ics-43434
- https://doi.org/10.1016/j.enbuild.2025.115894
- https://senseair.com/product/sunrise/

#### Tipo e composição da evidência

Engineering-oriented topic synthesis combining classroom IoT case studies, system reviews, official sensor-use guidance, and current commercial module documentation.

#### Países e condições climáticas

The design is intended for classrooms across mixed climates, from naturally ventilated warm rooms to mechanically ventilated temperate classrooms. The variable selection stays stable across climates, but installation height, outdoor baselines, enclosure heating, and intervention logic must be climate- and building-specific.

### Escopo e método

#### Objetivo e questão de pesquisa

The objective is to specify and validate a low-cost classroom IoT node that distinguishes direct measurement from proxy channels and can be defended technically in a TCC. The practical research question is which commercial sensor modules and supporting architecture give the best trade-off among evidence quality, cost, power, maintenance burden, connectivity, and classroom relevance for each target variable.

#### Desenho dos estudos

This synthesis is a practical design-and-validation blueprint informed by classroom deployments, broad indoor-air sensor reviews, official QA/QC guidance, and current module specifications. It prioritizes variables and modules with stronger evidence and treats exploratory variables as optional add-ons rather than mandatory parts of the baseline node.

#### Contexto educacional

The target use case is a fixed room node for ordinary classrooms in basic or higher education, installed for continuous monitoring during occupied periods and used to support ventilation, comfort, and maintenance decisions. The node must be easy to replicate room by room, simple to power and mount, and understandable to school operators who are not sensor specialists.

#### Amostra e duração

For validation, a staged pilot is recommended: bench testing of all assembled nodes, 7 to 14 days of pre-installation collocation, 2 to 6 weeks of pilot classroom deployment with event logs, and a shorter post-pilot recheck. This duration is long enough to expose occupancy cycles, power and network failures, cleaning events, and the first signs of drift without making the TCC schedule impractical.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Recommended core variables are true CO2 for ventilation screening, air temperature and relative humidity for comfort and compensation, and PM1 plus PM2.5 for particle exposure and filtration decisions. Secondary or exploratory variables are PM10, illuminance, environmental noise, VOC or NOx indexes from MOX sensors, and occupancy or people-presence channels. Gas-specific CO, NO2, O3, or formaldehyde channels should only be added if there is a concrete use case and validation path.

#### Condições externas e linha de base

The node becomes much more useful when outdoor context is available. At minimum, the project should log weather and school schedule. If feasible, one outdoor or corridor reference node should capture CO2 baseline, outdoor PM episodes, and broad thermal context. Without that context, intervention logic can be wrong, especially for natural ventilation under polluted outdoor conditions.

#### Ocupação e atividade

Classroom interpretation depends heavily on occupancy pattern. Even if the node does not include a direct occupancy sensor, it should ingest timetable metadata and allow annotation of class periods, breaks, cleaning, and unusual activities. If people-presence is a design goal, direct sensing should be preferred over inference when privacy and budget allow.

#### Operação da ventilação e filtração

The node is intended to support manual or semi-automated operational decisions about windows, HVAC, and portable filtration. Validation should therefore document ventilation mode, window state, and whether air cleaners or noisy fans are operating, because these are not background details; they are part of the measurement regime that gives the data meaning.

#### Granularidade espacial

The baseline recommendation is one fixed node per classroom at breathing-zone height, with extra temporary nodes only for pilot mapping or problem diagnosis. This keeps cost and maintenance manageable while preserving the room-level resolution that most school decisions require. Large halls, labs, or rooms with strong gradients may need more than one point to avoid misleading single-node interpretation.

### Sensores, metrologia e dados

#### Especificações dos sensores

Recommended module set for the core node: true CO2 by Sensirion SCD41 or Senseair Sunrise; temperature and RH by SHT45 if not already provided acceptably by another direct sensor; PM by SEN55 as the strongest integrated low-cost option or PMS5003-class hardware as a cheaper alternative; illuminance by OPT3001; noise by ICS-43434-class digital MEMS microphone; exploratory VOC or NOx index by SGP41; and occupancy by a separate PIR for coarse presence or mmWave for stronger seated-presence detection. The selection is intentionally conservative: direct and selective modules are preferred for the core channels, while integrated proxy outputs are kept secondary.

#### Calibração e garantia da qualidade

Node validation should be built into the project plan from day one. Every assembled node should receive an acceptance checklist covering power integrity, sensor detection, firmware version, timestamp behavior, local storage, and startup stabilization. Pre-deployment collocation should compare all core channels against one better reference or trusted instrument. After installation, the node should be checked again in situ, and the project should maintain QA flags for warm-up, missing data, clock resync, communication dropout, saturation, and any manual correction applied. Auto-calibration features such as automatic baseline correction must be documented and justified before they are enabled in persistent occupancy spaces.

#### Aquisição e qualidade dos dados

A practical acquisition regime is native sensor sampling with 1 minute persisted aggregates for dashboards and analysis. CO2 and T/RH can be read once per minute or every few minutes; PM should sample continuously with minute aggregation; lux can sample every 10 to 60 seconds; and acoustic metrics can be computed on edge and uploaded as 1 minute summaries. The node should timestamp locally, buffer through outages, and report completeness and uptime as first-class outputs.

#### Sensor recomendado por variável

Recommended practical matrix by variable: CO2 ventilation marker, direct measurement, NDIR or photoacoustic NDIR, SCD41 preferred for compact low-power integration and Sunrise as a strong alternative; temperature and RH, direct measurement, SHT45-class digital sensor; PM1 and PM2.5, inferred optical mass from light scattering, SEN55 preferred when budget allows and PMS5003-class sensors acceptable for lower-cost trend monitoring; PM10, same optical family but only as a cautionary secondary output; illuminance, direct photopic lux, OPT3001 or equivalent; environmental noise, direct acoustic pressure with calibrated MEMS microphone and LAeq processing; VOC or NOx, exploratory proxy, SGP41 class index output only; occupancy, direct presence if needed, PIR for coarse presence and mmWave for better seated occupancy, with schedule-plus-CO2 inference only as a fallback proxy.

#### Saídas úteis e unidades

Core outputs should be CO2 in ppm, air temperature in degrees C, RH in percent, PM1 and PM2.5 in micrograms per cubic meter, plus QA flags. Secondary outputs can include PM10 in micrograms per cubic meter, lux, LAeq in dBA, VOC Index, NOx Index, occupancy state, and estimated count if a direct occupancy channel is added. The node should avoid generic composite scores as its primary exported variables.

#### Medição direta ou proxy

The node should make this distinction explicit in firmware, schema, and dashboard labeling. Direct channels are true CO2, temperature, RH, illuminance, and calibrated acoustic pressure-derived metrics. Proxy or inferred channels are PM mass from optical scattering, VOC or NOx indexes from MOX sensing, PM10 from compact optical modules, and occupancy inferred from schedule or environmental data. This distinction is one of the core design decisions because it protects the TCC from overclaiming.

#### Princípio de medição e seletividade

CO2 should be measured selectively by NDIR or photoacoustic NDIR. T and RH use mature CMOS sensing. PM uses optical scattering and therefore depends on aerosol properties. Lux uses photopic photodiode response. Noise uses MEMS microphone pressure sensing with digital signal processing. SGP41-style gas sensing is broad-response MOX sensing and not selective chemistry. mmWave and PIR occupancy channels differ materially: PIR is movement-dependent, while mmWave can detect finer motion and persistent presence.

#### Faixa útil e desempenho real

For real classrooms, the useful operating range is not the maximum sensor range but the range where the channel remains credible for school decisions. CO2 should cover outdoor baseline through severe under-ventilation events. T/RH should track ordinary comfort and moisture excursions without self-heating bias. PM should remain informative from low background to short classroom spikes. Lux should handle both low-light and strong daylight scenes. The design should favor modules with strong field behavior in that classroom regime over modules that simply advertise a broad nominal range.

#### Regime de operação

The node should be mains powered and operate continuously, with local buffering and network retry. A practical default is 1 minute reporting, faster internal sampling where the sensor supports it, and occupied-period analytics at the dashboard layer. Duty cycling should be minimized for PM and exploratory gas channels because it complicates stabilization and interpretation. Warm-up exclusions should be encoded automatically after boot or reconnect.

#### Interferências e confundidores

The main confounders are thermal bias from the MCU, poor airflow around the enclosure, direct solar exposure, drafts from windows or HVAC, coarse dust bursts near PM inlets, vibration or airflow at the microphone port, and blind occupancy sensing geometry. Another major confounder is false semantic certainty: users often assume that more channels automatically mean more validity, when in practice each extra proxy channel can add noise and maintenance burden.

#### Protocolo acessível de validação

A good TCC-level protocol has two phases. Phase 1, laboratory or bench acceptance: power test, timestamp test, duplicate agreement, and reference comparison for each channel that has an available instrument. Phase 2, field validation: collocate two or more nodes in one classroom or with one reference for 7 to 14 days, then deploy to separate classrooms with a documented timetable and event log. Minimum evidence for acceptance should include stable duplicates, interpretable drift, and post-installation checks. If occupancy sensing is included, add manual head counts for selected sessions.

#### Métricas de validação

Required metrics are bias, MAE, RMSE, slope, intercept, correlation, uptime, missing-data fraction, and false-alert rate. For occupancy add accuracy, precision, recall, false-vacancy rate, and count MAE. For node engineering also report reboot rate, local-buffer recovery success, and timestamp consistency. The validation section should clearly separate channel accuracy from network reliability and from intervention usefulness.

#### Instalação e encapsulamento

Install the node at approximately seated head height with free airflow and away from windows, doors, direct sunlight, radiators, projectors, whiteboard solvent sources, and strong supply or return jets. The enclosure should be ventilated, should isolate heat-generating electronics from the sensing openings, and should preserve the intended flow path for the PM module and the intended acoustic exposure for the microphone. If a separate occupancy sensor is used, its mounting geometry should be documented independently from the environmental node.

#### Integração de hardware

An ESP32-class MCU is a practical baseline because it supports Wi-Fi, I2C, UART, storage, and adequate compute for minute-scale edge logic. Core digital sensors integrate cleanly: SCD41, SHT45, SEN55, and OPT3001 use I2C, while PMS5003 uses UART and digital MEMS microphones use I2S. The node should include local flash or SD buffering, NTP synchronization, watchdog recovery, and a stable 5 V supply sized for PM current peaks. Optional occupancy or electrochemical gas channels should only be added if the extra integration complexity is justified by the research question.

#### Maturidade da evidência

Evidence maturity for the proposed node is strongest for the recommended core: true CO2, T/RH, and PM2.5. It is moderate for integrated noise and lux monitoring after local calibration. It is weaker for PM10, VOC or NOx proxy channels, and occupancy inference from environmental data alone. This maturity ranking should drive both the node scope and how strongly each channel is used in conclusions.

#### Cuidados específicos por variável

CO2 must be true CO2, not eCO2. T/RH can be biased badly by self-heating if the sensing head is not isolated. PM10 should not be oversold. VOC and NOx indexes from SGP41 are broad-response indicators and should not be treated as classroom pollutant concentrations. A MEMS microphone does not make the node a certified sound level meter. PIR does not count people and can miss still occupants. These cautions are design requirements, not only discussion points.

### Arquitetura IoT

#### Arquitetura do sistema

The recommended architecture is fixed classroom node to Wi-Fi to MQTT or HTTPS ingestion to a time-series database and a simple dashboard. The architecture should include device configuration, health telemetry, local buffering, and calibration metadata as part of the same pipeline. For small TCC scope, one broker and one dashboard stack are enough; the important requirement is that the stored data remain traceable to device, room, firmware, and calibration state.

#### Conectividade e protocolos

Wi-Fi is the default recommendation because it is simple, cheap, and adequate for minute-scale classroom telemetry. MQTT is preferable when the project wants lightweight message transport and easy device-state reporting; HTTPS is acceptable for simpler uploads. LoRaWAN is only attractive if mains power or Wi-Fi are unavailable, because it complicates high-frequency PM and acoustic summaries and usually reduces flexibility for QA metadata.

#### Interoperabilidade e modelo de dados

The node should publish explicit fields for timestamp, room ID, node ID, variable, unit, QA flag, firmware version, and whether the channel is direct or proxy-derived. Extra metadata such as installation height, enclosure revision, and calibration version should be stored outside or alongside the time series. This schema is simple enough for a TCC and strong enough to keep later analysis reproducible.

#### Cibersegurança, privacidade e ética

The node should use authenticated Wi-Fi credentials, encrypted transport where feasible, and a minimal attack surface. Room-level dashboards should not expose unnecessary user behavior detail. If the project adds occupancy sensing or retains any acoustic snippets, the privacy review becomes much stricter. The safest baseline is to avoid intelligible audio retention and to treat direct occupancy sensing as optional rather than default.

### Análise, decisão e automação

#### Métodos analíticos

The analysis layer should emphasize occupied-period summaries, duration above action bands, indoor-outdoor comparison where available, duplicate-agreement checks, and pre/post intervention comparisons. If occupancy is measured directly, occupancy-normalized ventilation analysis becomes stronger. Machine learning can be explored for secondary questions, but the core TCC should rely on interpretable statistics that are easy to defend.

#### Índice ou modelo derivado

Useful derived outputs are excess CO2 above outdoor baseline, occupied-time above threshold, thermal excursion time, indoor-outdoor PM ratio, and occupancy-normalized exposure summaries. A composite classroom IEQ score is optional and should never replace the raw variable panels. If used, it must penalize proxy uncertainty rather than hiding it.

#### Regras de decisão e normas

Operational decision rules should combine direct measurements with persistence and context. Example classroom rules are repeated occupied CO2 peaks above approximately 1,000 ppm as a ventilation warning, more urgent follow-up when peaks repeatedly exceed approximately 1,500 ppm, RH excursions above roughly 60 percent for moisture concern, and PM actions based on persistence and outdoor context rather than one isolated spike. The rationale should cite WHO and ASHRAE positions and should state clearly which channels are direct and which are proxy.

#### Intervenção e automação

The node is best used for actionable but simple interventions: opening windows when outdoor air is cleaner, increasing outdoor air or purge periods, adding or tuning filtration, adjusting cleaning timing, improving shading or lighting scenes, and escalating persistent problems to facilities staff. Full closed-loop automation is possible but not necessary for a TCC. A better first target is trustworthy sensing plus human-readable recommendations.

### Resultados e avaliação

#### Resultados ambientais

A successful node should reveal under-ventilated rooms, overheating patterns, PM episodes, and comfort trade-offs at room scale. Its value is that it turns classroom performance into something observable with enough temporal resolution to guide maintenance and operations rather than relying on occasional walkthroughs or perception alone.

#### Saúde e aprendizagem

The node does not measure health directly, but the selected variables have plausible links to comfort, symptom burden, attentional quality, and resilience when used to support interventions. The strongest claim the TCC can make is that better room-level observability supports earlier identification of conditions associated with poorer learning environments, not that the node alone proves educational or medical causality.

#### Integração objetiva e subjetiva

The design should leave room for short teacher or student annotations on stuffiness, glare, heat, or unusual noise. This is useful because measured traces and perceived experience do not always match. The best use of these subjective inputs is to interpret anomalies and to evaluate whether interventions were noticeable and acceptable.

#### Resultados quantitativos

Current commercial modules provide a workable performance floor for a classroom node. SCD41 advertises a 400 to 5,000 ppm range, SHT45 advertises plus or minus 1 percent RH and plus or minus 0.1 degrees C typical accuracy, SEN55 integrates PM, T/RH, VOC, and NOx outputs in one module family, PMS5003 detects particles down to about 0.3 micrometers, and OPT3001 measures visible-light intensity over a wide lux range with photopic response. Classroom evidence also shows the operational value of dense monitoring: Hernandez and Canas demonstrated an integrated classroom device, while district and school studies show room-to-room heterogeneity large enough to justify fixed per-room sensing.

#### Viabilidade e aceitação

A node built around the recommended core stack is technically feasible, affordable for pilot scale, and understandable to non-specialists. Acceptance is usually highest when the interface stays simple and when the system is framed as building-performance support rather than staff or student monitoring. Each optional channel should therefore justify itself not only technically but operationally.

#### Validade e limitações

The proposed node is valid for operational classroom monitoring, pilot studies, and intervention support, but it is not a substitute for regulatory monitoring or specialized research instruments. Single-point room measurement, proxy outputs, and climate-specific transfer all limit what can be claimed. The safest scope is a well-validated classroom node that supports decisions and generates reproducible evidence, not a universal all-in-one truth device.

#### Contribuições e lacunas

The main contribution of this design is a practical and defensible selection hierarchy: prioritize true CO2, T/RH, and PM; add lux and noise only if they support the research question; treat VOC and occupancy inference carefully; and build QA/QC into the architecture. Key gaps remain in long-term classroom drift data, low-cost PM10 and VOC validation under real school use, and head-to-head comparisons of PIR, mmWave, and schedule-based occupancy context in ordinary classrooms.


---

## 13. Conectividade, protocolos e interoperabilidade IoT

### Identificação e base bibliográfica

#### Referências utilizadas

- OASIS. MQTT Version 5.0. OASIS Standard. 7 March 2019.
- LoRa Alliance. LoRaWAN Specification v1.1. Technical specification. Published 15 September 2023.
- Open Geospatial Consortium. OGC SensorThings API Part 1: Sensing Version 1.1 and SensorThings API standard overview. OGC standards documentation, accessed 2026-08-11.
- W3C. Web of Things Thing Description 2.0. W3C technical specification and related Web of Things documentation, accessed 2026-08-11.
- Project Haystack. Introduction to Project Haystack. Official documentation, accessed 2026-08-11.
- Brick Schema. Brick Ontology: Introduction. Official documentation, accessed 2026-08-11.
- Zhao L, Yang Y, Wu Z. Review of Communication Technology in Indoor Air Quality Monitoring System and Challenges. Electronics. 2022;11(18):2926.
- Saini J, Dutta M, Marques G. Indoor Air Quality Monitoring Systems Based on Internet of Things: A Systematic Review. International Journal of Environmental Research and Public Health. 2020;17(14):4942.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro MS. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- NIST. NISTIR 8259 Series. Cybersecurity for IoT product manufacturers and supporting capabilities. Web guidance updated through 2026.

#### Identificadores e endereços persistentes

- https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
- https://resources.lora-alliance.org/technical-specifications/lorawan-specification-v1-1
- https://www.ogc.org/standards/sensorthings/
- https://www.w3.org/WoT/
- https://www.w3.org/TR/wot-thing-description-2.0/
- https://www.project-haystack.org/
- https://marketing.project-haystack.org/submitted-articles/introduction-to-project-haystack
- https://brickschema.org/
- https://doi.org/10.3390/electronics11182926
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7400061/
- https://doi.org/10.3390/s24010148
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program/nistir-8259-series

#### Tipo e composição da evidência

Topic-level evidence synthesis combining formal protocol standards, interoperability frameworks, systematic reviews, school-focused IoT deployments, and official cybersecurity guidance.

#### Países e condições climáticas

Evidence spans Portugal, Italy, the United States, China, and broader international building-IoT practice. Climate matters indirectly: hot and humid climates, cold seasons, reinforced concrete school buildings, and outdoor pollution events all influence where nodes are placed, whether battery operation is realistic, how often data need to be transmitted, and whether outdoor reference nodes must be integrated into the same protocol stack.

### Escopo e método

#### Objetivo e questão de pesquisa

The practical objective is to identify a communication and interoperability stack for classroom environmental monitoring that is robust enough for dense deployments, simple enough for a TCC-scale prototype, and open enough to avoid vendor lock-in. The core research question is which combination of physical connectivity, application protocol, and semantic data model best supports reliable classroom sensing, scalable dashboards, and later integration with building systems or digital twins.

#### Desenho dos estudos

Narrative topic synthesis anchored in protocol standards, recent reviews of IAQ monitoring systems, and school-specific deployments such as SchoolAIR and Smart Healthy Schools. The evidence base combines protocol-level documentation with applied field reports because interoperability success depends as much on implementation and metadata discipline as on the transport protocol itself.

#### Contexto educacional

The most relevant context is K-12 and university classrooms with repeated occupancy cycles, constrained retrofit budgets, mixed ventilation modes, and the need for one node per room or per representative zone. Dense classroom deployments are especially important because room-to-room variation is large and because school networks must handle many simple devices rather than a few expensive instruments.

#### Amostra e duração

Representative evidence ranges from classroom pilots to district-scale continuous monitoring. SchoolAIR describes a scalable IoT framework tested in university classrooms and deployed in a high school in northern Portugal, while Smart Healthy Schools reports a multi-room school concept validated through a LoRa-based campaign in Italy. Review literature spans many short and medium-duration monitoring studies, with continuous operation over weeks to school years being the most informative for connectivity reliability.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

The protocol stack usually carries temperature in degrees C, relative humidity in percent, CO2 in ppm, PM1 or PM2.5 or PM10 in micrograms per cubic meter, illuminance in lux, noise metrics such as LAeq in dBA, and occupancy or schedule context. For interoperability, each record should also include timestamp, room ID, sensor ID, firmware version, QA flag, and where relevant radio-health fields such as RSSI, SNR, battery voltage, and uptime.

#### Condições externas e linha de base

Outdoor reference nodes are highly valuable because indoor interpretation often depends on outdoor CO2, PM, weather, or wildfire and dust events. A good protocol design treats outdoor and indoor nodes as first-class entities in the same namespace so indoor-outdoor comparison, infiltration analysis, and event attribution do not depend on manual file joins.

#### Ocupação e atividade

Class schedule, transitions between lessons, teacher overrides, and student density drive the value of minute-scale telemetry. Protocols should therefore support event-rich time series rather than only hourly summaries, while still allowing local aggregation when bandwidth or battery life is limited.

#### Operação da ventilação e filtração

The monitoring network should also represent operational states such as windows open or closed, HVAC mode, outdoor-air availability, purifier state, and maintenance events. Without these context tags, the same pollutant trace can be misread as a sensor fault, a ventilation failure, or an occupancy spike.

#### Granularidade espacial

One node per regularly occupied classroom is the minimum defensible room-level granularity for operations. Large rooms, maker spaces, or rooms with strong front-to-back gradients may need two nodes or an additional outdoor reference. Interoperability is easier when the spatial hierarchy is explicit: campus, building, floor, room, and sensor position.

### Sensores, metrologia e dados

#### Especificações dos sensores

For connectivity-focused classroom nodes, the preferred device class is a digital multi-sensor node with a mainstream embedded MCU, stable clocking, local buffering, and standard buses such as I2C, UART, or SPI. The dense-deployment classroom literature shows the value of integrated nodes that combine temperature, relative humidity, CO2, illuminance, and noise, while school IAQ frameworks such as SchoolAIR extend that concept with PM and cloud connectivity. Networking choices should not force poor sensing choices; the node should expose raw or corrected variables cleanly regardless of whether transport is Wi-Fi, LoRaWAN, Zigbee, or Ethernet through a gateway.

#### Calibração e garantia da qualidade

Interoperability requires metadata discipline in addition to sensor QA. Calibration date, firmware version, correction model version, warm-up status, and known sensor caveats should travel with the data or remain queryable through the same API. A room's CO2 series is much less reusable if downstream systems cannot tell whether the sensor was true NDIR, whether an eCO2 estimate was used, or whether a local correction was active at the time of transmission.

#### Aquisição e qualidade dos dados

Continuous acquisition at 1 minute intervals is a strong default for classroom dashboards, with optional finer local sampling for event detection or edge analytics. To protect data quality, the communication layer should support clock synchronization, persistent local buffering, duplicate detection, bounded retry behavior, and explicit quality flags for stale data, imputed records, and backfilled records after outages.

#### Sensor recomendado por variável

For a protocol and interoperability stack intended for classroom IEQ, pair true CO2 by NDIR or photoacoustic NDIR with a stable temperature and humidity sensor, an optical PM sensor if particles matter, a calibrated lux sensor for lighting, and either a processed SPL channel or privacy-preserving occupancy sensor where relevant. From an integration standpoint, favor sensors with digital interfaces, documented warm-up behavior, and explicit units. Avoid eCO2-only gas modules when ventilation decisions are expected, and avoid protocol designs that flatten fundamentally different measurements into a single opaque vendor score.

#### Saídas úteis e unidades

Useful outputs include CO2 in ppm, air temperature in degrees C, relative humidity in percent, PM fractions in micrograms per cubic meter, illuminance in lux, occupied-state or count metadata, and acoustic summaries such as LAeq in dBA. Useful networking outputs include packet delivery status, radio signal quality, timestamp source, firmware version, device heartbeat, and local-versus-cloud processing state.

#### Medição direta ou proxy

The protocol should distinguish direct measurements from inferred outputs. True CO2 from NDIR is a direct gas measurement; eCO2, occupancy inferred from environmental patterns, and composite wellness scores are proxies. The same rule applies to networking health: measured packet delivery and clock drift are direct, while a single vendor-defined 'device quality score' is a derived proxy and should not replace the underlying metrics.

#### Princípio de medição e seletividade

Interoperability is improved when measurement principle is carried as metadata, especially for variables that are commonly confused. Examples include NDIR versus MOX-derived CO2 equivalents, optical scattering versus gravimetric PM, PIR versus mmWave occupancy, and broadband MEMS noise sensing versus calibrated sound-level instrumentation. This metadata prevents downstream analytics from treating non-equivalent signals as interchangeable.

#### Faixa útil e desempenho real

For networking, the useful operating regime is not maximum theoretical throughput but dependable delivery of small environmental payloads under school constraints. Wi-Fi performs well for mains-powered nodes and high update frequency, LoRaWAN is attractive for sparse minute-scale telemetry and battery-friendly retrofits, BLE is most useful for provisioning or short-range synchronization, and Zigbee or Thread are viable mesh options when a managed local fabric is preferred over direct campus Wi-Fi association.

#### Regime de operação

A practical regime is local sensing every few seconds or faster where needed, aggregation to 1 minute summaries for routine telemetry, and event-driven immediate publishing only for high-value alerts. Mains-powered Wi-Fi or Ethernet nodes can sustain richer traffic, while LoRaWAN nodes should publish compact payloads on a lower duty cycle and rely on local storage or a gateway for more detailed diagnostics.

#### Interferências e confundidores

Common confounders include 2.4 GHz congestion from student devices, RF shadowing by reinforced concrete or metal cabinets, captive portal changes, NTP failure, schoolwide password rotations, gateway reboots, and payloads that omit unit or calibration context. Protocol choice can also confound interpretation: a network may look unreliable when the real problem is oversized payloads, poor time sync, or a dashboard that silently drops backfilled data.

#### Protocolo acessível de validação

For a TCC-scale validation, deploy 3 to 5 nodes across representative classrooms and one outdoor or hallway reference for 2 to 4 weeks. Log sensor values and transport metadata simultaneously, trigger controlled connectivity interruptions, verify local buffer replay, and compare MQTT or HTTP ingestion against on-device records. Validation should document packet loss, reconnect time, clock drift, payload schema compliance, and whether dashboards preserve provenance when late data arrive.

#### Métricas de validação

Minimum metrics are packet delivery ratio, end-to-end latency, device uptime, missing-data fraction, clock drift, reconnect time after outage, duplicate-message rate, schema-validation pass rate, and battery or power-reset behavior where applicable. For multi-protocol comparisons, also report gateway load, local storage recovery success, and the fraction of records that retain complete metadata after ingestion.

#### Instalação e encapsulamento

Install nodes in the breathing zone and keep the sensor air path separate from hot regulators or MCUs. For protocol reliability, also protect antenna placement: avoid burying radio modules behind metal surfaces, use RF-permeable enclosures, and keep mains cables and large power supplies from forcing awkward installation points that compromise either airflow or signal quality.

#### Integração de hardware

A robust integration pattern is sensor bus to MCU, MCU to local flash or SD buffer, and then one of three uplink patterns: direct Wi-Fi to broker or API, low-power radio to gateway, or wired Ethernet or PoE for fixed high-value rooms. Gateways should expose a clear bridge between field protocols and cloud APIs so the same node payload can be forwarded without lossy reinterpretation.

#### Maturidade da evidência

Evidence maturity is high for MQTT, Wi-Fi, and LoRaWAN as widely used IoT building protocols, moderate for classroom-specific deployment guidance, and moderate for semantic interoperability frameworks such as SensorThings, WoT, Brick, and Haystack in environmental monitoring. Evidence is weaker for direct head-to-head school studies that compare full lifecycle cost, maintainability, and interoperability outcomes across multiple protocol stacks under the same operating conditions.

#### Cuidados específicos por variável

Do not collapse direct and proxy variables into one generic sensor schema. Tag true CO2 separately from eCO2, keep PM10 as more uncertain than PM2.5 for low-cost optical sensors, store the weighting and averaging interval for acoustic metrics, and avoid sending raw audio or identifiable occupancy traces unless the governance case is strong. A protocol that is technically open can still produce vendor lock-in if its field names, units, and QA semantics are proprietary.

### Arquitetura IoT

#### Arquitetura do sistema

The most defensible architecture is room node to local or campus network to broker or API to time-series storage to dashboard, with optional gateway or edge nodes when protocol translation or local resilience is required. In practice, this means classroom devices publish a compact canonical payload, a broker or gateway performs authentication and store-and-forward if needed, and a cloud or local server handles long-term storage, visualization, and cross-room analytics.

#### Conectividade e protocolos

MQTT over TLS is the strongest default application protocol for classroom environmental monitoring because it is lightweight, pub-sub friendly, payload agnostic, and well supported by edge brokers and cloud stacks. Wi-Fi is usually the easiest room-level transport where campus infrastructure and mains power already exist, and review evidence indicates that Wi-Fi has been the most commonly used IAQ communication technology. BLE is useful for commissioning and short-range interactions, Zigbee or Thread are reasonable when a managed low-power mesh is desired, and LoRaWAN is attractive for low-bandwidth multi-room retrofits where battery life, long range, and sparse uplinks matter more than continuous high-rate data. HTTP or HTTPS remains acceptable for simpler prototypes, while CoAP is relevant for constrained devices but less common in classroom IAQ practice than MQTT or HTTP.

#### Interoperabilidade e modelo de dados

Interoperability should be designed at three levels. First, use a canonical payload with explicit units, timestamps in UTC, room metadata, QA flags, firmware version, and sensor principle. Second, expose observations through open interfaces such as OGC SensorThings API where possible, using publish-subscribe or broker bridges rather than custom dashboard-only databases. Third, describe devices and building context semantically: W3C WoT Thing Description for device interfaces, and Brick or Project Haystack style metadata for rooms, HVAC zones, assets, and relationships. This combination reduces vendor lock-in and makes later integration with BMS, CMMS, GIS, or digital twin layers more realistic.

#### Cibersegurança, privacidade e ética

NIST's 8259 series reinforces that IoT products should be designed with baseline cybersecurity capabilities, support information, and lifecycle planning. For schools, that means per-device identity, encrypted transport, authenticated brokers or APIs, signed or controlled firmware updates, credential rotation, network segmentation, and logs that support troubleshooting without exposing student-level behavior. Privacy risk is low for most environmental variables but rises quickly when occupancy, audio, or timetable data can reveal class routines or staff behavior. LGPD-aligned data minimization and role-based access are appropriate defaults.

### Análise, decisão e automação

#### Métodos analíticos

For this topic, the most useful analyses are protocol selection matrices, device-uptime summaries, packet-loss and latency diagnostics, schema-validation checks, room-level data completeness analysis, and simple clustering of classrooms by telemetry quality. More advanced analytics such as anomaly detection or predictive maintenance are valuable only if the underlying metadata are stable and if missing-data mechanisms are made explicit.

#### Índice ou modelo derivado

A practical derived connectivity score can combine uptime, message completeness, clock health, metadata completeness, and mean delivery latency. This is useful for maintenance triage, but it should supplement rather than replace the raw components because a node can have acceptable uptime while still being analytically unusable due to drift, missing units, or lost QA flags.

#### Intervenção e automação

Well-designed protocol stacks enable concrete interventions: teachers receive simple room alerts, technicians see offline or drifting nodes, gateways can push buffered data after internet outages, and ventilation or filtration workflows can be prioritized based on trusted room-level trends. Automation should begin with low-risk actions such as alerting, ticket creation, and health checks before moving to direct HVAC control.

### Resultados e avaliação

#### Resultados ambientais

The environmental benefit of strong connectivity is not the protocol itself but the consistency of the monitoring program it enables. Reliable room-level telemetry improves detection of persistent under-ventilation, dirty-room PM episodes, thermal discomfort patterns, and rooms that repeatedly fail to recover between classes. Better interoperability also makes it easier to combine indoor data with outdoor baselines and maintenance events.

#### Saúde e aprendizagem

Connectivity choices affect health and learning only indirectly. Their value lies in making the underlying environmental signals trustworthy enough to support ventilation, filtration, comfort, and exposure decisions. A weak protocol stack can undermine otherwise good sensing by creating gaps, delayed alerts, or misleading dashboards, while a stable stack makes environmental interventions more credible and timely.

#### Integração objetiva e subjetiva

Teacher and facility feedback remain useful because staff quickly notice stale dashboards, delayed alerts, or overly complex interfaces. However, subjective preference should refine the delivery layer rather than replace technical validation. The most accepted systems are usually those that hide protocol complexity from educators while preserving rich diagnostics for technicians.

#### Resultados quantitativos

Systematic-review evidence indicates that Wi-Fi has been the dominant communication technology in IoT IAQ monitoring, and one review reported that 76.5 percent of reviewed low-cost IAQ systems used Wi-Fi, followed by Bluetooth Low Energy. The same broader literature also describes Zigbee as a recurrent secondary option and highlights growing interest in LoRaWAN for wide-area and low-power deployments. In school-oriented studies, SchoolAIR and Smart Healthy Schools show that both Wi-Fi-centric and LoRa-based architectures are operationally feasible when payloads remain compact and metadata are structured.

#### Viabilidade e aceitação

Feasibility is high when the design aligns with existing campus realities. Mains-powered Wi-Fi plus MQTT is usually the fastest path for a classroom pilot; LoRaWAN becomes attractive when IT onboarding is difficult or when outdoor and building-scale coverage matter more than high-frequency room telemetry. Acceptance improves when end users see clear room dashboards and technicians get explicit device-health views instead of silent failures.

#### Validade e limitações

Protocol recommendations are context dependent. A result from one school network may not transfer to another with different RF congestion, firewall rules, or maintenance capacity. Review evidence often reports what technologies were used, not always why they succeeded or failed operationally. Interoperability frameworks are promising, but many school deployments still stop at custom dashboards and do not test long-term semantic reuse across vendors or institutional systems.

#### Contribuições e lacunas

The strongest evidence-supported path is an open layered stack: digital room nodes, MQTT or another lightweight transport, local buffering, canonical schemas with units and QA flags, and semantic metadata that can later map to SensorThings, WoT, Brick, or Haystack. The main research gaps are school-specific benchmarks for protocol reliability, repeatable comparisons of Wi-Fi versus LoRaWAN versus mesh approaches under the same classroom conditions, and more real deployments that prove semantic interoperability beyond a single dashboard or vendor platform.


---

## 14. Edge, gateways, nuvem e gestao de dados

### Identificação e base bibliográfica

#### Referências utilizadas

- Calvo I, Espin A, Gil-Garcia JM, Fernandez P. Scalable IoT Architecture for Monitoring IEQ Conditions in Public and Private Buildings. Energies. 2022;15(6):2270.
- Pazhanivel DB, Velu AN, Palaniappan BS. Design and Enhancement of a Fog-Enabled Air Quality Monitoring and Prediction System: An Optimized Lightweight Deep Learning Model for a Smart Fog Environmental Gateway. Sensors. 2024;24(15):5069.
- Pietraru RN, Olteanu A, Adochiei IR, Adochiei FC. Reengineering Indoor Air Quality Monitoring Systems to Improve End-User Experience. Sensors. 2024;24(8):2659.
- Ferreira LM, Coelho FA, Pereira J. Databases in Edge and Fog Environments: A Survey. ACM Computing Surveys. 2024;56(11).
- Lopes SI, Orlowski C, Branco P, Karatzas K, et al. Low-Cost Sensor Systems and IoT Technologies for Indoor Air Quality Monitoring: Instrumentation, Models, Implementation, and Perspectives for Validation. Sensors. 2025;25(24):7567.
- Ge B, Tieskens K, Vyas P, Botana Martinez MP, Yuan Y, Walsh KH, Main L, Bolton L, Yajima M, Fabian MP. Decision tools for schools using continuous indoor air quality monitors: a case study of CO2 in Boston Public Schools. The Lancet Regional Health - Americas. 2025;48:101148.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro MS. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- NIST. NISTIR 8259 Series. Cybersecurity for IoT product manufacturers and supporting capabilities. Web guidance updated through 2026.

#### Identificadores e endereços persistentes

- https://doi.org/10.3390/en15062270
- https://doi.org/10.3390/s24155069
- https://doi.org/10.3390/s24082659
- https://doi.org/10.1145/3666001
- https://doi.org/10.3390/s25247567
- https://doi.org/10.1016/j.lana.2025.101148
- https://doi.org/10.3390/s24010148
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program/nistir-8259-series

#### Tipo e composição da evidência

Topic-level evidence synthesis combining school deployments, edge-fog-cloud architecture papers, database surveys, recent IAQ monitoring reviews, and official IoT cybersecurity guidance.

#### Países e condições climáticas

The evidence base is international, including Portugal, Italy, Spain, Romania, India, and the United States. Climate still matters even for architecture choices because hot, cold, humid, or smoke-affected periods change telemetry rates, ventilation relevance, outdoor baseline needs, and the operational value of local processing when internet links or district infrastructure are constrained.

### Escopo e método

#### Objetivo e questão de pesquisa

The objective is to define a practical data architecture for classroom environmental monitoring that decides what should happen on the node, what belongs on a gateway or edge server, and what is best left to cloud storage and analytics. The key question is how to combine edge processing, gateways, cloud services, and data governance so that the system remains resilient, scalable, interpretable, and affordable for school operations.

#### Desenho dos estudos

Narrative synthesis focused on implementation architecture rather than a single pollutant. The evidence combines edge-fog-cloud building-monitoring papers, school-specific IoT case studies, database surveys, and applied guidance from large monitoring programs, because data management performance depends on both computing architecture and day-to-day operational practice.

#### Contexto educacional

The most relevant setting is a school or campus with many simple classroom nodes, intermittent IT support, a need for room-level history, and limited tolerance for data loss during outages. This includes K-12 classrooms, university rooms, and multi-room school buildings where facilities teams need dashboards, alerts, and room comparison rather than isolated standalone monitors.

#### Amostra e duração

The architectural evidence spans public-building IEQ monitoring, school pilots, and district-scale continuous monitoring. SchoolAIR demonstrates a scalable classroom-to-cloud framework, Smart Healthy Schools frames a multi-room LoRa-based school control concept, and Boston Public Schools demonstrates the data-management burden of thousands of monitors operating across a full school year. Edge-fog-cloud architecture papers add design insight even when their field sites are not limited to classrooms.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

The architecture typically manages temperature, relative humidity, CO2, PM fractions, light, and sometimes sound or occupancy context. Data management should also treat metadata and system-health channels as first-class variables: uptime, battery or mains state, gateway identity, schema version, calibration state, and backfill status. Without those fields, downstream analytics cannot separate true environmental change from pipeline failures.

#### Condições externas e linha de base

A useful data architecture stores outdoor nodes, weather feeds, or nearby trusted baselines in the same logical model as indoor classroom data. This enables robust indoor-outdoor comparison, event tagging during wildfire smoke or dust events, and more defensible intervention logic such as deciding whether opening windows is helpful or harmful.

#### Ocupação e atividade

The data pipeline should preserve lesson-level timing, occupancy schedule, transitions between classes, and where possible simple occupancy tags or counts. These contextual records are often lower bandwidth than environmental traces but disproportionately important for interpreting spikes, decay periods, and intervention success.

#### Operação da ventilação e filtração

Window state, HVAC mode, purge periods, portable filtration status, and maintenance annotations should be stored alongside environmental data rather than in disconnected notes. The gateway or cloud layer is a natural place to merge these context streams so analytics and dashboards can tie a room's trace to a specific operational cause.

#### Granularidade espacial

Architecture should preserve hierarchy and locality: node, room, floor, building, campus, and district. Room-level time series are the operational core, but higher layers need rollups that do not erase outliers. The data model should also store sensor height or position when that materially affects interpretation, such as near-window versus interior placements.

### Sensores, metrologia e dados

#### Especificações dos sensores

From an edge and data-management perspective, the preferred sensor node is one that can timestamp locally, buffer data safely during outages, and expose its health state. Classroom edge systems work best when nodes use digital sensors with predictable interfaces and a small local cache, while gateways or edge servers provide protocol translation, persistent ingestion, and optional lightweight analytics before cloud upload.

#### Calibração e garantia da qualidade

Gateways and cloud systems should preserve calibration lineage, not just values. Each observation should be traceable to sensor model, calibration date, correction version, and QA state. Edge processing can apply validated corrections or flag suspect records, but the architecture should never discard the raw or minimally processed record without preserving provenance.

#### Aquisição e qualidade dos dados

A robust pipeline separates acquisition from presentation. Nodes sample and aggregate, gateways ingest and queue, databases persist, and dashboards query curated views. Data quality management should include time synchronization, idempotent ingestion, detection of duplicates and gaps, explicit stale-data markers, audit logs for corrections, and support for late-arriving records after gateway or internet outages.

#### Sensor recomendado por variável

The sensing recommendations remain conventional: true CO2 by NDIR, stable temperature and humidity sensing, optical PM sensing where particles matter, calibrated light sensing for illuminance, and privacy-preserving occupancy channels where needed. What changes in this topic is the implementation requirement: select sensors and node firmware that expose timestamps, health status, correction metadata, and deterministic digital interfaces so edge and cloud layers can manage them reproducibly.

#### Saídas úteis e unidades

Useful outputs include the measured variables in their physical units and the data-engineering fields that make them actionable: UTC timestamp, device ID, room ID, QA flag, firmware version, record freshness, local-processing stage, and whether the value is raw, corrected, aggregated, or inferred. For operations, summary outputs such as daily peak CO2, occupied-time PM2.5 exceedance, and gateway backlog size are often more valuable than raw streams alone.

#### Medição direta ou proxy

The data architecture should encode whether a field is directly measured, locally derived, or cloud-derived. Direct examples are CO2 ppm and room temperature; edge-derived examples are minute averages, event flags, and anomaly scores; cloud-derived examples are room rankings, rebreathed fraction estimates, and intervention effect summaries. This prevents end users from mistaking model outputs for sensor facts.

#### Princípio de medição e seletividade

Measurement principle still matters in a data pipeline because mixed fleets are common. The gateway or cloud schema should know whether CO2 is NDIR or estimated, whether PM is optical, whether occupancy is PIR or mmWave, and whether acoustic data are numeric summaries or more privacy-sensitive streams. Selectivity metadata improves model portability and future integration with external systems.

#### Faixa útil e desempenho real

For edge and cloud architecture, the critical range is the practical workload: second-scale local sensing, minute-scale classroom telemetry, months to years of retained history, and enough throughput to support room dashboards, rollups, and backfill without overwhelming school IT. Edge layers are most valuable when they cut unnecessary traffic, keep alerts alive during internet outages, and reduce the latency of local diagnostics or rule evaluation.

#### Regime de operação

A strong default regime is continuous local acquisition, minute-scale primary telemetry, store-and-forward buffering on node or gateway, and edge execution of basic QA and alert logic. Cloud processing is then reserved for long-horizon storage, cross-building comparisons, advanced analytics, and reporting. This split avoids both extremes: overloaded cloud-only systems and overcomplicated edge systems that are hard to maintain.

#### Interferências e confundidores

The main confounders are not only sensor physics but pipeline artifacts: unsynchronized clocks, inconsistent schema versions, partial backfills, timezone mistakes, gateway queue overflow, dashboard smoothing that hides peaks, and silent failures when an internet outage is mistaken for clean air. Data management can also be confounded by mixing room schedules, maintenance events, and environmental traces in incompatible systems.

#### Protocolo acessível de validação

A defensible TCC-level architecture validation is a staged pilot. First, run node-only logging to establish raw data continuity. Second, add gateway buffering and simulate internet loss. Third, verify that cloud ingestion reproduces the local record, including timestamps and QA flags. Finally, test dashboard freshness, room rollups, and alert latency across at least a few classrooms for 2 to 4 weeks. The validation should compare node files, gateway queues, and cloud tables rather than trusting the dashboard alone.

#### Métricas de validação

Report end-to-end data completeness, node uptime, gateway uptime, backlog depth during outages, replay success rate, end-to-end latency, duplicate-record rate, clock drift, schema-validation success, query latency for dashboards, and backup or restore success. If edge models are used, also report false-alert rate, processing latency, and whether local predictions remain available when cloud connectivity is lost.

#### Instalação e encapsulamento

Node installation still follows sensing best practice, but the architecture adds gateway placement and serviceability concerns. Gateways should be located where power and network are stable, where maintenance access is practical, and where local storage will not be repeatedly corrupted by abrupt shutdown or overheating. Enclosures should support airflow for sensors and thermal stability for compute hardware separately.

#### Integração de hardware

A practical stack is sensor node plus MCU plus local flash, then Wi-Fi, LoRaWAN, or mesh uplink to a gateway or directly to a broker, with the gateway running a lightweight broker, rule engine, and short-term storage when needed. Raspberry Pi class hardware is common for pilots, while industrial mini-PCs or managed edge appliances become more appropriate when many rooms, persistent local retention, or institutional uptime expectations are involved.

#### Maturidade da evidência

Evidence maturity is moderate to high for the general value of layered edge-fog-cloud architectures in building and IAQ monitoring, moderate for gateway-enabled resilience and dashboarding, and lower for rigorous school-specific comparisons of alternative database and deployment strategies. Database research for edge and fog is mature enough to guide architectural choices, but classroom environmental monitoring still lacks many long-duration, reproducible operational studies that compare architectures under the same real school conditions.

#### Cuidados específicos por variável

Do not allow the data platform to erase physical meaning. CO2 should remain distinct from eCO2, PM10 should not be given the same confidence as PM2.5 from low-cost optical sensors, noise streams should preserve metric definition and privacy boundaries, and composite scores should not replace the underlying variables. Also avoid storing only dashboard-ready aggregates if the project may later need recalibration, reanalysis, or auditability.

### Arquitetura IoT

#### Arquitetura do sistema

The most robust pattern is edge-fog-cloud. Classroom nodes acquire and temporarily buffer data, a gateway or edge server performs ingestion, normalization, local rules, and outage resilience, and the cloud or central server handles long-term storage, fleet management, cross-building analytics, and reporting. This layered architecture matches the public-building IEQ and fog-enabled AQ literature and is well suited to schools because it balances latency, resilience, and manageability.

#### Conectividade e protocolos

The data path can use several transports, but the architecture benefits from keeping the application semantics stable across them. MQTT over TLS is a strong default between nodes, gateways, and brokers because it supports decoupled publish-subscribe workflows and integrates well with store-and-forward patterns. LoRaWAN is useful when nodes need long range and sparse payloads, while Wi-Fi or Ethernet are better for richer, higher-frequency room telemetry. HTTP or HTTPS is acceptable for direct cloud ingestion in small systems, but gateways become more valuable once buffering, translation, and local analytics are needed.

#### Interoperabilidade e modelo de dados

Data management should use a canonical observation schema with explicit units, QA flags, room hierarchy, firmware version, and processing-stage metadata. Interoperability improves when the same record can be stored in a time-series database, exposed through an API such as SensorThings, and linked to building context through Brick or Haystack style metadata. Versioned schemas, immutable raw tables, curated analytical views, and explicit retention policies are more important than the choice of a specific dashboard product.

#### Cibersegurança, privacidade e ética

A gateway or edge layer can improve resilience, but it also becomes a security boundary that must be hardened. Follow NIST-style IoT product guidance with device identity, update planning, access control, logging, and lifecycle support. Use encrypted transport, credential separation between nodes and dashboards, restricted remote administration, and backups that are tested rather than assumed. Privacy risk remains modest for most environmental variables but rises if room schedules, occupancy, or audio-related data can reveal individual behavior; LGPD-style minimization and role-based access are appropriate.

### Análise, decisão e automação

#### Métodos analíticos

Edge analytics should focus on high-value, low-complexity tasks first: sanity checks, outlier filtering, short aggregations, stale-sensor detection, and simple threshold rules. Cloud analytics can then perform trend analysis, cross-room ranking, forecasting, intervention comparison, and long-horizon model training. This separation keeps local compute explainable and robust while preserving cloud capacity for heavier studies and fleetwide comparisons.

#### Índice ou modelo derivado

A useful derived model for architecture management is a room readiness score that combines data freshness, completeness, and environmental status, but it should remain decomposable into its components. For environmental analytics, keep derived indices separate from sensor QA: for example, report a room IAQ score only when the underlying data completeness and calibration state meet minimum criteria.

#### Regras de decisão e normas

Operational decision rules should cover both environment and pipeline health. Examples include alerting when a room exceeds a CO2 or PM band during occupied periods, when a gateway backlog persists beyond a defined window, when data freshness exceeds an agreed threshold, or when a node repeatedly reboots. Formal standards specify parts of the stack, such as MQTT and LoRaWAN, but the rules that matter most in schools are local service-level targets for freshness, completeness, and recoverability.

#### Intervenção e automação

Gateways and edge servers enable practical automation: local alerts can still fire during internet outages, queued data can replay when connectivity returns, and room-level exceedances can trigger dashboards, email tickets, or supervised HVAC and purifier workflows. The strongest near-term use case is not full autonomous control but dependable orchestration of alerts, maintenance tasks, and evidence trails for action.

### Resultados e avaliação

#### Resultados ambientais

A layered data architecture improves environmental management by making room-level trends visible, keeping alerts alive during outages, and preserving the context needed to evaluate interventions such as window opening, purge periods, portable filtration, or HVAC tuning. It also supports better use of outdoor baselines and avoids the common failure mode where dashboards look clean simply because the pipeline dropped data.

#### Saúde e aprendizagem

The architectural layer affects health and learning indirectly but materially. Better data continuity, lower alert latency, and clearer audit trails make it easier for schools to sustain ventilation and comfort improvements that may support symptom reduction, attendance, and classroom conditions. The architecture itself does not create those outcomes, but weak data management can prevent them.

#### Integração objetiva e subjetiva

User experience is a recurring theme in recent architecture papers for good reason. Teachers and facility staff need dashboards and alerts that explain what happened, when, and whether the data are fresh. Subjective feedback about confusing dashboards, delayed updates, or false alarms should be treated as part of system validation because a technically strong pipeline can still fail operationally if users cannot trust or interpret it.

#### Viabilidade e aceitação

Feasibility is high for a modest pilot that uses a few classroom nodes, one gateway, and a simple time-series stack. Acceptance improves when the edge layer reduces visible downtime, when dashboards display freshness and QA clearly, and when the cloud layer supports easy historical comparison without overwhelming staff. The main barriers are not conceptual complexity but maintenance ownership, backup discipline, and aligning the system with real school workflows.

#### Validade e limitações

Many architecture papers demonstrate feasibility but not necessarily long-term institutional sustainability. Some emphasize AI-heavy edge processing that may be unnecessary for a TCC-scale project, while others do not report enough about failures, backup recovery, or schema evolution. The best-supported claims concern resilience and scalability; claims about optimal edge intelligence or universal architecture choices should be treated cautiously because school IT environments differ widely.

#### Contribuições e lacunas

The current literature supports a pragmatic architecture for schools: digital room nodes, local buffering, optional gateways for translation and resilience, time-series storage with explicit metadata, and dashboards that preserve QA and freshness. The main gaps are school-specific benchmarks for edge-versus-cloud tradeoffs, open reference schemas for classroom IEQ pipelines, better evidence on long-term gateway maintenance, and stronger integration between environmental monitoring, building metadata, and institutional maintenance systems.


---

## 15. Dashboards, alertas, regras de decisao e automacao

### Identificação e base bibliográfica

#### Referências utilizadas

- Ge B, Tieskens K, Vyas P, Botana Martinez MP, Yuan Y, Walsh KH, Main L, Bolton L, Yajima M, Fabian MP. Decision tools for schools using continuous indoor air quality monitors: a case study of CO2 in Boston Public Schools. The Lancet Regional Health - Americas. 2025;48:101148.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro M, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Tran QV, Doan DT, Jack N, Ghaffarianhoseini A, Ghaffarianhoseini A, Zhang T. AI Management Platform for Privacy-Preserving Indoor Air Quality Control: Review and Future Directions. Journal of Building Engineering. 2025;100:111712.
- Hashir PK, Veerasingam S, Haris RM, Sadooni F, Ghani S. Artificial Intelligence for Enhancing Indoor Air Quality in Educational Environments: A Review and Future Perspectives. Sustainability. 2025;17(22):10117.
- Godasiaei SH, Ejohwomu OA, Zhong H, Booker D. Integrating experimental analysis and machine learning for enhancing energy efficiency and indoor air quality in educational buildings. Building and Environment. 2025;276:112874.
- Boston Public Schools. Indoor Air Quality Sensor Dashboard and district IAQ information pages. Accessed 2026-08-11.
- USGBC. School District Indoor Air Quality Management Plans Toolkit. 2025.

#### Identificadores e endereços persistentes

- https://doi.org/10.1016/j.lana.2025.101148
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://doi.org/10.3390/s24010148
- https://doi.org/10.3390/s24165129
- https://doi.org/10.1016/j.jobe.2024.111712
- https://www.mdpi.com/2071-1050/17/22/10117
- https://doi.org/10.1016/j.buildenv.2025.112874
- https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality/indoor-air-quality-sensor-dashboard
- https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality
- https://www.usgbc.org/sites/default/files/2025-09/CFGS_School-IAQ-Management-Toolkit-FINAL_0.pdf
- https://school-infrastructure.org/resources/decision-tools-for-schools-using-continuous-indoor-air-quality-monitors-a-case-study-of-co2-in-boston-public-schools-1bd/
- https://www.bu.edu/igs/research/chess/

#### Tipo e composição da evidência

Topic-level evidence synthesis combining peer-reviewed school monitoring studies, IoT platform papers, AI and automation reviews, and operational guidance from live district dashboard programs.

#### Países e condições climáticas

The evidence base is multi-country and multi-climate. It includes Boston Public Schools in the northeastern United States with a cold-humid temperate climate, Portuguese classroom deployments in Atlantic and Mediterranean-influenced settings, and Italian school control concepts in a Mediterranean climate. This matters because alert thresholds, outdoor-baseline handling, window-opening feasibility, and automation trade-offs depend strongly on season, weather, and building type.

### Escopo e método

#### Objetivo e questão de pesquisa

The main objective is to turn continuous classroom IEQ and IAQ sensing into operational action. The recurring research question is not only how to measure CO2, particles, temperature, humidity, and related variables, but how to aggregate them into dashboards, persistence-based alerts, room rankings, maintenance priorities, and in some cases semi-automated or automated ventilation responses that school staff can actually use.

#### Desenho dos estudos

The literature is methodologically mixed. It includes district-scale longitudinal monitoring with decision-support visualizations, multi-room IoT architecture and control concept papers, proof-of-concept school deployments, hardware-focused classroom pilots, and recent reviews of AI-enabled prediction and control. Most evidence is observational or engineering-evaluative rather than randomized.

#### Contexto educacional

The dominant context is K-12 classrooms, with some higher-education spaces used for proof-of-concept and method development. The relevant rooms are densely occupied teaching spaces with recurring schedules, strong room-to-room heterogeneity, and either natural ventilation, central mechanical ventilation, or mixed-mode operation. Dashboards are most useful where facilities teams must triage many rooms rather than inspect one room at a time.

#### Amostra e duração

The strongest operational case study is Boston Public Schools, where 3,659 classroom sensors in 125 buildings generated 245 million CO2 measurements over the 2022-2023 school year. Complementary evidence includes SchoolAIR pilot deployment in university classrooms with proof of concept in a high school in northern Portugal, and Smart Healthy Schools validation in an Italian school. Across the broader educational AI review, the evidence spans twenty real-world case studies from multiple regions.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Dashboards and rule engines most commonly rely on indoor CO2, PM2.5, PM10, air temperature, relative humidity, and where available outdoor baseline measurements. Some programs also track CO, illuminance, environmental noise, occupancy metadata, and building-operation context. For decision support, the most useful derived metrics are time above thresholds, peak events, occupied-period percentiles, recovery after vacancy, and room-to-room comparisons.

#### Condições externas e linha de base

Outdoor context is essential. Boston Public Schools reports a roof-top unit at every school to establish an outdoor baseline per location, and classroom interpretation becomes much more robust when outdoor CO2, particles, and weather are available. Without this context, a dashboard may trigger the wrong action, especially when natural ventilation would import outdoor pollution, noise, heat, or cold.

#### Ocupação e atividade

Dashboards are only meaningful when aligned to classroom schedules and occupancy patterns. Lesson periods, breaks, class turnover, cleaning, gym or lab activities, vocal intensity, and manual overrides all change the signal. A practical rule engine therefore needs occupied-state tagging, timetable integration, or at least an occupied-hour mask so that alerts are based on relevant exposure windows rather than overnight or weekend behavior.

#### Operação da ventilação e filtração

The literature consistently treats windows, doors, HVAC outdoor-air fraction, purge cycles, exhaust operation, and portable filtration as core state variables for decision-making. District operational pages from Boston Public Schools also describe continuous fan operation, pre- and post-occupancy flushing, air purifiers, and thermal-setpoint adjustments. Dashboards are most valuable when they distinguish interventions that affect CO2 through outdoor-air renewal from those that affect particles without reducing CO2, such as HEPA filtration.

#### Granularidade espacial

Room-level sensing is the minimum defensible granularity for operational dashboards because classroom conditions vary substantially within and between schools. A practical architecture is one fixed sensor per regularly occupied classroom plus one outdoor reference per building or campus cluster. Building-level averages are still useful for portfolio oversight, but they can hide high-exposure outlier rooms that drive health, comfort, and maintenance risk.

### Sensores, metrologia e dados

#### Especificações dos sensores

Dashboard and automation programs should be built on true CO2 sensors using NDIR or photoacoustic NDIR, paired with reliable T/RH sensing and either PM2.5 alone or PM1 plus PM2.5 plus PM10 depending on the use case. If noise and light are included, they should be treated as separate IEQ channels rather than folded blindly into IAQ logic. Optional occupancy channels are best added through schedule integration, PIR, or mmWave rather than inferred only from CO2 if the dashboard will trigger strong actions.

#### Calibração e garantia da qualidade

Operational trust depends on QA/QC more than on visualization polish. The recurring good practice is pre-deployment collocation, timestamp control, warm-up handling, documented calibration state, review of flatlines and spikes, outdoor background checks, and explicit management of automatic baseline correction for CO2 sensors. Public-facing dashboards should also surface QA flags so school staff can distinguish poor air conditions from suspect instrumentation.

#### Aquisição e qualidade dos dados

A common pattern is minute-scale collection with 15-minute rolling averages or medians for public display and alerts. Boston Public Schools uses public-facing 15-minute rolling values, while the underlying analytics work from minute-level histories. For school operations, uptime, buffering through outages, clock consistency, and clear treatment of missing data are as important as nominal sensor accuracy because false alerts quickly erode trust.

#### Sensor recomendado por variável

For dashboard-driven school operations, the preferred stack is true CO2 by NDIR or photoacoustic NDIR, direct T/RH sensing, and PM2.5 or PM1 plus PM2.5 optical particle sensing with transparent caveats about aerosol dependence. Add PM10 only as a secondary indicator, lux only if lighting decisions are in scope, calibrated noise metrics only if acoustic management is needed, and direct occupancy metadata if the rules engine depends on occupied-state precision. Avoid eCO2-only sensors for ventilation alerts and avoid treating MOS VOC indexes as equivalent to pollutant concentration limits.

#### Saídas úteis e unidades

The outputs that support decisions best are CO2 in ppm, PM fractions in micrograms per cubic meter, air temperature in degrees C, RH in percent, occupied-time above thresholds in minutes or percent, 15-minute rolling values for public display, and room-level status labels such as normal, warning, or high. If a composite room-priority score is used, the underlying raw units must remain visible.

#### Medição direta ou proxy

A robust dashboard must preserve the distinction between direct measurements and proxies. True CO2, T/RH, PM optical counts and masses, lux, and acoustic levels are direct measured channels, even if some of them require calibration. Ventilation adequacy, infection-risk implication, occupancy inference, room-priority ranking, and maintenance urgency are derived products that depend on assumptions and aggregation rules.

#### Princípio de medição e seletividade

True CO2 should come from selective NDIR or photoacoustic NDIR sensing. PM comes from optical scattering and therefore depends on aerosol composition. T/RH uses mature digital environmental sensing. Lux comes from photopic light sensing and noise from MEMS microphone pressure capture with edge signal processing. Occupancy can be coarse via PIR or finer via mmWave. These principle differences matter because rules should trust selective channels more than broad-response or inferred channels.

#### Faixa útil e desempenho real

For school dashboards, sensors should remain credible from clean-room baseline to severe event conditions rather than merely meet nominal catalog ranges. In Boston Public Schools, the average school-day CO2 concentration was 841 ppm with a standard deviation of 405 ppm and peaks up to 5,080 ppm, so saturation near ordinary action levels would be unacceptable. Public dashboards also need smoothing and persistence logic because perfectly raw high-frequency traces are often too noisy for action.

#### Regime de operação

The preferred regime is always-on room sensing, local buffering, and minute-scale transmission, with edge or cloud aggregation into 15-minute public values and longer analytical windows for trend detection. Alerting should include persistence so that a single spike does not trigger unnecessary action. For automation, control intervals should be long enough to avoid oscillation and short enough to respond during the same occupied period.

#### Interferências e confundidores

Key confounders are poor sensor placement, direct solar exposure, drafts, stratification, changing outdoor baseline, irregular schedules, incomplete occupancy metadata, network outages, and user behavior such as sporadic window opening. A second class of confounder is semantic: users may read a dashboard color as a diagnosis of safety when it is only a screening indicator. This is especially risky when CO2 is used as a proxy for broader IAQ.

#### Protocolo acessível de validação

A practical TCC-scale validation path is to deploy at least two duplicate classroom nodes, collocate them with one better reference per core variable for 7 to 14 days, then run a pilot in one or more classrooms for 2 to 4 weeks with an event log. Validate not only channel accuracy but also alert logic, buffering, time synchronization, and whether recommended interventions actually align with observed room behavior. If automation is added, test the control rules in shadow mode before allowing real actuation.

#### Métricas de validação

Minimum metrics are bias, MAE, RMSE, slope and intercept versus a better reference, uptime, missing-data fraction, false-alert frequency, and latency from threshold exceedance to dashboard update. For decision support, add persistence-hit rates, proportion of alerts that led to a verified intervention, and whether room rankings remain stable when using alternative averaging windows. For automated control, report overshoot, oscillation frequency, and energy or runtime penalty.

#### Instalação e encapsulamento

Classroom monitors should be placed near the breathing zone, away from windows, doors, supply jets, corners, direct breath plumes, and heat-producing electronics. Enclosures should be ventilated and should keep PM inlets, acoustic ports, and thermal sensors functionally exposed. If one node is expected to support dashboarding, alerting, and automation, installation metadata such as room ID, height, orientation, and nearby ventilation features must be recorded because the rule logic depends on them.

#### Integração de hardware

A common architecture is an ESP32- or gateway-linked node with I2C or UART sensors, local flash or SD buffering, and Wi-Fi, LoRaWAN, or other campus connectivity. The integration challenge is less about reading a sensor and more about maintaining synchronized timestamps, stable firmware, retry behavior, and secure uplink to a time-series backend that can feed dashboards, notifications, and maintenance systems.

#### Maturidade da evidência

Evidence maturity is strong for room-level dashboarding, trend visualization, and exposure triage based on continuous sensing, especially for CO2-centered ventilation management. It is moderate for cross-variable alert logic, moderate for district-scale maintenance prioritization, and only low-to-moderate for fully automated classroom actuation that remains robust across seasons and building types. AI-enabled prediction is promising but still less mature than straightforward rules plus transparent visualization.

#### Cuidados específicos por variável

Do not treat CO2 as a complete IAQ score. Do not treat particle alerts without outdoor context as proof of an indoor source. Do not fold proxy variables and direct variables into a single color without exposing uncertainty. Avoid retaining intelligible audio if acoustic channels are used. If occupancy is inferred instead of measured, do not make high-stakes automation depend on that inference alone.

### Arquitetura IoT

#### Arquitetura do sistema

The most defensible architecture is node to campus network to message broker or HTTPS ingestion to time-series database to analytics and rule engine to dashboard and notification layer. Mature versions add outdoor baseline nodes, QA metadata, device-health monitoring, and optional links to BMS or CMMS tools so that a persistent room problem can generate a maintenance workflow rather than remain a graph on a screen.

#### Conectividade e protocolos

Wi-Fi with MQTT or HTTPS is the simplest fit where school infrastructure already exists, while LoRaWAN is attractive for lower-power or harder-to-wire retrofits and is explicitly featured in Smart Healthy Schools. The protocol choice should reflect network policy, reliability, telemetry frequency, and maintenance capacity. Rule execution can live in the cloud, at the edge gateway, or partly on the node depending on latency and resilience requirements.

#### Interoperabilidade e modelo de dados

A useful schema includes timestamp, room ID, school ID, device ID, measured variable, unit, occupied-state tag, QA flag, firmware version, and baseline source. To support automation and maintenance, the same data model should also expose rule outputs such as alert severity, intervention recommendation, acknowledgment state, and work-order linkage. Open JSON or CSV structures are enough for a TCC, but Brick or Haystack style metadata make later institutional scaling easier.

#### Cibersegurança, privacidade e ética

Room-level environmental data can reveal classroom schedules, occupancy habits, and operational weaknesses even when no personal identifiers are stored. Authentication, encrypted transport, device identity control, and role-based access are therefore necessary. If the system includes occupancy sensing, acoustic summaries, or automated control, privacy and governance requirements rise sharply. The safest baseline is no raw audio retention, no camera dependence, and clear disclosure that the system monitors rooms rather than individuals.

### Análise, decisão e automação

#### Métodos analíticos

Typical methods are rolling averages, persistence filters, occupied-period masking, room ranking by exposure burden, anomaly detection, simple forecasting, and intervention tracking. More advanced work adds machine learning for pollutant forecasting, air-exchange estimation, fault detection, and prioritization of maintenance action. In practice, dashboards perform best when the primary analytics stay interpretable and the AI layer remains assistive rather than opaque.

#### Índice ou modelo derivado

A practical derived model is a room-priority score that combines direct measurements, persistence, and context. For example, repeated occupied CO2 exceedance, slow post-class recovery, elevated PM during occupancy, and sustained RH problems can be aggregated into a triage score for facilities teams. More advanced variants can add rebreathed-fraction estimates, infection-risk proxies, or predictive risk horizons, but these should remain secondary overlays rather than hidden replacements for raw signals.

#### Regras de decisão e normas

Operational decision rules should combine threshold values with persistence and context. The 2025 USGBC school IAQ toolkit cites Boston Public Schools using CO2 above 2,000 ppm as high on a 15-minute average and RH above 60 percent as high on a 15-minute average, while other districts cite lower aspirational CO2 bands such as below 1,200 ppm for proper ventilation and cognitive support. A robust classroom rule library therefore uses traffic-light bands, persistence windows, occupied-state filtering, and variable-specific comments instead of pretending one universal threshold applies everywhere.

#### Intervenção e automação

The most common interventions are manual or supervised: open windows when outdoor air is favorable, increase outdoor-air delivery, extend purge cycles, dispatch maintenance, move portable HEPA units, or change room use. Automation is possible at several levels: notify the teacher, trigger the building operator, adjust windows or HVAC setpoints, or run predictive control based on expected occupancy and weather. Current evidence supports simple supervised automation more strongly than fully autonomous actuation in ordinary school portfolios.

### Resultados e avaliação

#### Resultados ambientais

The clearest environmental outcome is earlier detection of problematic rooms and more defensible prioritization of ventilation or filtration actions. Boston Public Schools used classroom-level visualizations to identify high-exposure rooms, and district materials report public transparency and operational changes linked to monitoring. Across the literature, dashboards and alerts improve observability first, and improvements in IEQ follow when the organization has the capacity to act on that observability.

#### Integração objetiva e subjetiva

Measured data and human perception should be used together but not treated as equivalent. School studies already show that teacher perception does not always match monitored conditions. Dashboards therefore benefit from simple annotation channels for stuffiness, unusual noise, or thermal discomfort, while still grounding decisions in measured trends and QA-screened data.

#### Resultados quantitativos

The most policy-relevant quantitative result is from Boston Public Schools: 3,659 classroom sensors across 125 buildings produced 245 million CO2 measurements during the 2022-2023 school year, with an average school-day CO2 of 841 ppm, a standard deviation of 405 ppm, and daily peaks up to 5,080 ppm. USGBC district materials also report that measured classroom CO2 concentrations were below 1,000 ppm about 75 percent of the time during school hours on average in that program. These numbers show both the scale of modern school dashboarding and the need for room-level triage rather than one building average.

#### Viabilidade e aceitação

Feasibility is high for traffic-light dashboards and moderate for multi-variable alerting tied to maintenance workflow. Acceptance is best when alerts map cleanly to concrete actions and when staff can see that the system improves room conditions rather than audits individual behavior. The biggest organizational barriers are weak metadata, unplanned maintenance workload, and unclear ownership of alert response, not the existence of low-cost sensors.

#### Validade e limitações

Dashboards compress a complex indoor environment into human-actionable cues, which is exactly their strength and their limitation. Thresholds may not transfer across climates, ventilation modes, or school policies. Raw sensor uncertainty, smoothing windows, occupancy assumptions, and missing outdoor context can all distort alert meaning. Any automation layer must therefore remain transparent about its assumptions and should fail safely when data quality drops.

#### Contribuições e lacunas

The literature now supports a practical pathway from school sensing to action: room-level monitoring, baseline-aware dashboards, persistence-based alerts, and explicit mapping from alerts to facilities or ventilation actions. The main gaps are standardized school alert libraries, better cross-variable fusion rules, stronger interoperability with BMS and maintenance systems, and outcome studies that quantify how much monitoring plus dashboarding actually improves ventilation equity, comfort, health, and educational performance.


---

## 16. Indices compostos de IEQ/IAQ e ferramentas de decisao

### Identificação e base bibliográfica

#### Referências utilizadas

- Tran MT, Wei W, Dassonville C, Martinsons C, Ducruet P, Mandin C, Hequet V, Wargocki P. Review of Parameters Measured to Characterize Classrooms' Indoor Environmental Quality. Buildings. 2023;13(2):433.
- Wargocki P, Wei W, Bendzalova J, Espigares-Correa C, Gerard C, Greslou O, Rivallain M, Sesana MM, Olesen BW, Zirngibl J, Mandin C. TAIL, a new scheme for rating indoor environmental quality in offices and hotels undergoing deep energy renovation (EU ALDREN project). Energy and Buildings. 2021;244:111029.
- Tran MT, Wei W, Dassonville C, Martinsons C, Ducruet P, Derbez M, Mandin C, Hequet V, Wargocki P. Expanding the application of the TAIL rating scheme to schools: schoolTAIL. Energy and Buildings. 2026;354:116942.
- Zhang D, Mui KW, Wong LT. Ten Questions Concerning Indoor Environmental Quality (IEQ) Models: The Development and Applications. Applied Sciences. 2023;13(5):3343.
- Mujan I, Licina D, Kljajic M, Culic A, Andjelkovic AS. Development of indoor environmental quality index using a low-cost monitoring platform. Journal of Cleaner Production. 2021;312:127846.
- Lopez Carreno RD, Pardo-Bosch F, Aidarov S, Boix-Cots D, Pujadas P. A Simplified Classroom Indoor Air Quality Risk Index: Application in the Mediterranean Region to Support the Enhanced Design of Educational Environments. Applied Sciences. 2025;15(7):4033.
- Loreto Falone A, et al. Field Measurements of Indoor Environmental Quality in School Classrooms: A Systematic Review. Applied Sciences. 2025;15(10):5692.
- Natividad CA, Opon J. Sustainability-Qualified IEQ Indicators for Academic Buildings: A Systematic Review (2010-2025) and SDG-Aligned Framework. Sustainability. 2026;18(9):4260.
- CSTB. Indoor Environmental Quality Indexes. Published 2024-01-10.

#### Identificadores e endereços persistentes

- https://doi.org/10.3390/buildings13020433
- https://doi.org/10.1016/j.enbuild.2021.111029
- https://doi.org/10.1016/j.enbuild.2026.116942
- https://doi.org/10.3390/app13053343
- https://doi.org/10.1016/j.jclepro.2021.127846
- https://doi.org/10.3390/app15074033
- https://www.mdpi.com/2076-3417/15/10/5692
- https://doi.org/10.3390/su18094260
- https://www.cstb.fr/en-us/all-the-news/indoor-environmental-quality-indexes
- https://orbit.dtu.dk/en/publications/review-of-parameters-measured-to-characterize-classrooms-indoor-e/
- https://orbit.dtu.dk/en/publications/tail-a-new-scheme-for-rating-indoor-environmental-quality-in-offi/
- https://orbit.dtu.dk/en/publications/expanding-the-application-of-the-tail-rating-scheme-to-schools-sc/

#### Tipo e composição da evidência

Topic-level evidence synthesis combining classroom IEQ reviews, composite-index methodology papers, school-specific index adaptation studies, and decision-support framing documents.

#### Países e condições climáticas

The composite-index literature is geographically broad rather than tied to one climate. The classroom-specific evidence used to justify parameters is concentrated in Europe and North America, while recent academic-building reviews expand the geography further. Climate matters because threshold interpretation, weighting, and remediation priority differ between cold, warm, humid, naturally ventilated, and mechanically ventilated settings, even when the index structure is nominally the same.

### Escopo e método

#### Objetivo e questão de pesquisa

The central objective is to reduce a multi-dimensional indoor environment into a decision-support representation that remains technically defensible. The key research question is how to combine thermal, acoustic, visual, and air-quality indicators into a composite IEQ or IAQ score, class, or risk index without hiding uncertainty, context, and variable-specific meaning. In schools, a second question is whether such tools can prioritize remediation and communicate conditions better than raw dashboards alone.

#### Desenho dos estudos

The evidence is mainly methodological and review-based. It includes parameter reviews, conceptual and applied index-development papers, feasibility demonstrations in real buildings, school-specific adaptations of existing schemes, and general reflections on IEQ model construction, weighting, aggregation, and communication. The dominant designs are literature review, analytical framework development, and retrospective application to measured datasets.

#### Contexto educacional

The school-relevant index literature targets ordinary classrooms in primary and secondary education, with some related evidence from higher-education and broader academic-building environments. The most mature school-specific tool identified in this research set is schoolTAIL, which explicitly adapts a pre-existing IEQ rating scheme to school use. Other tools remain classroom IAQ-specific, building-type generic, or prototype decision frameworks rather than routine institutional standards.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

Across the literature, the composite IEQ core is stable: thermal conditions, indoor air quality, acoustic conditions, and luminous or visual conditions. Classroom-specific additions include reverberation time and nitrogen dioxide in schoolTAIL, while IAQ-focused indices narrow the scope to pollutants and ventilation-related variables such as CO2, PM2.5, PM10, and context-specific gaseous pollutants. The main design decision is whether the tool is a full IEQ index, an IAQ risk index, or a decision aid tied to one intervention question.

#### Condições externas e linha de base

Good index design needs an explicit stance on outdoor context. Full IEQ indices often emphasize indoor state and standards compliance, but classroom interpretation improves when weather, outdoor pollution, and background CO2 are treated as explanatory context or as part of the remediation logic. Without this, a low score may identify a problem without distinguishing whether the dominant driver is outdoor burden, indoor source strength, building operation, or occupancy behavior.

#### Ocupação e atividade

Occupants shape both the signal and the meaning of a composite index. Classroom density, schedule, age group, teaching activity, voice use, and adaptation behaviors such as window opening affect air quality, acoustics, and comfort simultaneously. Yet many composite tools remain primarily objective and physical, which is one reason the literature keeps returning to questions of weighting and whether occupant perception should modify or complement index scores.

#### Operação da ventilação e filtração

Ventilation is central to IAQ-oriented indices and strongly relevant to full IEQ indices, but it is usually represented indirectly through measured outcomes such as CO2, particles, or thermal state rather than as a direct scored variable. This makes the index useful for triage but can weaken causal interpretation if filtration, outdoor pollution episodes, or occupant window behavior are not separately documented. Decision-support tools improve when they expose which remediation lever is implied by the score.

#### Granularidade espacial

Most school-oriented indices are interpreted at classroom or room level, even when the final output is rolled up for a school or building portfolio. That granularity is appropriate because classroom heterogeneity is large and remediation decisions are often room-specific. Portfolio-level indices are still useful for benchmarking and prioritization, but they should be traceable back to room-level components so the user can see which dimension is driving the score.

### Sensores, metrologia e dados

#### Especificações dos sensores

Composite IEQ tools do not depend on one hardware brand, but they do depend on obtaining credible measurements for each component. The practical requirement is selective or well-characterized sensing for the most influential channels: true CO2 for ventilation-related IAQ, defensible T/RH for thermal conditions, appropriate acoustic measurements such as noise and reverberation time, illuminance or related visual indicators, and pollutant channels justified by child-health or local building concerns such as PM2.5 or NO2.

#### Calibração e garantia da qualidade

Index quality is limited by input quality. The classroom review literature shows that no unique standardized measurement method has been used across studies, with inconsistency in duration, location, and reporting. This means any composite score should document calibration state, measurement protocol, sensor limitations, and data cleaning steps explicitly. SchoolTAIL is strong precisely because it starts from parameter choice and threshold classes rather than pretending the measurement layer is already standardized.

#### Aquisição e qualidade dos dados

For index applications, minute-level acquisition is not always necessary, but consistent temporal aggregation is necessary. A decision-support score should define whether it represents spot conditions, occupied-hour averages, percentile behavior, daily exceedance burden, or longer seasonal summaries. Missing-data handling, QA flags, smoothing rules, and component-specific aggregation windows should be fixed before weighting and scoring, otherwise the index becomes unstable and non-comparable.

#### Sensor recomendado por variável

For school IEQ decision tools, recommend true CO2 by NDIR or photoacoustic NDIR for ventilation-related IAQ, direct T/RH sensing for thermal conditions, optical PM sensing for PM2.5 with caution on PM10, calibrated acoustic measurement including noise and, where possible, reverberation time, and photopic illuminance sensing for visual conditions. Add NO2 only where traffic or combustion relevance justifies it, following the logic used in schoolTAIL. This variable set aligns with the strongest school-specific evidence for composite assessment.

#### Saídas úteis e unidades

The most defensible outputs are a combination of raw variables and a structured summary. Raw outputs remain CO2 in ppm, temperature in degrees C, RH in percent, PM in micrograms per cubic meter, noise in dBA, reverberation time in seconds, and illuminance in lux. The composite layer can then express these as a class, ordinal level, color code, risk score, or component scorecard, but the raw units must remain visible for diagnosis and action.

#### Medição direta ou proxy

A critical design rule from the model literature is to avoid confusing direct observations with inferred constructs. Thermal and acoustic indicators can be directly measured, while comfort, acceptability, and remediation priority are interpretations. CO2 is directly measured but ventilation adequacy is inferred; PM is measured optically but exposure significance is contextual; and a composite IEQ score is always a constructed proxy for overall indoor quality, not an independent physical quantity.

#### Princípio de medição e seletividade

Measurement principles should be chosen to match the role of each component in the index. True CO2 should use selective NDIR or photoacoustic methods, PM relies on optical scattering and therefore needs caution, thermal metrics depend on stable T/RH sensing, and acoustic and visual indices require measurement plans that reflect how classrooms are actually used. The schoolTAIL additions of reverberation time and NO2 are important because they improve selectivity for communication quality and child-relevant pollution burden.

#### Faixa útil e desempenho real

Composite tools should be built around the range where decisions are made, not the nominal maximum range of instruments. School-focused indices need to discriminate ordinary but important classroom variation rather than only detect extreme failures. That means sensitivity around occupied CO2 bands, persistent PM2.5 elevation, thermal discomfort windows, poor acoustics, and inadequate illuminance is more valuable than impressive headline ranges that are rarely reached in real teaching spaces.

#### Regime de operação

The operating regime depends on the purpose of the index. Real-time dashboards may compute rolling component scores continuously, while portfolio benchmarking may run daily, weekly, or seasonal summaries. A useful classroom tool should at least distinguish occupied from unoccupied periods and should avoid scoring startup transients or short sensor anomalies. If the score is used for operational intervention, refresh frequency and persistence logic should be clearly defined.

#### Interferências e confundidores

The main methodological confounders are weighting choices, compensation effects between components, non-comparable measurement protocols, and hidden assumptions about what counts as acceptable. A room with mediocre scores in all domains may be ranked differently from a room with one severe IAQ problem and otherwise good comfort, depending entirely on aggregation logic. That is why the literature repeatedly stresses transparency of indicator selection, thresholds, and weighting rules.

#### Protocolo acessível de validação

A low-cost validation path for a school IEQ or IAQ index is to validate the component channels first, then validate the index behavior second. First, run short collocation and protocol checks for the core variables. Second, compute the index on a few representative classrooms and test whether the ranking agrees with expert judgment, occupant complaints, and obvious room differences. Third, perform simple sensitivity analysis by changing weights or thresholds to see whether the prioritization is stable enough for decision use.

#### Métricas de validação

Component-level metrics should include the usual bias, MAE, RMSE, slope, intercept, and uptime where sensors are involved. Index-level metrics should include rank stability, sensitivity to weights and thresholds, agreement with expert or auditor classification, percentage of rooms reclassified by protocol choices, and whether the tool supports consistent remediation priority. For risk indices, confusion between categories should be reported rather than only one global score.

#### Instalação e encapsulamento

Because the index is downstream from measurement, the installation plan should follow the needs of the dominant components. Classroom nodes should be placed at representative room locations and heights, while acoustic and illuminance assessment may require more deliberate protocols than a single fixed environmental monitor. If one composite score is intended, the installation metadata must be detailed enough to justify that the contributing measurements are representative of the same occupied environment.

#### Integração de hardware

Hardware integration for composite tools is straightforward when they are built on an existing classroom monitoring stack. The main requirement is that all channels share synchronized timestamps, stable metadata, and reproducible preprocessing so the index is computed on comparable inputs. If the tool mixes measurements, simulation, and visual observation as TAIL does, the software layer must store the provenance of each component rather than treating every input as equivalent sensor data.

#### Maturidade da evidência

Evidence maturity is moderate for the general idea of composite IEQ and IAQ decision tools, high for the need to assess multiple IEQ dimensions jointly, and still evolving for school-specific operational deployment. TAIL is a mature and well-documented methodological foundation, schoolTAIL is a strong recent school adaptation, and IAQ-only classroom risk indices are emerging. The weakest point remains external validation across climates, pedagogies, and institutional workflows.

#### Cuidados específicos por variável

A composite score can hide the very variable that requires urgent action. CO2 can dominate user attention even when particles, NO2, noise, or reverberation are the more important classroom issue. PM10 from compact sensors should be treated cautiously, subjective comfort should not be confused with pollutant burden, and weighting schemes copied from offices may not transfer cleanly to children and teaching activities. The score should therefore be read as a decision aid, not as a complete diagnosis.

### Arquitetura IoT

#### Arquitetura do sistema

A useful architecture for composite decision tools is raw classroom sensing plus metadata storage plus a transparent scoring layer plus a visualization layer that shows both components and total class. The scoring engine should store the chosen thresholds, weights, aggregation rules, and versioning so that a room score can be reproduced later. If remediation planning is in scope, the architecture should also map low-scoring components to recommended actions rather than just to a numeric grade.

#### Conectividade e protocolos

There is no special protocol requirement for index computation beyond reliable collection of the component variables. Wi-Fi, LoRaWAN, MQTT, HTTPS, and ordinary time-series storage are all compatible. The more important architectural requirement is schema stability so that the same index can be recomputed after software changes or across multiple schools without ambiguity in units, occupied-state handling, or QA flags.

#### Interoperabilidade e modelo de dados

The data model should keep component variables, contextual metadata, and composite outputs separate. At minimum it should encode room ID, time window, variable, unit, preprocessing status, threshold set, index version, component score, and overall score or class. For methods like TAIL and schoolTAIL, the model should also support mixed input types such as measurement, observation, and simulation. This separation is essential for explainability and auditability.

#### Cibersegurança, privacidade e ética

Composite IEQ tools usually pose less privacy risk than camera-heavy occupancy systems, but they still influence decisions about room quality, maintenance urgency, and institutional reputation. Governance matters because a low score can trigger public concern or resource allocation consequences. Ethical use therefore requires transparent methods, cautious communication, and avoidance of false precision, especially when school scores may shape investment priorities across unequal campuses.

### Análise, decisão e automação

#### Métodos analíticos

The core analytical tasks are indicator selection, threshold definition, normalization, weighting, aggregation, sensitivity analysis, and visualization. TAIL and schoolTAIL explicitly operationalize multi-domain classification with color and Roman-numeral classes, while low-cost monitoring platforms and IAQ risk indices show how continuous sensor data can feed dynamic scoring. The model literature also emphasizes that validation and interpretability are not optional extras; they are part of the method.

#### Índice ou modelo derivado

A composite IEQ or IAQ index is itself the main derived model. TAIL rates thermal, acoustic, indoor-air, and luminous environments and then combines them into an overall IEQ class. SchoolTAIL retains this structure but adds reverberation time and NO2 and updates PM2.5 classes to align with the 2021 WHO guidelines. IAQ-specific classroom tools narrow the focus and can be used when the decision problem is ventilation and pollution risk rather than overall classroom environmental quality.

#### Regras de decisão e normas

The strongest decision-support schemes in this set derive their classes from explicit standards and guideline references rather than arbitrary cutoffs. TAIL relies primarily on EN-16798-1 and WHO air-quality guidelines, and schoolTAIL updates PM2.5 quality classes and adds school-relevant parameters to strengthen classroom applicability. CSTB also frames index construction in three steps: choose relevant fields and thresholds, define aggregation rules, and define a result display paired with recommended actions. This is a sound blueprint for any classroom decision tool.

#### Intervenção e automação

Composite tools are most defensible as prioritization and communication aids rather than as fully automated controllers. Their strongest use is to identify whether a classroom needs ventilation improvement, acoustic treatment, shading or lighting change, filtration, or broader renovation. Automation can consume component scores as inputs, but direct actuation should still rely on the underlying measured variables because a single overall score is too coarse to control building systems safely.

### Resultados e avaliação

#### Resultados ambientais

The direct outcome of a good composite tool is clearer prioritization of IEQ problems across rooms or schools. SchoolTAIL explicitly demonstrated feasibility for identifying potential problems and prioritizing IEQ remediations in 308 French schools, while TAIL showed that a structured rating can discriminate IEQ levels across different buildings. The environmental benefit comes when this prioritization results in targeted interventions rather than passive reporting.

#### Integração objetiva e subjetiva

One of the unresolved model questions is how objective measurements should interact with subjective experience. Many IEQ tools are still heavily objective, but the broader literature shows that satisfaction and adaptation do not always align with standards-based thresholds. The best current practice is to keep measured component scores primary while allowing occupant feedback, complaints, or comfort surveys to contextualize or challenge the interpretation.

#### Validade e limitações

The main validity challenge is that every composite tool encodes judgment. Indicator choice, thresholds, normalization, and weighting all affect the result. Compensation between domains can mask severe single-variable failures, and school transferability is limited when the model was calibrated or conceptualized for other building types or climates. The safest use is decision support with transparent components, not replacement of the raw measurement record.

#### Contribuições e lacunas

The most important current contribution is that the field has moved from generic calls for holistic IEQ toward actual school-adapted decision tools. TAIL provides a rigorous multi-domain foundation, schoolTAIL shows how to adapt it to classrooms, and newer IAQ risk tools and sustainability-oriented frameworks expand the design space. The main gaps are stronger school-side validation, explicit treatment of uncertainty and equity, better integration of subjective response, and longitudinal evidence that composite scoring changes remediation choices and outcomes more effectively than simpler room-level dashboards.


---

## 17. Saude, conforto, cognicao e aprendizagem

### Identificação e base bibliográfica

#### Referências utilizadas

- Brink HW, Loomans MGLC, Mobach MP, Kort HSM. Classrooms' indoor environmental conditions affecting the academic achievement of students and teachers in higher education: a systematic literature review. Indoor Air. 2021;31(2):405-425.
- Grassie D, Milczewska K, Renneboog S, Scuderi F, Dimitroulopoulou S. Impact of Indoor Air Quality, Including Thermal Conditions, in Educational Buildings on Health, Wellbeing, and Performance: A Scoping Review. Environments. 2025;12(8):261.
- Dedesko S, Pendleton J, Young AS, Coull BA, Spengler JD, Allen JG. Associations between indoor air exposures and cognitive test scores among university students in classrooms with increased ventilation rates for COVID-19 risk management. Journal of Exposure Science & Environmental Epidemiology. 2025;35(4):661-671.
- Afifi S, Kamel T, Ezzeldin S. Indoor environmental quality assessment of naturally-ventilated school classrooms within a dense arid urban setting of Cairo, Egypt. Scientific Reports. 2025;15:16245.
- Pellegatti M, Visentin C, Torresin S, Babich F, Wargocki P, Prodi N. Combined and cross-modal effects of acoustic and indoor air quality conditions on sensory and cognitive responses of university students. Building and Environment. 2026;288:114005.
- US Environmental Protection Agency. How Does Indoor Air Quality Impact Student Health and Academic Performance? Accessed August 11, 2026.
- US Environmental Protection Agency. A Guide to Siting and Installing Air Sensors. Last updated January 7, 2026.
- US Environmental Protection Agency. Air Sensor Use and Study Design. Last updated April 20, 2026.

#### Identificadores e endereços persistentes

- https://doi.org/10.1111/ina.12745
- https://doi.org/10.3390/environments12080261
- https://doi.org/10.1038/s41370-025-00770-6
- https://doi.org/10.1038/s41598-025-98602-y
- https://doi.org/10.1016/j.buildenv.2025.114005
- https://www.epa.gov/iaq-schools/how-does-indoor-air-quality-impact-student-health-and-academic-performance
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.epa.gov/air-sensor-toolbox/air-sensor-use-and-study-design

#### Tipo e composição da evidência

Topic-level evidence synthesis combining systematic and scoping reviews, classroom field studies, controlled cognitive-performance studies, and official technical guidance.

#### Países e condições climáticas

The evidence spans higher-education and school settings in Europe, the United States, and North Africa. Climate contexts include temperate, mixed, and hot-arid school environments, which matters because thermal stress, window-opening behavior, outdoor pollution, and acoustic trade-offs vary strongly by season and building type.

### Escopo e método

#### Objetivo e questão de pesquisa

The central objective is to determine how classroom indoor environmental quality affects comfort, health, cognition, and learning, and how an IoT monitoring system can translate that evidence into actionable room-level decisions. The practical research question is not whether one isolated variable matters, but how ventilation, temperature, noise, light, and pollutant exposure jointly shape symptoms, attention, perceived comfort, and academic performance.

#### Desenho dos estudos

The evidence base is mixed. It includes a systematic literature review, a 2025 scoping review focused on health, wellbeing, and performance, observational school studies, a survey-based elementary-school field study, and controlled or quasi-controlled university classroom studies that pair continuous sensing with cognitive tasks.

#### Contexto educacional

Evidence covers elementary schools, naturally ventilated classrooms, and higher-education lecture rooms. The most relevant contexts for a TCC on classroom monitoring are densely occupied teaching spaces with variable ventilation, intermittent thermal stress, fluctuating acoustic conditions, and a need to connect objective environmental data with student and teacher experience.

#### Amostra e duração

Sample sizes and durations vary widely across the literature. The Cairo field study covered five classrooms in five schools and analyzed questionnaire responses from 123 fifth-grade students across key months of the school year. The Dedesko 2025 university study analyzed 54 students over the 2022-2023 academic year using post-class cognitive tests paired with continuous classroom monitoring. The Pellegatti 2026 laboratory-classroom study exposed 29 university students to two CO2 regimes and four acoustic conditions. Review papers synthesize evidence across dozens of prior studies and multiple educational levels.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

The variables most consistently linked to comfort, cognition, and learning are true indoor CO2 in ppm, air temperature in degrees Celsius, relative humidity in percent, PM2.5 in micrograms per cubic meter, noise exposure in dBA, illuminance in lux, and contextual variables such as occupancy and ventilation mode. Useful derived indicators include time above occupied-period CO2 bands, overheating duration, thermal-comfort excursions, high-noise event frequency, and room-level IEQ composite summaries.

#### Condições externas e linha de base

Outdoor temperature, humidity, traffic pollution, wind, solar gains, and background noise are major modifiers of classroom outcomes. They influence whether opening windows improves or worsens total conditions, and they affect the interpretation of indoor CO2, particles, heat stress, and sound intrusions. For learning-related analysis, outdoor baselines are especially important when indoor concentrations are used as a proxy for ventilation adequacy.

#### Ocupação e atividade

Occupancy density, lesson timing, class turnover, vocal intensity, sedentary versus active teaching, and seating position alter the exposure profile. The literature shows that crowded or poorly ventilated teaching periods create the clearest CO2 and stale-air signatures, while student complaints and comfort votes are also shaped by seat location, proximity to windows, and exposure to corridor or playground noise.

#### Operação da ventilação e filtração

Natural ventilation, mixed-mode operation, and mechanical ventilation produce different trade-offs between air freshness, heat, and noise. Higher outdoor-air ventilation is generally associated with lower CO2 and better cognitive outcomes, but open-window strategies can import outdoor noise or heat. Portable filtration can lower particle exposure, but it does not solve excess CO2 or overheating on its own.

#### Granularidade espacial

Room-level monitoring is the minimum defensible unit because school or building averages hide important classroom differences. A single well-sited node can support routine screening, but spatial heterogeneity matters near windows, doors, teacher stations, and noisy façades. For larger or irregular rooms, a second node or periodic spot mapping improves representativeness.

### Sensores, metrologia e dados

#### Especificações dos sensores

A practical health-and-learning monitoring stack is: true CO2 by NDIR or photoacoustic NDIR, temperature and relative humidity by a stable digital T/RH sensor, PM2.5 by an optical particle sensor with humidity-aware correction, noise by a calibrated sound-level path reporting LAeq in dBA, and illuminance by a photometric lux sensor. If occupancy context is needed, prefer schedule integration or privacy-preserving presence/counting instead of identity-bearing sensing.

#### Calibração e garantia da qualidade

QA/QC is critical because weak siting or drift can erase the value of otherwise good studies. Pre-deployment co-location, synchronized timestamps, warm-up handling, documented firmware versions, post-deployment spot rechecks, and explicit treatment of missing data are all necessary. Noise and lux channels also need placement checks so that they reflect the student experience rather than a local artifact such as a projector, window beam, or HVAC vent.

#### Aquisição e qualidade dos dados

Continuous logging at 1 to 5 minute intervals is appropriate for most classroom operations and for many exposure-response analyses. Research-grade work benefits from 1 minute resolution for CO2 dynamics, overheating events, and noisy periods. Completeness, uptime, startup transients, anomalous spikes, and event annotation should be reported because learning-related metrics are sensitive to data gaps during occupied periods.

#### Sensor recomendado por variável

For a classroom health-and-learning deployment, recommend true CO2 by NDIR, T/RH by a stable digital sensor, PM2.5 by a field-corrected optical sensor, sound exposure as LAeq rather than raw audio, and illuminance in lux over the desk zone. Optional variables such as VOC index or coarse presence can be useful, but the core evidence base is strongest for CO2, thermal variables, particles, noise, and light.

#### Saídas úteis e unidades

The most useful outputs are CO2 in ppm, temperature in degrees Celsius, relative humidity in percent, PM2.5 in micrograms per cubic meter, LAeq in dBA, illuminance in lux, occupied-period averages and peaks, time above thresholds, and simple room-level IEQ flags. For analysis, it is usually better to work with occupied-period exposure summaries than all-day means.

#### Medição direta ou proxy

CO2, temperature, RH, PM2.5, dBA, and lux are direct physical measurements when obtained from appropriate instruments. Ventilation adequacy, airborne-infection implications, cognitive burden, comfort, and learning quality are derived constructs. The strongest interpretations are those that keep this distinction explicit and avoid treating a single variable as a complete explanation for learning outcomes.

#### Princípio de medição e seletividade

Selectivity matters. True CO2 should come from NDIR-class sensing rather than eCO2 proxies. PM2.5 from optical scattering needs correction for humidity and aerosol composition. Noise should be reported as standardized acoustic metrics instead of raw microphone streams. Lux sensing should reflect photometric response rather than arbitrary light intensity counts.

#### Faixa útil e desempenho real

The relevant classroom operating range is roughly outdoor-background to 2,000 ppm or more for CO2, about 18 to 32 degrees Celsius for occupied thermal analysis, 20 to 80 percent RH, PM2.5 from low single digits to unhealthy excursions, normal classroom acoustics from quiet study to disruptive speech or corridor noise, and daylight-to-artificial-light transitions across the school day. Real field performance depends less on nominal range than on drift, siting, and whether the sensor remains interpretable under occupancy-driven dynamics.

#### Regime de operação

Continuous occupied-period monitoring is preferable to spot checks. One-minute sampling supports event detection and exposure-response work; five-minute sampling is acceptable for dashboards and alerts. Warm-up behavior, averaging windows, and whether the sensor runs continuously or in duty-cycled bursts should be documented because they affect short peaks and decay analyses.

#### Interferências e confundidores

Confounders include poor sensor placement, direct solar load, self-heating, outdoor pollution episodes, changing occupancy, variable teaching style, seat location, maintenance problems, and social factors that also influence academic performance. The reviews consistently warn that the relationship between IEQ and learning is real but not perfectly isolable from socioeconomic, pedagogical, and building-quality confounders.

#### Protocolo acessível de validação

A feasible TCC protocol is to co-locate all candidate nodes for 7 to 14 days with at least one better-characterized reference monitor, then deploy them in classrooms with documented height, location, and room metadata. Pair the measurements with short occupant comfort surveys and lesson schedules. For one or two rooms, run targeted decay or event studies to validate that alerts correspond to real ventilation, heat, or noise problems.

#### Métricas de validação

Report variable-specific bias, MAE, RMSE, slope and intercept versus the reference, inter-sensor agreement, uptime, missing-data fraction, and false-alert rate. For health-and-learning analysis, also report agreement between objective alerts and subjective dissatisfaction, as well as the repeatability of occupied-period exposure metrics across days.

#### Instalação e encapsulamento

Install sensors in the occupied zone, away from direct breath plumes, strong drafts, windows, doors, direct sunlight, loud point sources, and hot electronics. Use vented enclosures, protect particle inlets from blockage, and keep sound-level and lux sensors exposed in a way that reflects the student environment rather than the inside of the box.

#### Integração de hardware

ESP32-class MCUs, local buffering, mains power, and secure timestamped uploads are adequate for a pilot deployment. The key integration requirement is not raw compute, but stable always-on operation, synchronized clocks, labeled room metadata, and the ability to keep monitoring alive during short network outages.

#### Maturidade da evidência

Evidence maturity is high for the claim that classroom IEQ influences comfort and perceived learning conditions, moderate to high for ventilation and thermal conditions affecting cognitive performance and attendance-related outcomes, and moderate for multi-domain interaction effects. Strong causal claims remain harder where multiple environmental stressors and non-environmental confounders coexist.

#### Cuidados específicos por variável

Do not treat CO2 as a full IAQ score, temperature as a full comfort diagnosis, or perception alone as ground truth. Noise should be measured as sound exposure, not by storing conversations. Light should be assessed at the task plane, not only near windows. Multi-domain effects matter: an intervention that improves one variable can worsen another, such as opening windows to reduce CO2 while increasing noise or heat.

### Arquitetura IoT

#### Arquitetura do sistema

A defensible architecture is classroom node to campus network or gateway to time-series storage and dashboards that summarize occupied-period exposure, comfort risk, and response history. The system should support room-level drill-down, daily summaries, and intervention logging so that changes in ventilation, layout, shading, or scheduling can be linked to environmental outcomes.

#### Conectividade e protocolos

Wi-Fi with MQTT or HTTPS is the simplest pilot path where school networking exists. LoRaWAN can work for retrofits or multi-building coverage with low bandwidth. The protocol choice should prioritize reliability, timestamp integrity, and maintainable operations over novelty.

#### Interoperabilidade e modelo de dados

Each record should include timestamp, room ID, sensor ID, variables with units, occupancy context if known, QA flags, and intervention metadata. A clean room-level schema is important because later analyses need to link environmental exposures with schedules, survey responses, and room characteristics without rebuilding the data model.

#### Cibersegurança, privacidade e ética

The health-and-learning topic can be studied with low privacy risk if monitoring remains environmental and room-level. Risks rise when data are linked to identifiable students, attendance, or raw audio/video. Governance should therefore minimize personal data, clarify who can view room-level dashboards, and prevent the system from becoming an instrument of behavioral surveillance.

### Análise, decisão e automação

#### Métodos analíticos

The literature uses descriptive time series, occupied-period summaries, mixed-effects models, exposure-response analysis, survey integration, multi-domain comparison, and occasional composite IEQ scoring. For a TCC, explainable methods such as threshold exceedance, daily exposure summaries, and room ranking are usually more useful than opaque machine learning.

#### Índice ou modelo derivado

Useful derived constructs include excess CO2 above outdoor baseline, overheating duration, time above noise or light inadequacy bands, rebreathed-fraction proxies, and composite IEQ indices that combine air, thermal, acoustic, and visual dimensions. These indices should remain transparent about weighting assumptions and should never hide the underlying variable traces.

#### Regras de decisão e normas

Operational decision rules should combine official guidance and pragmatic action bands. Examples include repeated occupied-period CO2 peaks above about 1,000 ppm, persistent heat discomfort above operational comfort bands, PM2.5 excursions that suggest poor filtration or ingress, and sustained disruptive noise during teaching periods. Standards and guidance from EPA, ASHRAE comfort practice, and classroom acoustics and lighting guidance should inform thresholds, but site-specific interpretation remains necessary.

#### Intervenção e automação

Promising interventions include source control, better window or HVAC operation, portable filtration for particle-heavy rooms, shading and cooling adjustments, classroom layout changes, acoustic treatment, and simple feedback dashboards. Automation should stay interpretable, for example by issuing ventilation or thermal alerts, rather than trying to infer learning quality directly from sensors.

### Resultados e avaliação

#### Resultados ambientais

The main environmental outcomes are lower and more stable CO2, fewer thermal excursions, reduced particle exposure, better lighting adequacy, and fewer disruptive noise periods. Dense classroom monitoring also exposes inequity between rooms, floors, façades, and ventilation types, which is often invisible in building-level averages.

#### Saúde e aprendizagem

The strongest pattern across the evidence is that better classroom IEQ supports lower symptom burden, better comfort, improved attention or cognitive test performance, and lower absenteeism risk. The Dedesko 2025 study found statistically significant evidence that lower classroom CO2 was associated with higher cognitive test scores over roughly 440-1630 ppm. Reviews and guidance also link poor moisture control, inadequate ventilation, overheating, and pollutant exposure with asthma burden, fatigue, discomfort, and weaker academic performance.

#### Integração objetiva e subjetiva

Objective and subjective data should be interpreted together. The Cairo study shows that student experience captures real comfort and attention differences, including seat-location effects, but subjective responses alone can miss hidden exposure patterns. Short student and teacher surveys are therefore best used as a complement to continuous sensing rather than a substitute for it.

#### Resultados quantitativos

Key quantitative findings include: Dedesko 2025 analyzed 54 students and found lower cognitive test scores at higher central and peak classroom CO2 exposures over roughly 440-1630 ppm; Pellegatti 2026 exposed 29 students to CO2 conditions of about 800 and 3000 ppm and found a combined IAQ-acoustics effect on calculation response time; Afifi 2025 studied five classrooms in five schools and 123 fifth-grade students, with capacities ranging from 18 to 60 students; EPA guidance states that dampness and mold increase the risk of asthma-related effects by 30-50 percent and notes that schools without major maintenance backlogs show higher attendance and lower dropout rates.

#### Viabilidade e aceitação

Continuous classroom IEQ monitoring is feasible with low-cost hardware and is easier to justify when outputs are understandable and tied to concrete responses. Acceptance is highest when the system is framed as support for healthy learning conditions, not as staff or student surveillance. The largest barriers are usually maintenance discipline, metadata quality, and follow-through on interventions.

#### Validade e limitações

Most studies are observational or quasi-experimental, so causal interpretation must be cautious. Classroom studies also struggle with imperfect mixing, limited sample sizes, seasonality, socioeconomic confounding, and the difficulty of isolating one variable from the rest of the learning environment. Single-room sensors can also underrepresent within-room variation.

#### Contribuições e lacunas

The literature now supports a practical classroom IEQ monitoring strategy centered on direct measurement of ventilation, thermal comfort risk, particles, acoustics, and light, linked to transparent decision rules. Key gaps remain in long-term intervention studies, child-centered cognitive and health outcomes under real school conditions, stronger multi-domain causal designs, and standardized low-cost validation protocols that connect sensor data to educational impact.


---

## 18. Privacidade, ciberseguranca, etica e LGPD

### Identificação e base bibliográfica

#### Referências utilizadas

- Brazil. Law No. 13,709 of 2018 (General Personal Data Protection Law, LGPD), consolidated text accessed August 11, 2026.
- Brazilian National Data Protection Authority (ANPD). Personal Data Processing for Academic Purposes and for Conducting Studies and Research: Guidance. Version 1.0. June 2023.
- Brazilian National Data Protection Authority (ANPD). Preliminary Study on Legal Bases Applicable to the Processing of Personal Data of Children and Adolescents. 2022.
- Brazilian National Data Protection Authority (ANPD). Information Security Guidance for Small Data Processing Agents. Version 1.0. October 2021.
- Brazilian National Data Protection Authority (ANPD). Privacy Impact Assessment (RIPD) guidance and FAQ. Accessed August 11, 2026.
- Brazilian National Data Protection Authority (ANPD). Security Incident Communication guidance under CD/ANPD Resolution No. 15 of April 24, 2024. Accessed August 11, 2026.
- NIST. IR 8259 Rev. 1: Foundational Cybersecurity Activities for IoT Product Manufacturers. April 2026.
- NIST. IR 8259A: IoT Device Cybersecurity Capability Core Baseline. May 2020.
- NIST. Privacy Framework 1.1. Accessed August 11, 2026.
- Pinto GP, Donta PK, Dustdar S, Prazeres CVS. A Systematic Review on Privacy-Aware IoT Personal Data Stores. Sensors. 2024;24(7):2197.
- Jayousi M, Lucattini G, Mucchi L, et al. Smart Learning by Design: A Framework for IoT-Driven Adaptive Learning Environments and Inclusive Education. Education Sciences. 2025;15(10):1338.

#### Identificadores e endereços persistentes

- https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/web-guia-anpd-tratamento-de-dados-para-fins-academicos.pdf/%40%40display-file/file
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/estudo-preliminar-tratamento-de-dados-crianca-e-adolescente.pdf/%40%40display-file/file
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-vf.pdf/%40%40display-file/file
- https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd
- https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis
- https://doi.org/10.6028/NIST.IR.8259r1
- https://doi.org/10.6028/NIST.IR.8259A
- https://www.nist.gov/privacy-framework
- https://doi.org/10.3390/s24072197
- https://doi.org/10.3390/educsci15101338

#### Tipo e composição da evidência

Topic-level evidence synthesis combining statutory text, official regulatory guidance, cybersecurity frameworks, and selected peer-reviewed literature on privacy-aware IoT and smart learning systems.

#### Países e condições climáticas

The legal core is Brazil-specific because LGPD and ANPD guidance govern local compliance, especially for schools and academic research involving children and adolescents. The cybersecurity guidance is complemented by international IoT baselines from NIST, which are climate-independent but operationally relevant to any connected classroom deployment.

### Escopo e método

#### Objetivo e questão de pesquisa

The main objective is to determine how an IoT classroom monitoring system can remain useful for environmental management while minimizing privacy, cybersecurity, and ethical risk. The practical question is how to collect classroom-relevant data without drifting into unnecessary surveillance, and how to align data flows, legal basis, security controls, retention, and governance with LGPD and privacy-by-design principles.

#### Desenho dos estudos

The evidence base is primarily normative and design-oriented rather than intervention-heavy. It includes statutory interpretation, regulatory guidance, impact-assessment guidance, incident-reporting guidance, cybersecurity baselines for IoT products, and a small body of peer-reviewed literature on privacy-aware IoT data architectures and adaptive smart-learning environments.

#### Contexto educacional

The relevant context is environmental monitoring in schools, classrooms, and academic research settings where data subjects may include children, adolescents, teachers, staff, and visitors. The risk profile changes sharply depending on whether monitoring stays at room-level environmental sensing or expands into attendance analytics, identity linkage, device tracking, audio, video, or biometrics.

#### Amostra e duração

This topic is not dominated by one empirical classroom cohort. Instead, it draws on official documents published between 2021 and 2026, including Brazil's standing law, ANPD guidance for academic research, ANPD child-and-adolescent interpretation guidance, ANPD incident and RIPD guidance, and NIST IoT cybersecurity publications. The main peer-reviewed technical review is Pinto et al. 2024 on privacy-aware IoT personal data stores, while smart-learning literature provides conceptual frameworks rather than large operational school trials.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

From a privacy-and-ethics perspective, the preferred monitored variables are direct environmental quantities such as CO2, temperature, RH, PM2.5, LAeq, and illuminance, plus limited device-health telemetry such as battery, uptime, and communication status. Person-level variables should be avoided by default. If occupancy context is needed, collect the least intrusive variable that satisfies the purpose, such as room presence or coarse count bands rather than identity, behavior, voice, face, or biometric traits.

#### Condições externas e linha de base

Outdoor weather and pollution matter operationally but create little privacy burden by themselves. Privacy risk appears when outdoor and indoor environmental streams are combined with schedules, cameras, attendance, Wi-Fi identifiers, or other contextual datasets that can re-identify individuals or reveal patterns about specific classes, teachers, or vulnerable groups.

#### Ocupação e atividade

Occupancy is the most sensitive contextual variable in a classroom IoT system because it often creates pressure to infer who was present, when, and doing what. From an LGPD and ethics standpoint, room use should be described at the lowest level of granularity necessary for the stated purpose, and any link to named individuals, groups, or performance should be treated as a materially higher-risk processing activity.

#### Operação da ventilação e filtração

Ventilation and filtration operation can be monitored with relatively low privacy impact when inferred from CO2, PM2.5, fan status, or window state rather than from identified occupants. The system should separate environmental control objectives from personnel or student evaluation. Even beneficial operational interventions become ethically problematic if the monitoring stack is repurposed to judge individuals.

#### Granularidade espacial

Room-level monitoring is usually sufficient and is preferable to seat-level or person-level granularity. Finer granularity increases the risk of singling out small groups or tracking behavior patterns, especially in classrooms with a limited number of students or when data are combined with timetables and staffing records.

### Sensores, metrologia e dados

#### Especificações dos sensores

The lowest-risk sensor specification is a direct environmental stack that does not inherently identify people: true CO2 by NDIR, T/RH, PM2.5, LAeq without retaining raw audio, and lux without imaging. If occupancy context is essential, prefer PIR or privacy-preserving mmWave presence/counting configurations that report coarse occupancy signals instead of images, raw audio, biometric templates, or device identifiers.

#### Calibração e garantia da qualidade

QA/QC must cover both measurement integrity and governance integrity. In addition to co-location and drift checks, maintain asset inventory, firmware version control, secure configuration baselines, documented calibration access, and change logs. From a privacy standpoint, who can alter the sensing configuration is as important as whether the variable is accurate.

#### Aquisição e qualidade dos dados

Data acquisition should follow purpose limitation and minimization. Use the coarsest sampling interval that still supports the stated operational objective, aggregate where possible, and avoid collecting raw feeds that will never be used. Completeness, missingness, QA flags, and access logs should be documented because silent gaps or silent overcollection both undermine accountability.

#### Sensor recomendado por variável

Recommend direct physical sensing for environmental management and avoid identity-bearing modalities unless a separate, clearly justified purpose, legal basis, and safeguards exist. The preferred stack is true CO2, T/RH, PM2.5, LAeq, and lux. If occupancy is needed, use coarse presence or bounded counting. Cameras, microphones, MAC-address collection, and biometrics should not be the default for classroom environmental monitoring.

#### Saídas úteis e unidades

Useful outputs are room-level environmental values with standard units, occupied versus unoccupied state if truly needed, device-health indicators, QA flags, and aggregate alert states. The privacy-preserving target is to output room condition, not personal behavior. For example: CO2 in ppm, temperature in degrees Celsius, RH in percent, PM2.5 in micrograms per cubic meter, LAeq in dBA, lux, and coarse occupancy bands rather than names or raw traces.

#### Medição direta ou proxy

Environmental variables are direct physical measurements. Occupancy inference, behavioral interpretation, attention estimation, or student-engagement scoring are proxies and should be treated as separate, higher-risk processing categories. LGPD compliance and ethics review should become stricter as the system moves away from room-level environmental facts and toward person-level inference.

#### Princípio de medição e seletividade

From a privacy perspective, more selective physical measurements are usually better because they solve a narrow operational problem without capturing unnecessary personal data. NDIR for CO2, calibrated sound-level metrics without content retention, and lux sensing without imaging are examples of high-selectivity choices. Broad sensing modalities such as cameras, microphones, or wireless identifier harvesting collect far more than is needed for basic environmental management.

#### Interferências e confundidores

The biggest confounder is function creep: a system deployed for ventilation or comfort may later be reused for attendance, discipline, or performance evaluation. Other privacy confounders include joining room-level data with schedules, names, Wi-Fi identifiers, access-control records, and CCTV. Even if each dataset appears harmless in isolation, the combined dataset may become personally identifiable or sensitive in practice.

#### Protocolo acessível de validação

A practical protocol is to complete a data-flow map, legal-basis check, and lightweight threat model before deployment; run a co-location check for environmental sensors; verify access controls and encrypted transport; test whether exports can re-identify small groups; and review whether each field is necessary. For higher-risk processing, prepare or simulate a RIPD and record mitigation decisions before collection starts.

#### Métricas de validação

Relevant metrics include measurement bias and uptime for the environmental channels, but also privacy and security indicators such as number of personal-data fields collected, retention duration, audit-log coverage, percentage of encrypted links, credential-rotation coverage, incident-detection latency, false-positive occupancy alerts, and whether re-identification remains reasonably feasible from exported datasets.

#### Instalação e encapsulamento

Install nodes in visible, documented locations with tamper-aware enclosures and clear labeling about their purpose. Avoid hidden sensors and avoid placements that could be reasonably interpreted as covert surveillance. Restrict physical access to ports and local storage, especially in classrooms where children can touch or remove devices.

#### Integração de hardware

Use hardware that supports secure identity, signed firmware updates, protected credentials, local buffering, and encrypted communications. Integration should separate environmental sensing from any student-information systems unless that linkage is strictly necessary and formally governed. Security architecture should assume that classroom nodes are physically accessible and therefore more exposed than locked industrial equipment.

#### Maturidade da evidência

Evidence maturity is high for the core legal and governance principles under LGPD, moderate to high for general IoT cybersecurity baselines from NIST, moderate for privacy-preserving IoT architectural patterns such as personal data stores, and still limited for classroom-specific empirical comparisons between low-intrusion and high-intrusion sensing stacks. In other words, the governance principles are clear even when classroom implementation studies remain sparse.

#### Cuidados específicos por variável

Cameras, raw audio, biometrics, Wi-Fi or BLE identifier harvesting, and behavioral analytics carry substantially higher privacy and ethical risk than direct environmental sensing. Health-related or biometric classroom data can become sensitive personal data. For minors, the best-interest standard applies, and the existence of a technically possible data stream does not justify collecting it.

### Arquitetura IoT

#### Arquitetura do sistema

The preferred architecture is privacy-by-design: classroom node to secure broker or API to time-series storage with role-based access and room-level dashboards, while personal identifiers remain absent or strictly segregated. Edge aggregation is useful when it prevents unnecessary raw-data transmission. Data retention should be time-bounded, and access should follow the smallest set of operational roles needed to maintain the system.

#### Conectividade e protocolos

Use secure transport such as TLS over MQTT or HTTPS, protected school Wi-Fi, mutual authentication or strong device identity, and network segmentation. Protocol simplicity matters because misconfiguration is a common classroom risk. The protocol decision should balance maintainability, school IT policy, and the need to avoid local insecure workarounds.

#### Interoperabilidade e modelo de dados

The data model should include timestamp, room ID, sensor ID, environmental values, QA flags, and perhaps coarse occupancy state, but should avoid names, student IDs, raw audio, raw video, and unnecessary device identifiers. Interoperability should not be an excuse for overcollection. Data contracts should document purpose, lawful basis, retention, access role, and downstream sharing constraints.

#### Cibersegurança, privacidade e ética

LGPD requires lawful basis, purpose limitation, necessity, transparency, security, and accountability. Article 14 adds that processing of children and adolescents must be carried out in their best interest, and ANPD's preliminary study indicates that processing can rely on the legal bases in Articles 7 or 11 as applicable, provided that best interest is respected in the concrete case. Articles 46 to 48 require security measures and incident communication, while ANPD guidance and NIST frameworks support privacy-by-design, risk management, access control, secure updates, and incident response. Ethically, classroom systems should avoid chilling effects, opaque profiling, and unequal monitoring burdens on specific classes or groups.

### Análise, decisão e automação

#### Métodos analíticos

Use analytics that stay at room level whenever possible: threshold alerts, aggregated trends, comparison between rooms, and intervention effectiveness. If combining environmental data with human-subject research, document the legal basis, ethics basis, minimization rationale, and de-identification approach. Avoid inferential models that claim to measure attention, discipline, or performance from environmental and behavioral traces unless that higher-risk purpose has been explicitly justified and approved.

#### Índice ou modelo derivado

Useful derived governance artifacts include a data inventory, records of processing, threat model, privacy-risk register, retention schedule, and RIPD when risk justifies it. On the technical side, a privacy profile can classify each variable by identifiability, sensitivity, purpose necessity, and mitigation level. These are often more valuable for this topic than a generic IEQ composite score.

#### Regras de decisão e normas

Decision rules should align with LGPD principles, ANPD guidance, ANPD incident rules, and recognized IoT cybersecurity baselines. A defensible rule set is: do not collect personal data when room-level environmental data are sufficient; if personal data are necessary, define the legal basis and best-interest rationale before collection; complete a higher-risk review or RIPD when monitoring may significantly affect rights and freedoms; and notify incidents according to ANPD guidance, which currently points to communication within three business days for reportable incidents under Resolution No. 15 of April 24, 2024.

#### Intervenção e automação

Automation should favor low-intrusion actions such as ventilation alerts, maintenance tickets, or room-level notifications. Automated actions that affect people, such as individualized flags or attendance enforcement, require a much higher legal and ethical bar. The privacy-preserving ideal is to automate environmental correction, not personal judgment.

### Resultados e avaliação

#### Resultados ambientais

A privacy-respecting system can still deliver the core environmental outcomes of classroom monitoring: improved ventilation visibility, faster detection of thermal or particle problems, and better maintenance prioritization. These outcomes do not require person-level surveillance if the data model and architecture remain disciplined.

#### Saúde e aprendizagem

The expected indirect benefit is that a legally and ethically sound monitoring system can support healthier and more comfortable classrooms without undermining trust. Poor privacy design can itself harm the learning environment by creating surveillance anxiety, reducing openness, and discouraging participation. The best outcome is therefore dual: healthier rooms and a monitoring practice that does not erode educational relationships.

#### Integração objetiva e subjetiva

Objective room-level sensing should be paired with transparent notices, understandable policies, and channels for students, families, and staff to question or contest the monitoring design. Subjective acceptance is part of system validity here: a technically secure deployment that users perceive as covert or excessive is still ethically weak.

#### Resultados quantitativos

The clearest quantitative parameters in the official guidance are procedural rather than environmental. ANPD's incident-communication page states that communication to ANPD and affected data subjects should be made by the controller within three business days under Resolution No. 15 of April 24, 2024, for relevant incidents. Beyond that, the privacy literature is stronger on architectures and principles than on standardized classroom effect sizes, so classroom-specific quantitative benchmarks for privacy risk remain limited.

#### Viabilidade e aceitação

Low-intrusion classroom monitoring is feasible because the core environmental mission can be met without cameras, biometrics, or identity tracking. Acceptance improves when the system is visibly limited, well documented, and clearly separated from discipline and performance evaluation. The largest implementation costs are often governance, coordination with school IT and legal actors, and sustained access control, not the sensors themselves.

#### Validade e limitações

This topic relies heavily on legal and framework documents rather than randomized classroom trials. Some recommendations are therefore principled and preventive rather than experimentally benchmarked in schools. Another limitation is that privacy risk is contextual: the same sensor can be low risk in one deployment and high risk in another if linked to richer identity data.

#### Contribuições e lacunas

The strongest contribution of the current evidence is a clear design direction: use direct environmental sensing, minimize personal data, document legal basis, apply child best-interest reasoning, secure the IoT stack from design through decommissioning, and prepare for incident response and impact assessment. Research gaps remain in empirical comparisons of privacy-preserving occupancy methods, classroom-specific re-identification risk, and long-term trust outcomes of environmental monitoring programs in schools.


---

## 19. Custo, energia, manutencao, escalabilidade e sustentabilidade

### Identificação e base bibliográfica

#### Referências utilizadas

- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments. 2024;16(2).
- Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro M, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- Ge B, Tieskens K, Vyas P, Botana Martinez MP, Yuan Y, Walsh KH, Main L, Bolton L, Yajima M, Fabian MP. Decision tools for schools using continuous indoor air quality monitors: a case study of CO2 in Boston Public Schools. The Lancet Regional Health - Americas. 2025;48:101148.
- Godasiaei SH, Ejohwomu OA, Zhong H, Booker D. Integrating experimental analysis and machine learning for enhancing energy efficiency and indoor air quality in educational buildings. Building and Environment. 2025;276:112874.
- US EPA. Low-Cost Air Pollution Monitors and Indoor Air Quality. Accessed 2026-08-11.
- US EPA. A Guide to Siting and Installing Air Sensors. Last updated 2026-01-07.
- US EPA. How to Use Air Sensors: Air Sensor Guidebook. Enhanced 2022 version, accessed 2026-08-11.

#### Identificadores e endereços persistentes

- https://doi.org/10.3233/AIS-220577
- https://doi.org/10.3390/s24165129
- https://doi.org/10.3390/s24010148
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://doi.org/10.1016/j.lana.2025.101148
- https://doi.org/10.1016/j.buildenv.2025.112874
- https://www.epa.gov/indoor-air-quality-iaq/low-cost-air-pollution-monitors-and-indoor-air-quality
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.epa.gov/air-sensor-toolbox/how-use-air-sensors-air-sensor-guidebook
- https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality/indoor-air-quality-sensor-dashboard

#### Tipo e composição da evidência

Topic-level evidence synthesis combining school IoT deployments, a district-scale operational case study, an educational-building energy and IAQ study, and official guidance on low-cost air sensing.

#### Países e condições climáticas

The evidence base is multi-country and multi-climate, including Portuguese classroom pilots, an Italian multi-room control concept, Boston Public Schools in a cold-humid U.S. climate, and broader educational-building energy analyses. This matters because the viability of natural ventilation, filtration runtime, battery strategy, and network architecture depends strongly on climate, building age, and campus operations.

### Escopo e método

#### Objetivo e questão de pesquisa

The objective is to determine when classroom environmental monitoring is economically viable and operationally sustainable beyond a one-room prototype. The practical research question is which sensing stack, power strategy, maintenance workflow, and fleet architecture deliver the best trade-off among capital cost, energy use, calibration burden, scalability, and long-term sustainability for real school deployment.

#### Desenho dos estudos

The literature is methodologically mixed. It includes systematic review evidence, hardware-focused classroom pilots, room-to-district operational deployments, a multi-room control concept, and educational-building studies that explicitly balance IAQ and energy performance. Most evidence is engineering-evaluative and observational rather than randomized.

#### Contexto educacional

The most relevant context is routine classroom operation in K-12 or university buildings where many rooms must be monitored with limited technical staff. Viability is therefore less about a laboratory proof-of-concept and more about whether the system can be installed room by room, survive ordinary school use, and keep producing trusted data without disproportionate maintenance effort.

#### Amostra e duração

Evidence spans short proof-of-concept classroom deployments, multi-room school pilots, and district-scale continuous monitoring. The strongest operational scale signal is Boston Public Schools, which used 3,659 classroom sensors across 125 buildings during the 2022-2023 school year and analyzed 245 million CO2 measurements. SchoolAIR adds a classroom pilot plus secondary-school proof of concept, while Smart Healthy Schools addresses multi-room control logic and Godasiaei et al. address the IAQ-energy balance in educational buildings.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

From a viability perspective, the most defensible core variables are true CO2, air temperature, relative humidity, and PM2.5 or PM1 plus PM2.5. These variables have strong operational value, relatively mature sensing options, and a clearer path to action than broader proxy channels. Optional variables such as PM10, VOC indexes, noise, illuminance, or direct occupancy can be useful, but each adds integration cost, maintenance burden, and interpretation complexity that must justify itself institutionally.

#### Condições externas e linha de base

Outdoor context materially affects cost and sustainability because it determines whether opening windows helps or harms. Without outdoor PM, weather, and baseline context, a school can waste energy by over-ventilating during polluted, hot, or cold conditions or can miss opportunities to ventilate safely when outdoor air is favorable. Viable deployments therefore benefit from at least one outdoor or rooftop reference stream per campus or building cluster.

#### Ocupação e atividade

Class schedules, occupancy density, breaks, and unusual activities shape both environmental loads and the economic value of monitoring. Systems that ignore occupancy context often generate noisy data and avoidable alerts, which increases response burden and reduces institutional trust. From a scalability standpoint, schedule integration is a low-cost way to improve interpretation before adding more expensive direct occupancy channels.

#### Operação da ventilação e filtração

The viability of a monitoring program is tied directly to the interventions it informs. Continuous sensing is most valuable when it can distinguish cases that need more outdoor air, more filtration, maintenance action, or no action at all. A sustainable program therefore records ventilation mode, window state where feasible, fan schedules, and filtration runtime so that operational decisions do not create unnecessary energy penalties.

#### Granularidade espacial

Room-level sensing is usually the minimum viable granularity because building averages hide the rooms that drive complaints, risk, and wasted maintenance effort. For scaling, the most practical baseline is one fixed node per regularly occupied classroom, with additional temporary nodes reserved for diagnosis or mapping. This balances actionable resolution against procurement, installation, and service burden.

### Sensores, metrologia e dados

#### Especificações dos sensores

For cost-effective school deployment, the preferred sensor stack is conservative: true CO2 by NDIR or photoacoustic NDIR, direct temperature and RH sensing, and optical PM sensing focused on PM2.5. The strongest viability case comes from mature, low-integration-risk modules rather than experimental chemistry or ambiguous proxy outputs. Optional channels should be justified by a concrete school use case, not by the attraction of a larger spec sheet.

#### Calibração e garantia da qualidade

Lifecycle viability depends heavily on QA/QC discipline. The recurring recommendation across the review, classroom pilots, and EPA guidance is to treat collocation, installation metadata, warm-up handling, timestamp integrity, and periodic rechecks as first-class program costs. In school portfolios, neglected QA/QC turns cheap hardware into expensive bad data because staff spend time investigating alerts that come from installation or calibration problems rather than real room conditions.

#### Aquisição e qualidade dos dados

A minute-scale acquisition regime with local buffering is a strong default for viable classroom monitoring. This is fast enough for operational dashboards while remaining light enough for storage, network transport, and long-term retention. Data completeness, stale-data labeling, and buffer recovery are essential because a fleet that looks cheap on paper becomes costly if support staff must manually reconcile outages and missing records.

#### Sensor recomendado por variável

For the best viability-to-value ratio, use true CO2 by NDIR or photoacoustic NDIR for ventilation screening, direct T/RH sensing for comfort and compensation, and optical PM sensing centered on PM2.5. Use PM10 only as a secondary output, and add VOC, noise, lux, or direct occupancy only when the school has a defined action path for those variables. This recommendation follows the broad pattern in current classroom evidence: prioritize a trustworthy core stack first, then expand only if the added channel changes decisions enough to justify its own cost and maintenance.

#### Saídas úteis e unidades

The most useful outputs for viable operation are CO2 in ppm, temperature in degrees C, RH in percent, PM fractions in micrograms per cubic meter, uptime in percent, occupied-time exceedance in minutes or percent, and explicit QA flags. Program-level viability also benefits from operational outputs such as offline-device count, days since last calibration check, and room ranking by persistent problem burden.

#### Medição direta ou proxy

Viability improves when the system distinguishes direct measurements from proxies clearly and consistently. True CO2, T/RH, lux, and calibrated acoustic metrics are measured channels, whereas ventilation adequacy, overcrowding, room priority, and many VOC-style outputs are interpreted or proxy-driven. Clear labeling reduces unnecessary follow-up work and prevents decision-makers from treating lower-evidence channels as if they were equally trustworthy.

#### Princípio de medição e seletividade

From a sustainability and maintenance perspective, selective and mature sensing principles are preferred for the core stack. NDIR or photoacoustic NDIR is more defensible for CO2 than eCO2 proxies, and mature digital T/RH sensing is more predictable operationally than exploratory multipollutant add-ons. Optical PM sensing is useful and scalable, but schools must still remember that it is aerosol-dependent and therefore more sensitive to field context than direct thermal sensing.

#### Faixa útil e desempenho real

A viable room node must remain credible in the actual classroom range where decisions occur, not merely in the sensor's nominal catalog range. Boston Public Schools reported school-day average CO2 around 841 ppm with peaks up to 5,080 ppm, showing that nodes used for action cannot saturate near normal decision bands. The same principle applies to thermal and PM channels: field usefulness matters more than maximum marketed range.

#### Regime de operação

For sustained school use, mains-powered continuous operation is usually more viable than battery dependence once minute-scale communication, local buffering, and high uptime are required. Battery-powered nodes may still be useful for temporary diagnostics or in spaces without convenient power, but they shift cost into replacement labor and service logistics. A sustainable regime is always-on sensing, local retry, and occupied-period analytics rather than aggressive duty cycling that complicates interpretation.

#### Interferências e confundidores

The main viability confounders are not only sensing errors but operational frictions: poor placement, school Wi-Fi policy changes, dust loading, enclosure self-heating, network dropout, undocumented firmware revisions, and missing room metadata. Another major confounder is underestimating program cost by counting only parts and ignoring installation labor, QA/QC time, user support, and replacement stock.

#### Protocolo acessível de validação

A practical validation path is to assemble a small batch of duplicate nodes, collocate them for 7 to 14 days against one better reference per core variable, then deploy them in 2 to 5 representative classrooms for 2 to 6 weeks with event logs and maintenance notes. The protocol should track not only measurement error but also power stability, reconnect behavior, buffer recovery, cleaning needs, and time spent on support. This makes the TCC evidence much closer to real total cost of ownership than a bench-only test.

#### Métricas de validação

Viability-oriented validation should report bias, MAE, RMSE, uptime, missing-data fraction, false-alert rate, reboot frequency, mean time between service events, and if feasible average node power draw or energy per node-day. At program level, useful metrics also include percentage of rooms with complete metadata, proportion of alerts that led to actionable intervention, and technician time per node per month.

#### Instalação e encapsulamento

Sustainable deployment favors simple, repeatable installation: one documented location per room, ventilated enclosure, easy access for cleaning and replacement, and clear separation between heat-generating electronics and sensitive measurement openings. Installations that are hard to reach, visually confusing, or mechanically fragile create hidden maintenance cost even when the electronics themselves are inexpensive.

#### Integração de hardware

An ESP32-class MCU with I2C or UART sensors, local flash or SD buffering, and a stable 5 V supply remains a pragmatic baseline for school pilots and small fleets. The integration priority is not maximum feature count but reliable power, recoverable storage, time synchronization, and simple remote support. Optional edge gateways or campus servers add cost, but they can improve resilience and fleet management enough to pay for themselves at larger scale.

#### Maturidade da evidência

Evidence maturity is strong for the claim that a core classroom monitoring stack is technically and economically feasible at pilot scale. It is moderate for multi-room scaling and maintenance workflow design, and weaker for long-term sustainability metrics such as embodied carbon, repairability, disposal, and ten-year lifecycle cost in ordinary school ownership conditions. The literature is much better at showing that deployments can be built than at publishing detailed aftercare economics.

#### Cuidados específicos por variável

The lowest-power or cheapest channel is not always the most sustainable once trust and maintenance are considered. eCO2 can create false economy if it leads to bad ventilation decisions. PM sensors add value but also fan and fouling burden. Battery operation looks simple until replacement labor scales. Optional channels should therefore be judged by their net decision value, not by their novelty or component price alone.

### Arquitetura IoT

#### Arquitetura do sistema

The most viable architecture is layered: classroom nodes for acquisition and local buffering, reliable campus or edge ingestion, time-series storage, and a dashboard plus maintenance layer that expose both environmental state and device health. At small scale, one broker and one dashboard are enough; at larger scale, the same architecture must support fleet identity, firmware traceability, room metadata, and issue triage so that service burden does not grow chaotically.

#### Conectividade e protocolos

Mains-powered Wi-Fi with MQTT or HTTPS remains the most practical default where school IT policy allows it because it keeps hardware cost low and supports minute-scale telemetry. LoRaWAN becomes attractive in special cases where coverage and onboarding dominate, but it is less convenient for richer PM and health telemetry. Protocol choice should minimize long-term support effort, not only initial bring-up time.

#### Interoperabilidade e modelo de dados

Open, explicit schemas improve sustainability by reducing vendor lock-in and making later institutional integration easier. The minimum viable model should include timestamp, room ID, node ID, variable, unit, QA flag, firmware version, and calibration state. When scaling, adding building, floor, and maintenance metadata helps facilities teams compare rooms fairly and keep service workflows organized.

#### Cibersegurança, privacidade e ética

Security and privacy are part of viability because insecure systems create hidden future cost, loss of trust, and barriers to scaling. Even environmental programs with no direct personal data can reveal schedules, room-use patterns, or building weaknesses. Sustainable deployment therefore needs authenticated devices, scoped access, secure transport where feasible, and a clear institutional statement that the program monitors rooms for environmental management rather than people for surveillance.

### Análise, decisão e automação

#### Métodos analíticos

Useful viability analytics include room ranking by exceedance burden, duplicate agreement tracking, offline-device detection, intervention effectiveness review, and simple comparisons of problem reduction against maintenance effort. More advanced IAQ-energy optimization and machine-learning approaches are promising, but operationally sustainable systems still benefit most from transparent statistics and interpretable rules that staff can maintain.

#### Regras de decisão e normas

Operational rules should protect IAQ without creating unnecessary energy penalties. The Boston case and adjacent dashboard literature support persistence-based CO2 and RH rules rather than raw spikes, and EPA guidance supports contextual interpretation of low-cost sensor data. From a viability standpoint, the best rule library is the one that maps clearly to school actions and minimizes false alarms, because every unnecessary response increases program cost.

#### Intervenção e automação

The most viable intervention pattern is supervised rather than fully autonomous: inform the teacher or facilities team, recommend a ventilation or filtration action, and escalate persistent room problems into maintenance review. More advanced automation can improve the IAQ-energy trade-off, but it also raises integration and governance costs. For a TCC-scale system, trustworthy sensing plus simple action support is the most sustainable baseline.

### Resultados e avaliação

#### Resultados ambientais

A viable monitoring system improves observability enough to reduce repeated under-ventilation, identify rooms with chronic particulate or thermal problems, and avoid wasteful one-size-fits-all responses. It can also support a better balance between clean air and energy use by showing which rooms truly need intervention and which do not.

#### Integração objetiva e subjetiva

Teacher, technician, and facilities feedback are important for viability because they reveal hidden burdens such as nuisance alerts, confusing dashboards, awkward mounting, or difficult cleaning. A program that looks efficient in data logs may still fail institutionally if it consumes too much staff attention. Short feedback loops therefore complement hard technical metrics rather than replace them.

#### Resultados quantitativos

The strongest scale benchmark is Boston Public Schools: 3,659 classroom sensors in 125 buildings produced 245 million CO2 measurements during the 2022-2023 school year. That result demonstrates that school monitoring can operate at real portfolio scale, but it also implies substantial data-management and maintenance responsibility. Across adjacent classroom syntheses, practical room-node cost remains in the low hundreds of U.S. dollars or less when limited to a core stack, whereas software operations and staff workload become the main scaling challenge.

#### Viabilidade e aceitação

Pilot-scale feasibility is high for a core stack of true CO2, T/RH, and PM in mains-powered classrooms. School-scale viability remains good when installation is standardized, dashboards are simple, and maintenance ownership is explicit. The most common reason programs become unsustainable is not sensor impossibility, but underestimating service labor, network onboarding, and the organizational effort required to turn many room streams into routine action.

#### Validade e limitações

Current evidence is still stronger for short- to medium-duration feasibility than for full lifecycle sustainability. Few publications provide long-term replacement rates, repairability data, embodied-carbon accounting, or published cost breakdowns after several school years. Recommendations are therefore robust for architecture and core-variable prioritization, but less precise for decade-scale total cost and sustainability comparisons.

#### Contribuições e lacunas

The clearest current contribution is a practical viability hierarchy: prioritize a core direct-measurement stack, use room-level deployment, preserve outdoor context, and design for maintenance from the start. The main gaps are publicly reported long-term school maintenance datasets, better power and reliability benchmarks across architectures, repairability and end-of-life analyses for low-cost sensors, and stronger evidence on how to balance IAQ improvement with energy and sustainability goals across different school climates and budgets.


---

## 20. Aceitacao, usabilidade e integracao a rotina escolar

### Identificação e base bibliográfica

#### Referências utilizadas

- Canha N, Correia C, Mendez S, Gamelas CA, Felizardo M. Monitoring Indoor Air Quality in Classrooms Using Low-Cost Sensors: Does the Perception of Teachers Match Reality? Atmosphere. 2024;15(12):1450.
- Broden K, Andersson J, Kitkowska A, Ahmad A, Mozelius P. Gathering requirements for IoT-assisted wellbeing in elementary school - a multi-stakeholder perspective. Frontiers in Education. 2025;10:1580666.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro M, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Ge B, Tieskens K, Vyas P, Botana Martinez MP, Yuan Y, Walsh KH, Main L, Bolton L, Yajima M, Fabian MP. Decision tools for schools using continuous indoor air quality monitors: a case study of CO2 in Boston Public Schools. The Lancet Regional Health - Americas. 2025;48:101148.
- Rus T, Moldovan RP, Marza CM, Corsiuc G, Ilutiu-Varvara DA. Data-driven environments: Evaluating IoT sensors and KNX protocol for monitoring indoor conditions in educational facilities. Frontiers in Built Environment. 2025;11:1688582.
- Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- USGBC. School District Indoor Air Quality Management Plans Toolkit. 2025.
- US EPA. Reference Guide for Indoor Air Quality in Schools. Accessed 2026-08-11.

#### Identificadores e endereços persistentes

- https://doi.org/10.3390/atmos15121450
- https://doi.org/10.3389/feduc.2025.1580666
- https://doi.org/10.3390/s24010148
- https://doi.org/10.1016/j.lana.2025.101148
- https://doi.org/10.3389/fbuil.2025.1688582
- https://doi.org/10.3390/s24165129
- https://www.usgbc.org/sites/default/files/2025-09/CFGS_School-IAQ-Management-Toolkit-FINAL_0.pdf
- https://www.epa.gov/iaq-schools/reference-guide-indoor-air-quality-schools
- https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality/indoor-air-quality-sensor-dashboard
- https://schoolair.org/en/

#### Tipo e composição da evidência

Topic-level evidence synthesis combining a classroom teacher-perception study, a multi-stakeholder school requirements study, citizen-science school deployment work, a district dashboard case study, and BAS-linked educational-facility monitoring.

#### Países e condições climáticas

The evidence spans Portugal, Sweden, Romania, the United States, and school-focused frameworks with transfer across climates. This diversity matters because acceptance is shaped not only by the sensing hardware but by school culture, staff workload, privacy expectations, and whether interventions such as window opening or filtration fit local climate and building operation.

### Escopo e método

#### Objetivo e questão de pesquisa

The objective is to identify which design choices make classroom monitoring acceptable to teachers, understandable to non-specialists, and easy to integrate into the daily routine of schools. The practical research question is how to turn room-level sensing into a trusted, low-burden support tool rather than an intrusive or confusing extra system for educators and facilities staff.

#### Desenho dos estudos

The evidence base is mixed-methods. It includes a multi-parameter classroom monitoring campaign paired with teacher perception, stakeholder interviews and student surveys about IoT-assisted wellbeing, citizen-science and proof-of-concept school deployments, district-level operational dashboarding, and building-monitoring studies that combine sensor data with occupant feedback.

#### Contexto educacional

The strongest directly relevant settings are elementary and secondary school classrooms, with some university classrooms used for prototyping and method development. The shared context is a busy teaching environment where technology must not interrupt instruction, must be understandable without specialist training, and must fit existing roles such as teachers, school administrators, and facilities teams.

#### Amostra e duração

Key evidence comes from several complementary scales. Canha et al. monitored 9 classrooms across 171 classes in a Portuguese school while collecting teacher perception. Broden et al. gathered qualitative input from 25 staff members and survey responses from 464 students in a Swedish elementary school. Boston Public Schools operated 3,659 classroom sensors across 125 buildings over the 2022-2023 school year, while SchoolAIR combined university-classroom pilot work with a high-school proof of concept.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

For acceptance and usability, the most useful variables are the ones users can understand and act on: true CO2, temperature, relative humidity, PM2.5, and where relevant simple occupancy context, noise, or light. Adding many ambiguous channels can reduce usability because users must then distinguish which traces are direct, which are proxy, and which actually require action.

#### Condições externas e linha de base

Outdoor context improves usability because it explains why a recommended action makes sense. A dashboard that says to ventilate without showing that outdoor air is cleaner and thermally tolerable will be harder for staff to trust. Conversely, including baseline context helps schools understand why a room should keep windows closed during smoke, traffic, heat, or cold episodes.

#### Ocupação e atividade

Integration into school routine depends heavily on schedule and classroom activity. Data are easier for staff to trust when dashboards respect class periods, breaks, teacher-led transitions, and occupancy patterns instead of generating alarms overnight or during vacant periods. This is also why simple timetable integration often improves usability more than adding another sensor channel.

#### Operação da ventilação e filtração

Operational acceptance is highest when the monitoring system maps directly to familiar actions such as opening windows, starting a purifier, requesting HVAC inspection, or adjusting room use. Teachers and staff are less likely to use a system that reports abstract indicators without an obvious classroom response or that recommends actions that conflict with comfort, noise control, or lesson flow.

#### Granularidade espacial

Room-level sensing is the right granularity for user acceptance because teachers and facilities staff need to know which actual classroom has a problem. Building-wide averages or generic school scores are too remote from everyday decision-making. At the same time, users usually do not need multiple devices per ordinary classroom unless the room has a known spatial problem.

### Sensores, metrologia e dados

#### Especificações dos sensores

The most usable classroom node is unobtrusive, low-noise, clearly labeled, and built around a small number of reliable direct measurements. Sensors that require frequent interaction, display unexplained raw signals, or rely on privacy-sensitive modalities can undermine acceptance even if they are technically interesting. Evidence from classroom and school studies therefore favors a restrained, trustworthy stack over a maximal one.

#### Calibração e garantia da qualidade

Trust is a usability issue as much as a technical one. Users are unlikely to integrate sensor information into daily decisions if devices seem inconsistent, stale, or unexplained. QA/QC should therefore be visible through simple freshness indicators, clear handling of warm-up and missing data, and documented calibration state so that teachers and staff can distinguish a room problem from a device problem.

#### Aquisição e qualidade dos dados

Minute-scale collection with smoothed dashboard presentation is a practical compromise for classroom use. The Boston case and adjacent dashboard evidence show that users benefit from stable rolling displays rather than noisy raw traces. Data quality signals such as last update time, offline status, and suspicious-value flags are important usability features because they affect whether staff feel comfortable acting on the dashboard.

#### Sensor recomendado por variável

For daily school usability, prioritize true CO2 for ventilation guidance, direct T/RH for comfort interpretation, and PM2.5 when particle events or filtration decisions matter. Add lux, calibrated acoustic metrics, or direct occupancy only when the school has a clear action path for them and the interface can present them without overwhelming users. This aligns with the acceptance pattern across the literature: a small set of high-value variables is easier to understand and adopt than a crowded multi-signal panel.

#### Saídas úteis e unidades

The most useful user-facing outputs are CO2 in ppm, temperature in degrees C, RH in percent, PM2.5 in micrograms per cubic meter, status color or severity band, and occupied-time summaries that translate into room-level recommendations. For teachers, short messages such as ventilate now, room recovered, or maintenance review needed are often more usable than long raw tables, provided the raw data remain accessible for technical staff.

#### Medição direta ou proxy

Acceptance improves when the interface clearly distinguishes measured variables from derived judgments. Teachers and school managers should not have to guess whether a value is direct CO2, a PM estimate, a comfort interpretation, or a composite score. Ambiguity here creates distrust and can also make users feel they are being asked to rely on a black box.

#### Princípio de medição e seletividade

The principle behind a sensor matters operationally because it affects how confidently staff can interpret it. Direct and selective measurements such as true CO2 or direct T/RH are easier to explain and defend than broad proxy channels such as VOC indexes or inferred occupancy. From a usability perspective, the simpler rule is to expose only those channels whose measurement meaning can be explained in plain language.

#### Faixa útil e desempenho real

A classroom system that saturates, drifts visibly, or behaves erratically during ordinary school conditions quickly loses acceptance. The operational literature therefore favors devices that remain stable across normal occupied classroom conditions and that present smoothed, interpretable values rather than jittery raw feeds. Real performance matters more to usability than nominal laboratory range.

#### Regime de operação

The preferred regime is always-on background monitoring with minimal user intervention. Devices should not require teachers to start sessions manually or interpret frequent setup messages. Data should be captured continuously, summarized appropriately for occupied periods, and surfaced only when staff can do something meaningful with the information.

#### Interferências e confundidores

Teacher perception, student experience, and measured conditions do not always align, which is itself a major confounder for acceptance. Other recurring confounders are alert fatigue, privacy concern, unclear ownership of response, stale dashboards, room-to-room differences hidden by school averages, and systems that surface too many variables without enough context. A tool can be technically accurate and still be operationally unusable.

#### Protocolo acessível de validação

A practical TCC-level acceptance protocol is to deploy 2 to 5 classroom nodes for several weeks, pair the measurements with short teacher feedback forms, record actual interventions, and interview at least one facilities or school-management stakeholder. Validation should ask not only whether the sensor was accurate enough, but whether users understood the display, trusted the alerts, and could act on them within normal school routines.

#### Métricas de validação

Acceptance-oriented validation should include uptime, dashboard freshness, false-alert frequency, percentage of alerts acknowledged, intervention completion rate, and simple user feedback on clarity, burden, and trust. When possible, compare objective conditions to subjective teacher or occupant perception so the system can be designed around the known gap between measured and perceived quality.

#### Instalação e encapsulamento

Usable school devices should be compact, visually neutral, quiet, and mounted where they do not interfere with teaching or cleaning. The enclosure should make the device look intentional rather than improvised, while still allowing correct airflow and sensor function. Highly visible or awkwardly mounted devices can trigger tampering, distraction, or skepticism.

#### Integração de hardware

From a usability standpoint, hardware integration should favor silent operation, stable power, local buffering, and minimal dependence on user interaction. If privacy-sensitive channels are included, processing should stay as local as possible and only the necessary summaries should leave the device. The hardware stack should support a simple end-user experience even if the technical backend is richer.

#### Maturidade da evidência

Evidence maturity is strong for two conclusions: school stakeholders want technology that supports wellbeing rather than surveillance, and measured classroom conditions do not always match teacher perception. It is moderate for dashboard and workflow design principles, and lower for long-term formal usability benchmarking across many schools. The field has more descriptive acceptance evidence than standardized human-factors evaluation.

#### Cuidados específicos por variável

Do not present the system as if it diagnoses safety or health by itself. Do not equate a composite score with a direct measurement. Avoid raw audio retention and avoid unnecessary people-monitoring features. Acceptance can also fall if schools perceive the system as evaluating teacher behavior instead of room conditions, so governance and framing are part of the technical design.

### Arquitetura IoT

#### Arquitetura do sistema

The most usable architecture is room node plus simple dashboard plus annotation and maintenance path. Teachers need a concise room-status view and practical actions, while facilities staff need diagnostics, history, and room comparison. A system that stops at data collection without a route to explanation or response will be harder to integrate into daily school routine.

#### Conectividade e protocolos

Reliable connectivity matters to trust, but most users should never need to think about protocol choice. Wi-Fi with MQTT or HTTPS is generally acceptable when it keeps data fresh and support manageable. When connectivity is unreliable, the dashboard should reflect that clearly rather than silently showing stale room values that users may misinterpret as current conditions.

#### Interoperabilidade e modelo de dados

Integration into school routine improves when monitoring data can align with schedules, room identifiers, maintenance workflows, and where relevant building controls. Open fields for room ID, timestamp, occupied status, QA flag, and intervention state are usually enough for a TCC-scale system. Interoperability matters here because a tool is easier to adopt when it fits existing school processes instead of requiring a parallel manual workflow.

#### Cibersegurança, privacidade e ética

Privacy is a central acceptance issue. Broden et al. explicitly identify significant privacy concerns in school environments, and the broader school-monitoring literature shows that trust drops quickly when users suspect hidden behavior tracking. Ethical deployment therefore requires minimal data collection, clear disclosure, role-based access, and a governance model that emphasizes student and staff wellbeing rather than surveillance or performance monitoring.

### Análise, decisão e automação

#### Métodos analíticos

The most useful analytical pattern for acceptance is mixed interpretation: objective time-series plus schedule context plus short user feedback. Rolling averages, occupied-period summaries, room ranking, and simple event annotation are usually more usable than opaque machine-learning outputs. More advanced models can remain in the background, but the visible layer should stay interpretable.

#### Regras de decisão e normas

Usable rules are simple, contextual, and role-aware. For teachers, the system should recommend actions that fit the lesson rhythm, such as brief window opening when outdoor conditions permit or notifying facilities for persistent problems. For administrators and facilities teams, persistence-based thresholds and room ranking are more useful than isolated spikes. Acceptance improves when users can see why an alert appeared and what response is expected from them.

#### Intervenção e automação

The most acceptable intervention pattern is human-centered and supervised. Monitoring should support teachers, students, and facilities staff with prompts, not surprise them with opaque automation. Where automation exists, it should be low risk, easy to override, and clearly communicated so that school users remain confident that the system serves the learning environment rather than controlling it unpredictably.

### Resultados e avaliação

#### Resultados ambientais

When accepted and routinely used, classroom monitoring improves observability of stale air, thermal discomfort, particle events, and persistent problem rooms. The main environmental benefit is not the graph itself but the fact that staff can connect measured conditions to ordinary school actions such as ventilation, filtration, maintenance requests, or changes in room use.

#### Integração objetiva e subjetiva

This topic is defined by the need to combine both layers. Canha et al. show that teacher perception does not fully map onto measured classroom conditions, while Broden et al. show that school stakeholders have substantive needs and concerns that must shape IoT design. The best integration model is therefore not sensor-only or survey-only, but objective monitoring complemented by targeted, low-burden subjective feedback.

#### Resultados quantitativos

Canha et al. monitored 171 classes in 9 classrooms and found that teacher perception did not fully match measured indoor conditions, underscoring the need for interpretable objective monitoring. Broden et al. gathered 25 staff interviews and workshops plus survey data from 464 students, showing multi-stakeholder alignment on many wellbeing requirements while also highlighting privacy concerns. Boston Public Schools demonstrated institutional-scale operational adoption with 3,659 sensors across 125 buildings and 245 million CO2 measurements in one school year. Rus et al. reported strong agreement between fixed KNX sensors and professional instruments, with correlations up to 0.98 for CO2 and RH and up to 0.97 for temperature, while also observing that subjective IAQ feedback could remain mixed.

#### Viabilidade e aceitação

Acceptance is best when the system is framed as room-quality support, uses a restrained and trustworthy variable set, protects privacy, and maps alerts to concrete school actions. Teachers and students are more likely to engage when the technology is unobtrusive and understandable, while facilities teams are more likely to adopt it when it helps prioritize real problems instead of generating noise. The field increasingly supports participatory, action-oriented deployment rather than purely technical rollout.

#### Validade e limitações

Most acceptance evidence still comes from case studies, pilots, and mixed-methods work rather than standardized multi-site usability trials. Cultural context, school governance, age group, and privacy expectations can change acceptance significantly. Findings are therefore robust enough to guide design principles, but less precise for predicting exactly how any one school community will respond before local piloting.

#### Contribuições e lacunas

The literature now supports a clear design direction for school acceptance: keep the sensing core understandable, involve stakeholders early, expose freshness and uncertainty, and connect room data to ordinary school actions. The main gaps are longer-term usability studies after novelty wears off, stronger comparison of dashboard designs for different school roles, clearer evidence on how privacy framing changes adoption, and more published studies that measure whether accepted systems remain actively used over multiple school years.


---

## 21. BIM, gemeos digitais e interoperabilidade semantica

### Identificação e base bibliográfica

#### Referências utilizadas

- buildingSMART International. IFC 4.3.2.0 Documentation. Official openBIM standard documentation, accessed 2026-08-11.
- buildingSMART International. Information Delivery Specification (IDS) 1.0. Official standard page, accessed 2026-08-11.
- buildingSMART International. buildingSMART Data Dictionary (bSDD). Official service documentation, accessed 2026-08-11.
- buildingSMART Technical. ifcOWL. Official overview, accessed 2026-08-11.
- Open Geospatial Consortium. OGC SensorThings API standard overview and interoperability material, accessed 2026-08-11.
- W3C. Web of Things and Thing Description work. Official standards pages, accessed 2026-08-11.
- Brick Consortium. Brick Ontology: Introduction. Official documentation, accessed 2026-08-11.
- Linked Building Data Community Group. Building Topology Ontology (BOT). Official documentation, accessed 2026-08-11.
- Boje C, Guerriero A, Kubicki S, Rezgui Y. Towards a semantic Construction Digital Twin: directions for future research. Automation in Construction. 2020;114:103179.
- Tuhaise VV, Tah JHM, Abanda FH. Technologies for digital twin applications in construction. Automation in Construction. 2023;152:104931.
- Daniotti B, Masera G, Bolognesi CM, Spagnolo SL, Pavan A, Iannaccone G, Signorini M, Ciuffreda S, Mirarchi C, Lucky M, Cucuzza M. The Development of a BIM-Based Interoperable Toolkit for Efficient Renovation in Buildings: From BIM to Digital Twin. Buildings. 2022;12(2):231.
- Chung J, Shelden D. A Framework of ifcJSON-Based Digital Twin Platform for Monitoring Building Environment Using BIM, IoT, and Semantic Web Technologies. In: Advances in Information Technology in Civil and Building Engineering - Proceedings of ICCCBE 2024 - Volume 1. 2025. pp. 39-53.
- Vittori F, Tan CF, Pisello AL, Chong A, Miller C. BIM-to-BRICK: Using graph modeling for IoT/BMS and spatial semantic data interoperability within digital data models of buildings. arXiv:2307.13197. 2023.
- Abdelrahman M, Macatulad E, Lei B, Quintana M, Miller C, Biljecki F. What is a Digital Twin Anyway? Deriving the Definition for the Built Environment from over 15,000 Scientific Publications. Building and Environment. 2025;274:112748.

#### Identificadores e endereços persistentes

- https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/index.html
- https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/
- https://www.buildingsmart.org/users/services/buildingsmart-data-dictionary/
- https://technical.buildingsmart.org/standards/ifc/ifc-formats/ifcowl/
- https://www.ogc.org/standards/sensorthings/
- https://www.w3.org/WoT/
- https://www.w3.org/TR/wot-thing-description-2.0/
- https://brickschema.org/
- https://w3c-lbd-cg.github.io/bot/
- https://doi.org/10.1016/j.autcon.2020.103179
- https://doi.org/10.1016/j.autcon.2023.104931
- https://doi.org/10.3390/buildings12020231
- https://doi.org/10.1007/978-3-031-84208-5_4
- https://doi.org/10.48550/arXiv.2307.13197
- https://doi.org/10.1016/j.buildenv.2025.112748

#### Tipo e composição da evidência

Topic-level evidence synthesis combining official interoperability standards, ontology documentation, and peer-reviewed BIM to digital twin research.

### Escopo e método

#### Objetivo e questão de pesquisa

The main objective is to determine how BIM can evolve from a mostly static information repository into a live digital twin that supports classroom and building operations through semantically interoperable data. The core research question is which open standards, ontologies, and integration patterns best connect geometry, topology, assets, sensor streams, controls, and operational decisions without creating vendor lock-in or losing machine-readable meaning.

#### Desenho dos estudos

Narrative evidence synthesis centered on standards and enabling technologies rather than on one pollutant or one deployment. The evidence base combines official specifications for asset and IoT interoperability with review papers, ontology work, and prototype digital twin frameworks that integrate BIM, IoT, and semantic web technologies.

#### Contexto educacional

The most relevant educational context is a school or university building with many classrooms, recurring occupancy cycles, mixed ventilation modes, maintenance workflows, and a need to connect room-level environmental monitoring to spaces, assets, and operational history. In this setting, a BIM-grounded digital twin is useful when it can answer practical questions such as which room is under-ventilated, which sensor belongs to which zone, and which HVAC or window-opening action changed the condition.

### Ambiente, ocupação e exposição

#### Variáveis ambientais

In classroom digital twins, the usual live variables are true CO2 in ppm, air temperature in degrees C, relative humidity in percent, PM fractions in micrograms per cubic meter, illuminance in lux, acoustic indicators such as LAeq in dBA, and occupancy or timetable context. The twin should also model non-environmental but operationally critical variables such as room ID, asset ID, HVAC mode, window state, purifier state, setpoints, alarm status, firmware version, and QA flags.

#### Condições externas e linha de base

An interoperable twin should treat outdoor weather, outdoor PM, and outdoor CO2 baseline as linked observations rather than as separate spreadsheet context. This matters because classroom decision support often depends on whether a poor indoor trace is driven by occupancy, inadequate ventilation, outdoor pollution, or building envelope effects. If outdoor entities use the same semantic framework as indoor entities, indoor-outdoor comparisons and event attribution become queryable rather than manual.

#### Ocupação e atividade

Occupancy should be modeled as context linked to rooms, schedules, and possibly direct presence sensors, not inferred silently inside a dashboard. In semantic terms, occupancy events, class periods, exam conditions, cleaning intervals, and manual overrides should be attached to room or zone entities so that later analyses can explain why similar rooms have different CO2 decay or comfort patterns.

#### Operação da ventilação e filtração

Windows, doors, HVAC operating mode, outdoor-air fraction, fan schedules, filter status, and portable air cleaner operation should all be represented as machine-readable states or events in the twin. BIM alone rarely captures these dynamic states well enough for operations, which is why digital twin interoperability usually requires an operational layer such as Brick, BOT plus linked data, or API-connected BMS semantics on top of the authored BIM model.

#### Granularidade espacial

The minimum useful granularity is usually room level, with explicit hierarchy from campus to building to floor to room to sensor or actuator. Semantic interoperability improves when sensor entities are linked to the actual classroom, HVAC zone, and relevant assets rather than only placed as generic dashboard tags. Larger rooms, labs, or naturally ventilated spaces may require multiple sensing points, but the twin should still preserve their relation to one semantic space model.

### Sensores, metrologia e dados

#### Especificações dos sensores

For BIM-integrated classroom twins, the preferred sensor class is a stable digital node that exposes persistent identifiers, physical units, timestamps, calibration metadata, and standard interfaces. A twin-ready node is not only accurate enough for the target variable; it must also be traceable to a room, position, sensing principle, firmware version, and lifecycle history so that the semantic layer can distinguish trustworthy room intelligence from anonymous time-series data.

#### Calibração e garantia da qualidade

Semantic interoperability should extend to QA metadata. Each observation stream should remain linked to sensor model, calibration date, correction version, uncertainty note, maintenance event, and known caveats such as true CO2 versus eCO2 or direct occupancy versus inferred occupancy. A digital twin that preserves geometry but drops calibration lineage becomes visually impressive but analytically weak.

#### Aquisição e qualidade dos dados

A good acquisition pattern is continuous local sensing, minute-scale persisted observations, explicit UTC timestamps, store-and-forward buffering, and quality flags for stale, backfilled, missing, or corrected records. The semantic layer should preserve provenance across the entire path from sensor node to broker or API to time-series store to graph or BIM-linked application, because interoperability failures often arise from lost units, broken IDs, or ambiguous time semantics rather than from transport alone.

#### Sensor recomendado por variável

For classroom twins, the core live stack should still prioritize true CO2 by NDIR, stable temperature and RH sensing, and optical PM2.5 monitoring where particles matter. Illuminance, acoustics, occupancy, and window or HVAC-state sensing are strong contextual additions when they are semantically labeled clearly. The key recommendation for this topic is not a novel sensor module but a twin-friendly data contract: every variable should declare its unit, sensing principle, physical location, relation to room and asset entities, and whether it is direct, derived, or proxy-based.

#### Saídas úteis e unidades

Useful outputs are both the physical values and the semantic fields that keep them interoperable: CO2 in ppm, temperature in degrees C, RH in percent, PM2.5 in micrograms per cubic meter, lux, dBA, occupancy state, actuator status, UTC timestamp, room URI, asset URI, QA flag, and processing stage. The digital twin should also expose derived but traceable outputs such as excess CO2 above outdoor baseline, occupied-time exceedance, and room readiness status, while retaining the underlying raw observations.

#### Medição direta ou proxy

The twin must explicitly distinguish direct measurements from proxies and inferred states. Examples of direct values are NDIR CO2, room temperature, or a contact sensor indicating a window is open. Examples of proxies are eCO2, PM10 from a low-cost optical sensor under uncertain aerosol conditions, occupancy inferred from CO2, or a composite IEQ score. Semantic interoperability is weakened when these different evidential levels are flattened into one undifferentiated point list.

#### Princípio de medição e seletividade

Measurement principle should be carried as metadata because it affects interoperability, model portability, and user trust. The twin should know whether CO2 is NDIR or equivalent CO2, whether PM is optical, whether occupancy is PIR or mmWave, whether the room state comes from BACnet points or manual annotations, and whether a building graph derives topology from IFC, BOT, or Brick-aligned mappings. This preserves selectivity and prevents false equivalence across heterogeneous fleets.

#### Faixa útil e desempenho real

For digital twin integration, the useful operating range is not only the sensor range but the range in which the data remain semantically and operationally credible. A classroom twin needs stable minute-scale observations, persistent identities, low ambiguity in room and asset mapping, and enough update frequency to support ventilation and maintenance decisions. Real performance therefore includes not just sensing accuracy but also mapping completeness, queryability, synchronization, and resilience after outages.

#### Regime de operação

A pragmatic operating regime is to sample locally every few seconds or according to sensor constraints, persist minute-scale summaries, publish through MQTT or HTTP style interfaces, and expose observations through a web-friendly API or linked data service. The BIM-derived semantic backbone changes rarely, while the operational layer changes continuously. The twin should therefore separate slow-changing model semantics from high-frequency telemetry while keeping resolvable links between them.

#### Interferências e confundidores

The main confounders are semantic and organizational as much as physical. Common failures include non-unique room naming, inconsistent asset taxonomies, vendor-specific point labels, missing units, timezone ambiguity, geometry that is too detailed for web use, and BIM models that do not reflect post-handover modifications. Even with good sensors, the twin becomes unreliable if live points cannot be mapped cleanly to the intended classroom, system, or piece of equipment.

#### Protocolo acessível de validação

An affordable TCC-level protocol is to start with one building or floor, export the authored BIM model to IFC, define minimum information requirements with IDS, standardize vocabulary with bSDD or a local semantic dictionary, then map a small set of classrooms and live IoT points into a graph or API layer such as Brick, BOT, ifcOWL, or SensorThings. Validation should test whether every live point can be resolved to a room and asset, whether units and timestamps survive end to end, whether queries return the right classroom context, and whether remapping after a controlled change is reproducible.

#### Métricas de validação

Useful metrics are mapping completeness, percentage of live points linked to a valid room and asset, schema-validation pass rate, duplicate identifier rate, time synchronization error, missing-unit frequency, API query latency, graph consistency checks, and recovery success after connector outages. If rule execution is part of the twin, also report false-link rate, stale-data rate, and the proportion of alerts that preserve clear provenance back to the originating entity and observation.

#### Instalação e encapsulamento

Installation still follows normal sensing good practice, but the digital twin adds documentation requirements. Sensor position, height, enclosure revision, near-window or near-HVAC placement, and relation to the modeled room or zone should all be recorded as metadata that can be traced from the BIM or semantic layer. Without that, two sensors in the same classroom may appear interchangeable in the twin even when one is positioned in a biased microenvironment.

#### Integração de hardware

A practical twin-ready hardware pattern is sensor bus to MCU, MCU to local buffer, and uplink to MQTT broker, HTTP endpoint, or BMS gateway, with the device identity linked to a semantic entity in the building graph. Building systems may still expose BACnet, Modbus, or proprietary APIs, so the integration layer should normalize those points into a canonical schema rather than forcing the BIM model itself to behave like a live database.

#### Maturidade da evidência

Evidence maturity is high for the existence and importance of open asset standards such as IFC and for the role of semantic ontologies such as Brick and BOT in structuring building data. It is moderate for classroom or building digital twin prototypes that integrate BIM, IoT, and linked data. It is lower for longitudinal, head-to-head studies proving that one semantic stack is operationally superior across different schools, vendors, and maintenance teams.

#### Cuidados específicos por variável

Do not treat BIM geometry alone as a digital twin. Do not assume IFC by itself covers dynamic controls, occupancy semantics, or all live sensor relationships. Do not map eCO2 as if it were true CO2, and do not let generic vendor point names replace explicit semantic typing. A visually rich 3D scene can still be semantically poor if rooms, assets, sensors, and rules are not represented in a machine-checkable way.

### Arquitetura IoT

#### Arquitetura do sistema

The most defensible architecture is layered. Authoring BIM and asset handover use IFC as the geometric and asset backbone, IDS to formalize information requirements, and bSDD to stabilize terminology. Operational semantics are then added through linked data approaches such as ifcOWL, BOT, and Brick, while live sensor observations are carried through MQTT or BMS connectors and exposed through APIs such as OGC SensorThings or W3C WoT descriptions. Time-series storage, graph storage, and dashboards then consume the same canonical identifiers instead of maintaining disconnected copies.

#### Conectividade e protocolos

Classroom twins often need two protocol families at once: building and field protocols such as BACnet, Modbus, or vendor APIs for operational systems, and IoT or web protocols such as MQTT, HTTP, SensorThings, and WoT descriptions for telemetry integration. The strategic choice is not one protocol to rule all others, but a normalized semantics layer that allows heterogeneous protocols to coexist without losing machine-readable meaning. For TCC scope, MQTT plus an open API layer is usually simpler than attempting full native BIM and BMS unification inside one proprietary platform.

#### Interoperabilidade e modelo de dados

The strongest pattern in the literature is layered semantic interoperability. IFC carries authored building and asset structure; IDS specifies what information must be present and verifiable; bSDD stabilizes definitions and classifications; ifcOWL enables RDF or OWL representation of IFC semantics; BOT offers a lightweight spatial topology core; Brick adds operational building assets, points, and relationships; and SensorThings or WoT provide interoperable live interfaces for observations and device metadata. The practical implication is that no single schema solves the whole problem. A robust digital twin uses complementary standards and explicit mappings instead of forcing one model to represent geometry, operations, and telemetry equally well.

#### Cibersegurança, privacidade e ética

Semantic interoperability increases the power of data integration, which also increases governance risk. When room schedules, occupancy traces, HVAC control states, and environmental observations are linked under one graph, the system can reveal staff and student routines even without names. Appropriate controls include role-based access, encrypted transport, device identity, audit trails for mappings and rule changes, and clear data-minimization choices for occupancy and acoustic data. The ethics issue is not only cyber intrusion, but also over-inference from highly connected datasets.

### Análise, decisão e automação

#### Métodos analíticos

Useful analytical methods include graph queries over rooms and assets, rule-based validation of handover requirements, linkage checks between points and spaces, time-series analysis of room performance, anomaly detection for mislabeled points, and cross-layer reasoning that joins telemetry with topology and equipment context. Once semantics are stable, higher-level analytics such as FDD, ventilation diagnostics, intervention ranking, and cross-building benchmarking become more defensible because the variables are attached to known entities.

#### Índice ou modelo derivado

A useful derived model is a room-state or room-readiness layer that combines environmental conditions, data freshness, room occupancy context, and equipment state while preserving explainability. Another useful output is a semantic health score for the twin itself, combining mapping completeness, metadata completeness, and stale-link rate. These are secondary models; they should never replace the explicit asset graph and raw observations they are derived from.

#### Intervenção e automação

Once interoperability is stable, the twin can support low-risk automation such as alert routing, room prioritization, maintenance ticket generation, and supervised ventilation or filtration recommendations. More advanced actions such as BMS setpoint changes or automated fault handling should only be layered on after the semantic and provenance chain is dependable. The major benefit is not autonomous control by itself, but the ability to tie actions to the correct room, asset, and evidence stream.

### Resultados e avaliação

#### Viabilidade e aceitação

Feasibility is good for a bounded pilot if the scope is disciplined: one clean IFC model, a small room set, a limited variable set, and a small number of mappings that can be verified manually. Acceptance is usually higher when end users see practical outputs such as room history, easier fault localization, and transparent asset context rather than a complex 3D interface for its own sake. The main barrier is usually information governance and mapping labor, not the absence of standards.

#### Validade e limitações

The main validity constraint is that semantic coherence depends on the quality of both the source BIM and the live operational data. IFC can represent a rich authored model, but it is not a complete operational ontology; Brick and related linked-data models improve this, but mappings introduce their own complexity. Prototype studies show that integration is possible, yet many implementations remain custom, project-specific, and lightly benchmarked over time. Results should therefore be interpreted as a strong architectural direction rather than a universally solved interoperability problem.

#### Contribuições e lacunas

The clearest contribution of the current literature is the convergence on a layered open stack instead of a one-model fantasy. BIM and IFC remain the backbone for asset and spatial information, while semantic web technologies, ontologies, and open IoT APIs supply the operational and dynamic layers needed for digital twins. The largest research gaps are longitudinal school-scale validation, repeatable mappings between IFC and operational ontologies, better treatment of uncertain or proxy measurements in semantic schemas, and clearer evidence that interoperable twins outperform simpler dashboards in real maintenance and IEQ workflows.


---

## Referências e fontes consolidadas

As entradas abaixo preservam as referências e os identificadores informados nos resultados temáticos. Duplicatas textuais exatas foram removidas; variantes da mesma obra foram mantidas para não eliminar informação bibliográfica potencialmente útil.

### Referências bibliográficas

- ASHRAE. ASHRAE Position Document on Indoor Carbon Dioxide. Approved February 12, 2025; expires February 12, 2028.
- Ge B, Tieskens K, Vyas P, Botana Martinez MP, Yuan Y, Walsh KH, Main L, Bolton L, Yajima M, Fabian MP. Decision tools for schools using continuous indoor air quality monitors: a case study of CO2 in Boston Public Schools. The Lancet Regional Health - Americas. 2025;48:101148.
- Yuan Y, Yajima M, Lee J, Walsh KH, Tong B, Main L, Bolton L, Fabian MP. Estimating air exchange rates in thousands of elementary school classrooms using commercial CO2 sensors and machine learning. Indoor Environments. 2025.
- Honan D, Gallagher J, Garvey J, Littlewood J. Indoor Air Quality in Naturally Ventilated Primary Schools: A Systematic Review of the Assessment & Impacts of CO2 Levels. Buildings. 2024;14(12):4003.
- Mendez S, Gamelas CA, Felizardo M, Canha N, Correia C. Monitoring Indoor Air Quality in Classrooms Using Low-Cost Sensors: Does the Perception of Teachers Match Reality? Atmosphere. 2024;15(12):1450.
- Zivelonghi A, Giuseppi A. Smart Healthy Schools: An IoT-enabled concept for multi-room dynamic air quality control. Internet of Things and Cyber-Physical Systems. 2024;4:24-31.
- US EPA. A Guide to Siting and Installing Air Sensors. Last updated January 7, 2026.
- US EPA. Air Sensor Use and Study Design. Last updated April 20, 2026.
- Kirkil G. Effects of classroom temperature and humidity on student learning performance: an experimental study using sensor-based monitoring. Frontiers in Built Environment. 2025;11:1678438.
- Botana Martinez MP, Vyas PD, Walsh KH, Main L, Bolton L, Yuan Y, Yajima M, Fabian MP. Rethinking heat in thousands of school classrooms through continuous monitoring and novel exposure metrics. Indoor Environments. 2025;2(3):100105.
- de la Hoz-Torres ML, Aguilar-Aguilera AJ, Ruiz-Padillo DP, Martinez-Aires MD. An investigation of indoor thermal environments and thermal comfort in naturally ventilated educational buildings. Journal of Building Engineering. 2024;84:108677.
- Rizzo K, Camilleri M, Gatt D, Yousif C. Optimising Mechanical Ventilation for Indoor Air Quality and Thermal Comfort in a Mediterranean School Building. Sustainability. 2024;16(2):766.
- Hernandez W, Cañas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Al Jumaili T, Sabbagh M. Systematic Review for the Assessment of Indoor Environment Quality Factors and Sub-Indicators of Classrooms. International Journal of Sustainable Development and Planning. 2024;19(8):3255-3263.
- EPB Center. EN 16798-1: Indoor environmental input parameters for design and assessment of energy performance of buildings. Summary page accessed August 11, 2026.
- World Health Organization. WHO global air quality guidelines: particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide. Geneva, 2021.
- U.S. EPA. Low-Cost Air Pollution Monitors and Indoor Air Quality. Web guidance, accessed 2026-08-11.
- U.S. EPA. A Guide to Siting and Installing Air Sensors. Web guidance, accessed 2026-08-11.
- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments, 2024.
- Barros N et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors, 2024.
- Canha N, Correia C, Mendez S, Gamelas CA, Felizardo M. Monitoring Indoor Air Quality in Classrooms Using Low-Cost Sensors: Does the Perception of Teachers Match Reality? Atmosphere, 2024.
- Azoulay Kochavi S, Kira O, Gal E. Real-Time Monitoring of Environmental Parameters in Schools to Improve Indoor Resilience Under Extreme Events. Smart Cities, 2025.
- Zou Y et al. Examining the functional range of commercially available low-cost airborne particle sensors and consequences for monitoring of indoor air quality in residences. Indoor Air, 2020.
- Sensirion. Datasheet SEN5x. 2022.
- Plantower. PMS5003 laser PM sensor product sheet. Accessed 2026-08-11.
- World Health Organization. WHO Guidelines for Indoor Air Quality: Selected Pollutants. Formaldehyde chapter. Copenhagen, 2010.
- Roslan NS et al. A review of indoor air quality in classrooms: The effect of particulate matter, gaseous pollutants, and airborne pathogens. Environmental Pollution, 2026.
- Rodenas Garcia M et al. Review of low-cost sensors for indoor air quality: Features and applications. Applied Spectroscopy Reviews, 2022.
- Sensirion. Data Sheet SFA30. 2025.
- Sensirion. Compliance of Sensirion's VOC Sensors with Building Standards. 2023.
- Alphasense. CO-B4 product page and datasheet link. Accessed 2026-08-11.
- Alphasense. OX-B431 and O3 sensor product pages. Accessed 2026-08-11.
- Interlink Electronics. Nitrogen Dioxide Sensor 110-5XX datasheet. 2023.
- Synthesis based on Department for Education. Acoustic design of schools: performance standards (BB93), 2015; Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129; Picaut J, Can A, Fortin N, Ardouin J, Lagrange M. Low-Cost Sensors for Urban Noise Monitoring Networks: A Literature Review. Sensors. 2020;20(8):2256; Mealings K et al. The Effects of Classroom Acoustic Conditions on Teachers' Health and Well-Being: A Scoping Review. J Speech Lang Hear Res. 2024;67(1):346-367; Fretes G, Palau R. The Impact of Noise on Learning in Children and Adolescents: A Meta-Analysis. Applied Sciences. 2025;15(8):4128; Mealings K et al. The effects of classroom acoustic quality on student perception and wellbeing: a systematic review across educational levels. Frontiers in Psychology. 2025.
- Synthesis based on Price LLA, Dahlmann-Noor A, Khazova M. Daylight and Electric Lighting in Primary and Secondary School Classrooms in the UK: An Observational Study. Int J Environ Res Public Health. 2024;21(7):942; Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129; Suarez-Garcia A, Lorenzo-Suarez I, Alonso-Gonzalez J et al. A Low-Cost Luxometer Benchmark for Solar Illuminance Measurement System Based on the Internet of Things. Sensors. 2022;22(19):7107; Department for Education. Generic Design Brief, Daylight and lighting sections, 2014; Society of Light and Lighting. Lighting Guide 5: Lighting for Education, 2011; selected classroom visual-comfort and dynamic-lighting studies from higher and school education.
- Sulistiyanti SR, Komarudin M, Setyawan FXA, Septama HD, Yulianti T, Ammar MF. Analyzing the Impact of Occupancy Patterns on Indoor Air Quality in University Classrooms Using a Real-Time Monitoring System. International Journal of Advanced Computer Science and Applications. 2024;15(10).
- Ramos A, Jesus V, Goncalves C, Caetano F, Silveira C. Monitoring Indoor Air Quality and Occupancy with an IoT System: Evaluation in a Classroom Environment. 2023 18th Iberian Conference on Information Systems and Technologies (CISTI). 2023.
- Vake D, Hrovatin N, Vicic J, Tosic A. Occupancy estimation using indoor air quality data: opportunities and privacy implications. Energy and Buildings. 2025;343:115894.
- Monti L, Tse R, Tang SK, Mirri S, Delnevo G, Maniezzo V, Salomoni P. Edge-Based Transfer Learning for Classroom Occupancy Detection in a Smart Campus Context. Sensors. 2022;22(10):3692.
- Rus T, Moldovan RP, Marza CM, Corsiuc G, Ilutiu-Varvara DA. Data-driven environments: Evaluating IoT sensors and KNX protocol for monitoring indoor conditions in educational facilities. Frontiers in Built Environment. 2025;11:1688582.
- US EPA. Reference Guide for Indoor Air Quality in Schools. Accessed August 11, 2026.
- Texas Instruments. Catch Your Breath: Which Is a Better Occupancy Detector - mmWave or PIR? Technical article, republished 2023.
- CDC. Ventilation in Schools and Childcare Programs. Updated October 4, 2024.
- ASHRAE. ASHRAE Standard 241, Control of Infectious Aerosols. Accessed August 11, 2026.
- Morakinyo OM, Ana GREE. Seasonal levels and size fractions of indoor air bioaerosols as predictors of respiratory morbidities among school pupils in Ibadan, Nigeria. Frontiers in Public Health. 2025;13:1611167.
- Park S, Park J, Hwang J. Evaluation of Airborne Infection Risk in a School Using Multizone Simulation: Pathogen Transmission Between Students in Different Classrooms Through Corridors. Aerosol and Air Quality Research. 2025;25:19.
- Sedighi AA, Nardell EA, Nasiri F, Haghighat F. Revisiting the Wells-Riley airborne infection model: A critical analysis of its use and misuse. Building and Environment. 2025;280:113136.
- Feng X, Hu P, Jin T, et al. On-site monitoring of airborne pathogens: recent advances in bioaerosol collection and rapid detection. Aerobiologia. 2024;40:303-341.
- Mazzoli R, Filippini T, Ghermandi G, Vinceti M, Bigi A. Mitigating indoor risk of airborne infections using CO2 and PM measurements in university classroom: the MIRAI project. Journal of Environmental Health Science and Engineering. 2026;24:13.
- Peng Z, Jimenez JL. Exhaled CO2 as a COVID-19 Infection Risk Proxy for Different Indoor Environments and Activities. Environmental Science and Technology Letters. 2021;8(5):392-397.
- Cervantes R, Pena P, Riesenberger B, Rodriguez M, Henderson D, Goncalves S, Newire E, Pogner C, Salonen H, Almeida Silva M, Ferguson RMW, Haverinen-Shaughnessy U, Viegas C. Critical insights on fungal contamination in schools: a comprehensive review of assessment methods. Frontiers in Public Health. 2025;13:1557506.
- CDC NIOSH. Improving Air Cleanliness. October 3, 2024.
- CDC NIOSH. About Germicidal Ultraviolet (GUV). October 4, 2024.
- US EPA. Preventing the Spread of Respiratory Viruses in Public Indoor Spaces. 2026.
- ASHRAE. Design Guidance for Education Facilities: Prioritization for Advanced Indoor Air Quality (Version 2.0). 2023.
- Simona SC, Bartell SM, Vieira VM. Classroom air quality in a randomized crossover trial with portable HEPA air cleaners. Journal of Exposure Science and Environmental Epidemiology. 2025;35(4):644-648.
- Curtius J, Granzin M, Schrod J. Testing mobile air purifiers in a school classroom: Reducing the airborne transmission risk for SARS-CoV-2. Aerosol Science and Technology. 2021;55(5):586-599.
- Park S, Mistrick R, Rim D. Performance of upper-room ultraviolet germicidal irradiation (UVGI) system in learning environments: Effects of ventilation rate, UV fluence rate, and UV radiating volume. Sustainable Cities and Society. 2022;85:104048.
- Sun Y, Haghnazari D, Huang C-Y, Baig A, Kim M, Cunningham A, Skeen C, Wolfson JM, Ferguson ST, Pratt ED, Valeri L, Zhao S, Gold DR, Balaj L, Koutrakis P, Phipatanakul W, Lai PS. Air Purifier Intervention for Respiratory Viral Exposure in Elementary Schools: A Secondary Analysis of a Randomized Clinical Trial. JAMA Network Open. 2025;8(10):e2536951.
- Lindsley WG, Derk RC, Coyle JP, et al. Efficacy of portable air cleaners and masking for reducing indoor exposure to simulated exhaled SARS-CoV-2 aerosols. MMWR Morbidity and Mortality Weekly Report. 2021;70(27):972-976.
- US EPA. Wildfires and Indoor Air Quality in Schools and Commercial Buildings. Accessed August 11, 2026.
- US EPA. Best Practices Guide for Improving Indoor Air Quality in Commercial/Public Buildings During Wildland Fire Smoke Events. May 2025.
- US EPA. Using Air Quality Sensors for Smoke: What to Consider. 2026.
- Stampfer O, Zuidema C, Allen RW, Fox J, Sampson P, Seto E, Karr CJ. Practical considerations for using low-cost sensors to assess wildfire smoke exposure in school and childcare settings. Journal of Exposure Science and Environmental Epidemiology. 2024.
- Azoulay Kochavi S, Kira O, Gal E. Real-Time Monitoring of Environmental Parameters in Schools to Improve Indoor Resilience Under Extreme Events. Smart Cities. 2025;8(1):7.
- Kim S, Kang K, Park D, Kim T. Assessment of PM2.5 penetration based on airflow paths in Korean classrooms. Building and Environment. 2024;248:111103.
- Balmes JR. Should Schools Be Made Clean Air Spaces for Wildfire Smoke Episodes? JAMA Network Open. 2023;6(4):e235780.
- US EPA. How to Use Air Sensors: Air Sensor Guidebook. Enhanced 2022 version, accessed 2026-08-11.
- US EPA. A Guide to Siting and Installing Air Sensors. Accessed 2026-08-11.
- US EPA. Low-Cost Air Pollution Monitors and Indoor Air Quality. Accessed 2026-08-11.
- South Coast AQMD. AQ-SPEC Home Page and sensor evaluation program description. Accessed 2026-08-11.
- Peixe J, Marques G. Low-cost IoT-enabled indoor air quality monitoring systems: A systematic review. Journal of Ambient Intelligence and Smart Environments. 2024;16(2).
- Rodenas Garcia M, Spinazze A, Branco PTBS, Borghi F, Villena G, Cattaneo A, et al. Review of low-cost sensors for indoor air quality: Features and applications. Applied Spectroscopy Reviews. 2022.
- Hernandez W, Canas N. Sensing Classroom Temperature, Relative Humidity, Illuminance, CO2, and Noise: An Integral Solution Based on an IoT Device for Dense Deployments. Sensors. 2024;24(16):5129.
- Barros N, Mota T, Viegas C, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- ASHRAE. ASHRAE Position Document on Indoor Carbon Dioxide. Approved 2025-02-12.
- World Health Organization. WHO global air quality guidelines: particulate matter, ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide. 2021.
- Sensirion. Product pages for SCD41, SHT45, SEN55, and SGP41. Accessed 2026-08-11.
- Plantower. PMS5003 product page. Accessed 2026-08-11.
- Texas Instruments. OPT3001 ambient light sensor datasheet and technical article on mmWave versus PIR. Accessed 2026-08-11.
- TDK InvenSense. ICS-43434 digital MEMS microphone product page. Accessed 2026-08-11.
- OASIS. MQTT Version 5.0. OASIS Standard. 7 March 2019.
- LoRa Alliance. LoRaWAN Specification v1.1. Technical specification. Published 15 September 2023.
- Open Geospatial Consortium. OGC SensorThings API Part 1: Sensing Version 1.1 and SensorThings API standard overview. OGC standards documentation, accessed 2026-08-11.
- W3C. Web of Things Thing Description 2.0. W3C technical specification and related Web of Things documentation, accessed 2026-08-11.
- Project Haystack. Introduction to Project Haystack. Official documentation, accessed 2026-08-11.
- Brick Schema. Brick Ontology: Introduction. Official documentation, accessed 2026-08-11.
- Zhao L, Yang Y, Wu Z. Review of Communication Technology in Indoor Air Quality Monitoring System and Challenges. Electronics. 2022;11(18):2926.
- Saini J, Dutta M, Marques G. Indoor Air Quality Monitoring Systems Based on Internet of Things: A Systematic Review. International Journal of Environmental Research and Public Health. 2020;17(14):4942.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro MS. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- NIST. NISTIR 8259 Series. Cybersecurity for IoT product manufacturers and supporting capabilities. Web guidance updated through 2026.
- Calvo I, Espin A, Gil-Garcia JM, Fernandez P. Scalable IoT Architecture for Monitoring IEQ Conditions in Public and Private Buildings. Energies. 2022;15(6):2270.
- Pazhanivel DB, Velu AN, Palaniappan BS. Design and Enhancement of a Fog-Enabled Air Quality Monitoring and Prediction System: An Optimized Lightweight Deep Learning Model for a Smart Fog Environmental Gateway. Sensors. 2024;24(15):5069.
- Pietraru RN, Olteanu A, Adochiei IR, Adochiei FC. Reengineering Indoor Air Quality Monitoring Systems to Improve End-User Experience. Sensors. 2024;24(8):2659.
- Ferreira LM, Coelho FA, Pereira J. Databases in Edge and Fog Environments: A Survey. ACM Computing Surveys. 2024;56(11).
- Lopes SI, Orlowski C, Branco P, Karatzas K, et al. Low-Cost Sensor Systems and IoT Technologies for Indoor Air Quality Monitoring: Instrumentation, Models, Implementation, and Perspectives for Validation. Sensors. 2025;25(24):7567.
- Barros N, Sobral P, Moreira RS, Vargas J, Fonseca A, Abreu I, Guerreiro M, et al. SchoolAIR: A Citizen Science IoT Framework Using Low-Cost Sensing for Indoor Air Quality Management. Sensors. 2024;24(1):148.
- Tran QV, Doan DT, Jack N, Ghaffarianhoseini A, Ghaffarianhoseini A, Zhang T. AI Management Platform for Privacy-Preserving Indoor Air Quality Control: Review and Future Directions. Journal of Building Engineering. 2025;100:111712.
- Hashir PK, Veerasingam S, Haris RM, Sadooni F, Ghani S. Artificial Intelligence for Enhancing Indoor Air Quality in Educational Environments: A Review and Future Perspectives. Sustainability. 2025;17(22):10117.
- Godasiaei SH, Ejohwomu OA, Zhong H, Booker D. Integrating experimental analysis and machine learning for enhancing energy efficiency and indoor air quality in educational buildings. Building and Environment. 2025;276:112874.
- Boston Public Schools. Indoor Air Quality Sensor Dashboard and district IAQ information pages. Accessed 2026-08-11.
- USGBC. School District Indoor Air Quality Management Plans Toolkit. 2025.
- Tran MT, Wei W, Dassonville C, Martinsons C, Ducruet P, Mandin C, Hequet V, Wargocki P. Review of Parameters Measured to Characterize Classrooms' Indoor Environmental Quality. Buildings. 2023;13(2):433.
- Wargocki P, Wei W, Bendzalova J, Espigares-Correa C, Gerard C, Greslou O, Rivallain M, Sesana MM, Olesen BW, Zirngibl J, Mandin C. TAIL, a new scheme for rating indoor environmental quality in offices and hotels undergoing deep energy renovation (EU ALDREN project). Energy and Buildings. 2021;244:111029.
- Tran MT, Wei W, Dassonville C, Martinsons C, Ducruet P, Derbez M, Mandin C, Hequet V, Wargocki P. Expanding the application of the TAIL rating scheme to schools: schoolTAIL. Energy and Buildings. 2026;354:116942.
- Zhang D, Mui KW, Wong LT. Ten Questions Concerning Indoor Environmental Quality (IEQ) Models: The Development and Applications. Applied Sciences. 2023;13(5):3343.
- Mujan I, Licina D, Kljajic M, Culic A, Andjelkovic AS. Development of indoor environmental quality index using a low-cost monitoring platform. Journal of Cleaner Production. 2021;312:127846.
- Lopez Carreno RD, Pardo-Bosch F, Aidarov S, Boix-Cots D, Pujadas P. A Simplified Classroom Indoor Air Quality Risk Index: Application in the Mediterranean Region to Support the Enhanced Design of Educational Environments. Applied Sciences. 2025;15(7):4033.
- Loreto Falone A, et al. Field Measurements of Indoor Environmental Quality in School Classrooms: A Systematic Review. Applied Sciences. 2025;15(10):5692.
- Natividad CA, Opon J. Sustainability-Qualified IEQ Indicators for Academic Buildings: A Systematic Review (2010-2025) and SDG-Aligned Framework. Sustainability. 2026;18(9):4260.
- CSTB. Indoor Environmental Quality Indexes. Published 2024-01-10.
- Brink HW, Loomans MGLC, Mobach MP, Kort HSM. Classrooms' indoor environmental conditions affecting the academic achievement of students and teachers in higher education: a systematic literature review. Indoor Air. 2021;31(2):405-425.
- Grassie D, Milczewska K, Renneboog S, Scuderi F, Dimitroulopoulou S. Impact of Indoor Air Quality, Including Thermal Conditions, in Educational Buildings on Health, Wellbeing, and Performance: A Scoping Review. Environments. 2025;12(8):261.
- Dedesko S, Pendleton J, Young AS, Coull BA, Spengler JD, Allen JG. Associations between indoor air exposures and cognitive test scores among university students in classrooms with increased ventilation rates for COVID-19 risk management. Journal of Exposure Science & Environmental Epidemiology. 2025;35(4):661-671.
- Afifi S, Kamel T, Ezzeldin S. Indoor environmental quality assessment of naturally-ventilated school classrooms within a dense arid urban setting of Cairo, Egypt. Scientific Reports. 2025;15:16245.
- Pellegatti M, Visentin C, Torresin S, Babich F, Wargocki P, Prodi N. Combined and cross-modal effects of acoustic and indoor air quality conditions on sensory and cognitive responses of university students. Building and Environment. 2026;288:114005.
- US Environmental Protection Agency. How Does Indoor Air Quality Impact Student Health and Academic Performance? Accessed August 11, 2026.
- US Environmental Protection Agency. A Guide to Siting and Installing Air Sensors. Last updated January 7, 2026.
- US Environmental Protection Agency. Air Sensor Use and Study Design. Last updated April 20, 2026.
- Brazil. Law No. 13,709 of 2018 (General Personal Data Protection Law, LGPD), consolidated text accessed August 11, 2026.
- Brazilian National Data Protection Authority (ANPD). Personal Data Processing for Academic Purposes and for Conducting Studies and Research: Guidance. Version 1.0. June 2023.
- Brazilian National Data Protection Authority (ANPD). Preliminary Study on Legal Bases Applicable to the Processing of Personal Data of Children and Adolescents. 2022.
- Brazilian National Data Protection Authority (ANPD). Information Security Guidance for Small Data Processing Agents. Version 1.0. October 2021.
- Brazilian National Data Protection Authority (ANPD). Privacy Impact Assessment (RIPD) guidance and FAQ. Accessed August 11, 2026.
- Brazilian National Data Protection Authority (ANPD). Security Incident Communication guidance under CD/ANPD Resolution No. 15 of April 24, 2024. Accessed August 11, 2026.
- NIST. IR 8259 Rev. 1: Foundational Cybersecurity Activities for IoT Product Manufacturers. April 2026.
- NIST. IR 8259A: IoT Device Cybersecurity Capability Core Baseline. May 2020.
- NIST. Privacy Framework 1.1. Accessed August 11, 2026.
- Pinto GP, Donta PK, Dustdar S, Prazeres CVS. A Systematic Review on Privacy-Aware IoT Personal Data Stores. Sensors. 2024;24(7):2197.
- Jayousi M, Lucattini G, Mucchi L, et al. Smart Learning by Design: A Framework for IoT-Driven Adaptive Learning Environments and Inclusive Education. Education Sciences. 2025;15(10):1338.
- US EPA. A Guide to Siting and Installing Air Sensors. Last updated 2026-01-07.
- Canha N, Correia C, Mendez S, Gamelas CA, Felizardo M. Monitoring Indoor Air Quality in Classrooms Using Low-Cost Sensors: Does the Perception of Teachers Match Reality? Atmosphere. 2024;15(12):1450.
- Broden K, Andersson J, Kitkowska A, Ahmad A, Mozelius P. Gathering requirements for IoT-assisted wellbeing in elementary school - a multi-stakeholder perspective. Frontiers in Education. 2025;10:1580666.
- US EPA. Reference Guide for Indoor Air Quality in Schools. Accessed 2026-08-11.
- buildingSMART International. IFC 4.3.2.0 Documentation. Official openBIM standard documentation, accessed 2026-08-11.
- buildingSMART International. Information Delivery Specification (IDS) 1.0. Official standard page, accessed 2026-08-11.
- buildingSMART International. buildingSMART Data Dictionary (bSDD). Official service documentation, accessed 2026-08-11.
- buildingSMART Technical. ifcOWL. Official overview, accessed 2026-08-11.
- Open Geospatial Consortium. OGC SensorThings API standard overview and interoperability material, accessed 2026-08-11.
- W3C. Web of Things and Thing Description work. Official standards pages, accessed 2026-08-11.
- Brick Consortium. Brick Ontology: Introduction. Official documentation, accessed 2026-08-11.
- Linked Building Data Community Group. Building Topology Ontology (BOT). Official documentation, accessed 2026-08-11.
- Boje C, Guerriero A, Kubicki S, Rezgui Y. Towards a semantic Construction Digital Twin: directions for future research. Automation in Construction. 2020;114:103179.
- Tuhaise VV, Tah JHM, Abanda FH. Technologies for digital twin applications in construction. Automation in Construction. 2023;152:104931.
- Daniotti B, Masera G, Bolognesi CM, Spagnolo SL, Pavan A, Iannaccone G, Signorini M, Ciuffreda S, Mirarchi C, Lucky M, Cucuzza M. The Development of a BIM-Based Interoperable Toolkit for Efficient Renovation in Buildings: From BIM to Digital Twin. Buildings. 2022;12(2):231.
- Chung J, Shelden D. A Framework of ifcJSON-Based Digital Twin Platform for Monitoring Building Environment Using BIM, IoT, and Semantic Web Technologies. In: Advances in Information Technology in Civil and Building Engineering - Proceedings of ICCCBE 2024 - Volume 1. 2025. pp. 39-53.
- Vittori F, Tan CF, Pisello AL, Chong A, Miller C. BIM-to-BRICK: Using graph modeling for IoT/BMS and spatial semantic data interoperability within digital data models of buildings. arXiv:2307.13197. 2023.
- Abdelrahman M, Macatulad E, Lei B, Quintana M, Miller C, Biljecki F. What is a Digital Twin Anyway? Deriving the Definition for the Built Environment from over 15,000 Scientific Publications. Building and Environment. 2025;274:112748.

### DOI, URLs e identificadores persistentes

- https://www.ashrae.org/file%20library/about/position%20documents/pd-on-indoor-carbon-dioxide-english.pdf
- https://doi.org/10.1016/j.lana.2025.101148
- https://www.sciencedirect.com/science/article/pii/S2950362025000128
- https://doi.org/10.3390/buildings14124003
- https://doi.org/10.3390/atmos15121450
- https://doi.org/10.1016/j.iotcps.2023.05.005
- https://www.epa.gov/air-sensor-toolbox/guide-siting-and-installing-air-sensors
- https://www.epa.gov/air-sensor-toolbox/air-sensor-use-and-study-design
- https://sensirion.com/products/catalog/SCD41
- https://senseair.com/product/sunrise/
- https://sensirion.com/products/catalog/SGP30
- https://doi.org/10.3389/fbuil.2025.1678438
- https://doi.org/10.1016/j.indenv.2025.100105
- https://doi.org/10.1016/j.jobe.2024.108677
- https://doi.org/10.3390/su16020766
- https://doi.org/10.3390/s24165129
- https://doi.org/10.18280/ijsdp.190837
- https://epb.center/document/en-16798-1/
- https://sensirion.com/products/catalog/SHT45
- https://sensirion.com/resource/datasheet/sht4x
- https://www.who.int/publications/i/item/9789240034228
- https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts/types-of-pollutants
- https://www.epa.gov/indoor-air-quality-iaq/low-cost-air-pollution-monitors-and-indoor-air-quality
- https://doi.org/10.3233/AIS-220577
- https://doi.org/10.3390/s24010148
- https://doi.org/10.3390/smartcities8010007
- https://doi.org/10.1111/ina.12621
- https://sensirion.com/resource/datasheet/sen5x
- https://www.plantower.com/en/products_33/74.html
- https://www.ncbi.nlm.nih.gov/books/NBK138711/
- https://pubmed.ncbi.nlm.nih.gov/41856267/
- https://www.tandfonline.com/doi/full/10.1080/05704928.2022.2085734
- https://sensirion.com/resource/datasheet/sfa30
- https://sensirion.com/resource/application_note/compliance_VOC_sensors_building_standards
- https://www.alphasense.com/products/view-by-target-gas/co-b4
- https://www.alphasense.com/products/view-by-target-gas/ozone-sensors-o3
- https://www.interlinkelectronics.com/downloads/subsidiary-docs/spec-sensors/Nitrogen-Dioxide-Sensor-110507_110508_110509_1.pdf
- https://doi.org/10.3390/ijerph21070942 ; https://pubmed.ncbi.nlm.nih.gov/39063519/ ; https://doi.org/10.3390/s24165129 ; https://doi.org/10.3390/s22197107 ; https://assets.publishing.service.gov.uk/media/5a7c215d40f0b645ba3c6df5/ITT_Volume_5_Part_B_Generic_Design_Brief_V6_Feb_2014.pdf ; https://s3.amazonaws.com/fonteva-customer-media/00D8E0000008w4FUAQ/LG05%202011%20b.pdf ; https://pubmed.ncbi.nlm.nih.gov/27409963/ [dynamic-lighting study]
- https://doi.org/10.14569/IJACSA.2024.0151051
- https://doi.org/10.23919/CISTI58278.2023.10211974
- https://doi.org/10.1016/j.enbuild.2025.115894
- https://doi.org/10.3390/s22103692
- https://doi.org/10.3389/fbuil.2025.1688582
- https://www.epa.gov/iaq-schools/reference-guide-indoor-air-quality-schools
- https://www.ti.com/lit/pdf/sszt759
- https://www.cdc.gov/niosh/ventilation/guidelines/index.html
- https://www.ashrae.org/technical-resources/bookstore/ashrae-standard-241-control-of-infectious-aerosols
- https://doi.org/10.3389/fpubh.2025.1611167
- https://doi.org/10.1007/s44408-025-00024-y
- https://doi.org/10.1016/j.buildenv.2025.113136
- https://doi.org/10.1007/s10453-024-09824-y
- https://doi.org/10.1007/s40201-026-00984-2
- https://doi.org/10.1021/acs.estlett.1c00183
- https://doi.org/10.3389/fpubh.2025.1557506
- https://www.cdc.gov/niosh/ventilation/prevention/air-cleanliness.html
- https://www.cdc.gov/niosh/ventilation/germicidal-ultraviolet/index.html
- https://www.epa.gov/indoor-air-quality-iaq/preventing-spread-respiratory-viruses-public-indoor-spaces
- https://school-infrastructure.org/resources/design-guidance-for-education-facilities-prioritization-for-advanced-indoor-air-quality-version-20-1ca/
- https://doi.org/10.1038/s41370-025-00743-9
- https://doi.org/10.1080/02786826.2021.1877257
- https://doi.org/10.1016/j.scs.2022.104048
- https://doi.org/10.1001/jamanetworkopen.2025.36951
- https://www.cdc.gov/mmwr/volumes/70/wr/mm7027e1.htm
- https://sensirion.com/products/catalog/SEN55
- https://www.epa.gov/emergencies-iaq/wildfires-and-indoor-air-quality-schools-and-commercial-buildings
- https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P101HCVK.TXT
- https://www.epa.gov/wildfires/using-air-quality-sensors-smoke-what-consider
- https://stacks.cdc.gov/view/cdc/169969
- https://doi.org/10.1016/j.buildenv.2023.111103
- https://doi.org/10.1001/jamanetworkopen.2023.5780
- https://www.airnow.gov/publications/wildfire-smoke-guide/wildfire-smoke-a-guide-for-public-health-officials/
- https://www.epa.gov/air-sensor-toolbox/wildfire-smoke-air-monitoring-response-technology-wsmart
- https://www.epa.gov/air-sensor-toolbox/how-use-air-sensors-air-sensor-guidebook
- https://www.aqmd.gov/aq-spec
- https://www.epa.gov/air-sensor-toolbox/air-sensor-collocation-opportunities
- https://www.epa.gov/air-research/instruction-guide-and-macro-analysis-tool-evaluating-air-sensors-collocation-federal
- https://sensirion.com/products/catalog/SGP41
- https://www.ti.com/lit/gpn/OPT3001
- https://www.ti.com/document-viewer/lit/html/SSZT759
- https://www.invensense.tdk.com/products/ics-43434
- https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
- https://resources.lora-alliance.org/technical-specifications/lorawan-specification-v1-1
- https://www.ogc.org/standards/sensorthings/
- https://www.w3.org/WoT/
- https://www.w3.org/TR/wot-thing-description-2.0/
- https://www.project-haystack.org/
- https://marketing.project-haystack.org/submitted-articles/introduction-to-project-haystack
- https://brickschema.org/
- https://doi.org/10.3390/electronics11182926
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7400061/
- https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program/nistir-8259-series
- https://doi.org/10.3390/en15062270
- https://doi.org/10.3390/s24155069
- https://doi.org/10.3390/s24082659
- https://doi.org/10.1145/3666001
- https://doi.org/10.3390/s25247567
- https://doi.org/10.1016/j.jobe.2024.111712
- https://www.mdpi.com/2071-1050/17/22/10117
- https://doi.org/10.1016/j.buildenv.2025.112874
- https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality/indoor-air-quality-sensor-dashboard
- https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality
- https://www.usgbc.org/sites/default/files/2025-09/CFGS_School-IAQ-Management-Toolkit-FINAL_0.pdf
- https://school-infrastructure.org/resources/decision-tools-for-schools-using-continuous-indoor-air-quality-monitors-a-case-study-of-co2-in-boston-public-schools-1bd/
- https://www.bu.edu/igs/research/chess/
- https://doi.org/10.3390/buildings13020433
- https://doi.org/10.1016/j.enbuild.2021.111029
- https://doi.org/10.1016/j.enbuild.2026.116942
- https://doi.org/10.3390/app13053343
- https://doi.org/10.1016/j.jclepro.2021.127846
- https://doi.org/10.3390/app15074033
- https://www.mdpi.com/2076-3417/15/10/5692
- https://doi.org/10.3390/su18094260
- https://www.cstb.fr/en-us/all-the-news/indoor-environmental-quality-indexes
- https://orbit.dtu.dk/en/publications/review-of-parameters-measured-to-characterize-classrooms-indoor-e/
- https://orbit.dtu.dk/en/publications/tail-a-new-scheme-for-rating-indoor-environmental-quality-in-offi/
- https://orbit.dtu.dk/en/publications/expanding-the-application-of-the-tail-rating-scheme-to-schools-sc/
- https://doi.org/10.1111/ina.12745
- https://doi.org/10.3390/environments12080261
- https://doi.org/10.1038/s41370-025-00770-6
- https://doi.org/10.1038/s41598-025-98602-y
- https://doi.org/10.1016/j.buildenv.2025.114005
- https://www.epa.gov/iaq-schools/how-does-indoor-air-quality-impact-student-health-and-academic-performance
- https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/web-guia-anpd-tratamento-de-dados-para-fins-academicos.pdf/%40%40display-file/file
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/estudo-preliminar-tratamento-de-dados-crianca-e-adolescente.pdf/%40%40display-file/file
- https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-vf.pdf/%40%40display-file/file
- https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd
- https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis
- https://doi.org/10.6028/NIST.IR.8259r1
- https://doi.org/10.6028/NIST.IR.8259A
- https://www.nist.gov/privacy-framework
- https://doi.org/10.3390/s24072197
- https://doi.org/10.3390/educsci15101338
- https://doi.org/10.3389/feduc.2025.1580666
- https://schoolair.org/en/
- https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/index.html
- https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/
- https://www.buildingsmart.org/users/services/buildingsmart-data-dictionary/
- https://technical.buildingsmart.org/standards/ifc/ifc-formats/ifcowl/
- https://w3c-lbd-cg.github.io/bot/
- https://doi.org/10.1016/j.autcon.2020.103179
- https://doi.org/10.1016/j.autcon.2023.104931
- https://doi.org/10.3390/buildings12020231
- https://doi.org/10.1007/978-3-031-84208-5_4
- https://doi.org/10.48550/arXiv.2307.13197
- https://doi.org/10.1016/j.buildenv.2025.112748
