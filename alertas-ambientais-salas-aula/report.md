# Parâmetros tecnicamente fundamentados para alertas ambientais em sala de aula

## Table of contents

1. [Illuminance](#illuminance) — Variable: Illuminance | Unit: lux
2. [Indoor dry-bulb air temperature](#indoor-dry-bulb-air-temperature) — Variable: Indoor dry-bulb air temperature | Unit: °C
3. [Indoor air relative humidity](#indoor-air-relative-humidity) — Variable: Indoor air relative humidity | Unit: % RH

## Illuminance

### Source Identification

- **Title:** ABNT NBR ISO/CIE 8995-1:2013; ISO/CIE 8995-1:2025; AMEV guidance on DIN EN 12464-1 classroom lighting; DIAL school lighting summary; Vishay VEML7700 documentation; and peer-reviewed studies on one-point classroom daylight measurement and low-cost lux-sensor performance
- **Author Or Body:** ABNT; ISO/TC 274 and CIE; Arbeitskreis Maschinen- und Elektrotechnik staatlicher und kommunaler Verwaltungen (AMEV); DIAL; Vishay Semiconductors; Suarez-Garcia et al.; Ackley, Donn, and Thomas
- **Edition Year:** ABNT NBR ISO/CIE 8995-1 published 2013-03-21; ISO/CIE 8995-1 published 2025-01; AMEV recommendation page published 2025; DIAL knowledge-base summary updated 2016; VEML7700 product information current as indexed in 2026; peer-reviewed supporting papers from 2018 and 2022
- **Persistent Identifier:** https://www.dinmedia.de/en/standard/abnt-nbr-iso-cie-8995-1/186200781 ; https://www.iso.org/standard/76342.html ; https://www.cie.co.at/publications/light-and-lighting-lighting-work-places-part-1-indoor-0 ; https://www.umwelt-online.de/regelwerk/t_regeln/amev/0167_25.htm ; https://dialux4.support-en.dial.de/support/solutions/articles/9000080381-standard-values-for-schools ; https://www.vishay.com/en/product/84286/ ; https://www.vishay.com/en/optical-sensors/digital-output-amb-sensor/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC9571545/ ; https://www.researchgate.net/publication/330534226_Measuring_the_Daylight_Performance_of_Classrooms_Can_a_One_Point_Sensor_Measurement_Predict_the_Daylight_Distribution_within_a_Space
- **Source Type:** Standards-backed synthesis combining a Brazilian national standard catalog/status entry, international standard status pages, an official public DIN EN 12464-1 summary, a standards-derived school-lighting summary, manufacturer documentation, and peer-reviewed primary studies.
- **Source Hierarchy:** Highest weight: Brazil-specific standard status and indexed excerpts for ABNT NBR ISO/CIE 8995-1:2013 because the case study is in Brazil.<br>Next: ISO/CIE 8995-1:2025 and the AMEV DIN EN 12464-1 summary for current international and European status/context.<br>Then: Vishay documentation for VEML7700 metrology and peer-reviewed papers for the limits of one-point classroom illuminance measurement.

### Applicability

- **Environment Type:** Occupied indoor classrooms used at night, with electric lighting as the main source and possible residual daylight near dusk; also relevant to board or blackboard viewing surfaces inside the same room.
- **Occupant Profile:** Adult learners and teachers, with corrected-to-normal visual tasks such as reading, writing, board viewing, and note taking.
- **Education Stage:** Evening classes and adult education.
- **Excluded Conditions:** Do not transfer these values directly to art rooms, technical drawing rooms, laboratories, sports spaces, projector-only darkened scenes, or daylight-only design simulations without checking the relevant activity-specific requirement.<br>A single-point VEML7700 reading also does not replace a formal room-wide compliance survey.

### Parameter And Measurement

- **Variable:** Illuminance
- **Unit:** lux
- **Meaning Of Parameter:** This is a lighting adequacy and maintenance parameter for visual task performance, visual comfort support, and lighting-system screening.<br>In the dashboard context it should be used as a technical screening indicator, not as a full statement about comfort, pedagogy, or legal compliance.
- **Spatial Reference Zone:** For flexible or unknown desk layout, treat essentially the whole classroom as the task area while ignoring a marginal strip of about 0.5 m near the perimeter, and evaluate the work plane plus the board or blackboard separately.<br>A local node reading represents only its own point unless a grid survey demonstrates broader equivalence.
- **Measurement Position:** For work-plane assessment, use a horizontal reference plane around 0.75 m above the floor and keep the sensor away from direct sun patches, window edges, board luminaires, projector beams, and enclosure self-shadowing.<br>For board checks, measure the vertical writing area on the board surface itself.<br>If a proxy wall point is used instead of desk-plane placement, document that it is a proxy rather than a compliance point.
- **Sensor Orientation:** Level and upward-facing for horizontal work-plane illuminance; normal to the board surface for board illuminance; if using a wall-mounted proxy point, keep the sensing face vertical and record that orientation explicitly.
- **Spatial Representativeness:** A single VEML7700 provides only point illuminance.<br>It may track a local condition or, in some room geometries, approximate center-plane trends, but it cannot prove room-wide uniformity, board compliance, or daylight distribution over time.<br>Formal compliance requires multiple points or an area/grid method, not one point.
- **Unmeasured Relevant Variables:** Glare, luminance distribution, reflections on the board, wall and ceiling brightness, vertical eye illuminance, spectral quality, color rendering, blind position, projector use, task variation, seating distribution, and daylight autonomy remain outside a single-point lux reading.

### Metrology And Data Quality

- **Calibration Status:** An assembled VEML7700 node is not automatically a calibrated compliance lux meter.<br>Before using it for anything beyond rough screening, compare the installed sensor against a calibrated reference lux meter in the same orientation, mounting position, enclosure window, and lighting scenes expected in the room.
- **Response Time:** Selectable integration times of about 25, 50, 100, 200, 400, and 800 ms are commonly documented for VEML7700 implementations; longer integration improves low-light stability and shorter integration responds faster to scene changes.

### Alert Rule

- **Rule Basis:** Illuminance and uniformity targets come from standards-derived classroom lighting requirements, while persistence, aggregation, hysteresis, and rearm behavior are project engineering rules because no normative alert-timing rule was found.
- **Possible Management Investigation:** Check whether the classroom lights were switched on, dimmed, failed, shaded, blocked, or intentionally reduced for projection; verify sensor orientation, cleanliness, shadows, and distance from windows or luminaires; and compare the sensor point with the actual seated task area and the board area.

### Limitations And Traceability

- **Interpretation Limits:** Do not infer full visual comfort, glare control, student performance, or legal compliance from one VEML7700 point.<br>A point lux value cannot establish room-wide uniformity, board legibility, wall or ceiling brightness, or whether discomfort glare and reflections are controlled.
- **Overinterpretation Risk:** The largest risk is treating one lux value as if it represented the entire classroom.<br>In classrooms with strong daylight gradients, flexible seating, or dedicated board lighting, a single point can be materially higher or lower than the rest of the room and still appear numerically plausible.
- **Project Requirement:** Provide technically grounded illuminance parameters for the TCC dashboard and alert logic while making explicit that the node supports local screening and trend monitoring rather than formal room-wide lighting certification.
- **Destination In Text:** Use in the TCC methods section for sensor placement and orientation, in the alert-rule section for threshold justification, and in the limitations/discussion section for point-measurement representativeness and VEML7700 metrology caveats.

### Uncertain fields

- `aggregation_window`
- `clear_rule`
- `country_or_jurisdiction`
- `dashboard_message`
- `dashboard_state`
- `gap_and_outlier_handling`
- `instrument_specification`
- `limit_or_range`
- `normative_status`
- `operating_context`
- `room_operation_mode`
- `sampling_interval`
- `sensor_hysteresis_and_drift`
- `trigger_rule`
- `valid_data_requirement`
- `verification_state`


## Indoor dry-bulb air temperature

### Source Identification

- **Title:** Combined evidence set for classroom air temperature screening: ABNT NBR 17037:2023, RDC No.<br>886/2024, ANSI/ASHRAE Standard 55-2023, ASHRAE Handbook 2023 Educational Facilities chapter, and a 2024 Brazilian university classroom field study
- **Author Or Body:** ABNT; ANVISA; ASHRAE; Elsevier article authors for the supporting field study
- **Edition Year:** ABNT NBR 17037:2023; RDC No.<br>886 dated July 10, 2024, published July 12, 2024 and rectified July 25, 2024; ANSI/ASHRAE Standard 55-2023; 2023 ASHRAE Handbook HVAC Applications Chapter 8; Building and Environment article published June 15, 2024
- **Persistent Identifier:** https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000886&orgao=RDC%2FDC%2FANVISA%2FMS&seqAto=000&tipo=RDC&valorAno=2024 | https://www.ashrae.org/technical-resources/bookstore/standard-55-thermal-environmental-conditions-for-human-occupancy | https://handbook.ashrae.org/Handbooks/A23/SI/A23_Ch08/a23_ch08_si.aspx | https://doi.org/10.1016/j.buildenv.2024.111644 | https://www.dinmedia.de/en/standard/abnt-nbr-17037-versao-corrigida-2/385973540 | https://pt.scribd.com/document/897743446/ABNT-NBR-17037-2023-Versao-Corrigida-2023
- **Source Type:** Current technical standard, current revocation regulation, current HVAC standard, current handbook chapter, and supporting primary research article
- **Normative Status:** ABNT NBR 17037:2023, RDC No.<br>886/2024, and ANSI/ASHRAE Standard 55-2023 are current.<br>The ASHRAE Handbook chapter is current technical guidance.<br>RE No.<br>9/2003 is historical and revoked by RDC No.<br>886/2024.
- **Source Hierarchy:** Highest weight for artificially conditioned non-residential classrooms in Brazil: ABNT NBR 17037:2023, with RDC No.<br>886/2024 confirming that RE No.<br>9/2003 is revoked.<br>Highest weight for thermal-comfort interpretation and non-conditioned classrooms: ANSI/ASHRAE Standard 55-2023 plus the 2023 ASHRAE Educational Facilities chapter.<br>The 2024 Brazilian university classroom field study is supporting evidence and not a compliance source.

### Applicability

- **Country Or Jurisdiction:** Brazil for conditioned indoor-air-quality reference values; international for thermal-comfort interpretation.
- **Environment Type:** Occupied classroom or lecture classroom used during the evening period in a non-residential educational building.
- **Occupant Profile:** Predominantly healthy adolescents and adults, including students and instructor, performing sedentary learning activity.
- **Excluded Conditions:** Do not apply as a standalone comfort or compliance rule to preschoolers, sleeping occupants, high-metabolic activities, spaces dominated by radiant asymmetry, spaces with strong local drafts or direct solar gains not characterized, or any naturally ventilated or mixed-mode room assessed only by air temperature.

### Parameter And Measurement

- **Variable:** Indoor dry-bulb air temperature
- **Unit:** °C
- **Meaning Of Parameter:** Operational screening for conditioned-space indoor environmental control and partial evidence for thermal comfort interpretation.<br>It is not standalone proof of comfort, health protection, learning quality, or legal conformity in naturally ventilated classrooms.
- **Sensor Orientation:** No special directional orientation is normally required for dry-bulb air temperature, but the sensor should be shielded from radiant heating and direct airflow bias.
- **Spatial Representativeness:** A single fixed node is a point measurement and represents only its local microenvironment unless verified against room gradients or multiple positions.
- **Unmeasured Relevant Variables:** Mean radiant temperature, operative temperature, air speed, relative humidity, clothing insulation, metabolic rate, adaptive opportunities such as operable windows and fans, outdoor running-mean temperature, solar gains, occupancy density, and vertical air-temperature gradient.

### Alert Rule

- **Possible Management Investigation:** Check whether the room was in natural ventilation, mixed mode, or mechanical cooling; verify windows, blinds, fans, AC schedule and setpoint, sensor placement, occupancy surge, and exposure to sun or supply jets.<br>Do not infer the root cause from air temperature alone.

### Limitations And Traceability

- **Interpretation Limits:** Air temperature alone does not establish operative temperature, PMV or PPD, adaptive acceptability, health risk, learning impact, or legal noncompliance.<br>A single-point reading cannot demonstrate whole-room conditions or comfort for all occupants.
- **Overinterpretation Risk:** Users may incorrectly read a temperature alert as proof of discomfort, HVAC failure, unsafe conditions, or reduced learning performance.<br>That inference is not supported without additional variables and contextual checks.
- **Project Requirement:** Provide a transparent dashboard indicator for the TCC that distinguishes screened air-temperature deviation from actual thermal-comfort diagnosis and separates current conditioned-space reference values from historical revoked criteria.
- **Destination In Text:** Use in the literature review on indoor environmental quality, the methods section that explains alert logic, the results and discussion section on dashboard interpretation limits, and the conclusion on prototype scope.

### Uncertain fields

- `aggregation_window`
- `calibration_status`
- `clear_rule`
- `dashboard_message`
- `dashboard_state`
- `education_stage`
- `gap_and_outlier_handling`
- `instrument_specification`
- `limit_or_range`
- `measurement_position`
- `operating_context`
- `response_time`
- `room_operation_mode`
- `rule_basis`
- `sampling_interval`
- `sensor_hysteresis_and_drift`
- `spatial_reference_zone`
- `trigger_rule`
- `valid_data_requirement`
- `verification_state`


## Indoor air relative humidity

### Source Identification

- **Title:** Synthesis of current relative-humidity references for classrooms, combining ABNT NBR 17037:2023, ABNT NBR 16401-2:2024, ANSI/ASHRAE 55-2023, EPA school moisture guidance, and historical ANVISA RE 9/2003 revoked by RDC 886/2024
- **Author Or Body:** ABNT; ANVISA; ASHRAE; U.S. Environmental Protection Agency
- **Persistent Identifier:** https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000886&orgao=RDC%2FDC%2FANVISA%2FMS&seqAto=000&tipo=RDC&valorAno=2024 ; https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9434&cod_modulo=310&numeroAto=00000009&orgao=RE%2FDC%2FANVISA%2FMS&seqAto=001&tipo=RES&valorAno=2003 ; https://www.dinmedia.de/en/standard/abnt-nbr-17037-versao-corrigida-2/385973540 ; https://www.dinmedia.de/en/standard/abnt-nbr-16401-2/387178801 ; https://www.ashrae.org/technical-resources/bookstore/standard-55-thermal-environmental-conditions-for-human-occupancy ; https://www.ashrae.org/technical-resources/standards-and-guidelines/read-only-versions-of-ashrae-standards ; https://www.epa.gov/iaq-schools/moisture-control-part-indoor-air-quality-design-tools-schools
- **Source Type:** Current technical standards and official agency guidance, plus one historical revoked regulation used only for traceability
- **Normative Status:** Current IAQ reference for artificially conditioned non-residential spaces: ABNT NBR 17037:2023.<br>Current thermal-comfort references: ABNT NBR 16401-2:2024 and ANSI/ASHRAE 55-2023.<br>Historical only: ANVISA RE 9/2003, expressly revoked by RDC 886/2024.
- **Source Hierarchy:** Highest weight: official regulatory status pages and official standard catalog status pages.<br>Medium weight: official EPA school moisture guidance.<br>Lower weight: public secondary previews used only to inspect paywalled ABNT clause content.

### Applicability

- **Country Or Jurisdiction:** Brazil for ABNT and ANVISA applicability; international for ASHRAE thermal-comfort method; U.S.<br>EPA used only as non-Brazilian operational school moisture guidance
- **Environment Type:** University classroom or similar non-residential occupied room, especially if artificially conditioned
- **Occupant Profile:** Adult students and instructors; general healthy occupants performing sedentary or light activity
- **Education Stage:** Higher education / adult education
- **Excluded Conditions:** Do not use relative humidity alone to claim thermal comfort, health protection, learning impact, or full regulatory compliance.<br>The ABNT NBR 17037 humidity band applies to artificially conditioned non-residential environments.<br>EPA school guidance is operational guidance, not Brazilian compliance text.<br>Revoked RE 9/2003 must not be treated as a current legal limit.

### Parameter And Measurement

- **Variable:** Indoor air relative humidity
- **Unit:** % RH
- **Meaning Of Parameter:** Indoor-air-quality screening in conditioned rooms, moisture and mold attention screening, and one input variable in thermal-comfort assessment; not a sufficient comfort criterion by itself
- **Sensor Orientation:** No special orientation is normally required for capacitive RH sensing, but the sensor should be exposed to room air and protected from blocked airflow, direct discharge, radiant heating, and enclosure self-heating
- **Spatial Representativeness:** Point measurement only; it represents local air at the sensor and cannot prove uniformity or whole-room compliance
- **Unmeasured Relevant Variables:** Air temperature, mean radiant temperature, air speed, clothing, metabolic rate, occupancy density, outdoor conditions, outdoor air flow, moisture sources, condensation, and HVAC control state

### Metrology And Data Quality

- **Gap And Outlier Handling:** Flag missing, frozen, or physically implausible RH values; ignore obvious transients from startup, cleaning, direct breath plumes, or temporary local interference; do not bridge long gaps when deciding alert state

### Alert Rule

- **Rule Basis:** Normative basis for conditioned-space IAQ screening: ABNT NBR 17037:2023.<br>Comfort basis: ABNT NBR 16401-2:2024 and ANSI/ASHRAE 55-2023 require multi-variable thermal assessment, so any RH-only alert is an internal engineering triage rule.<br>Building moisture basis: EPA school guidance to keep RH below 60%, ideally 30% to 50%.<br>Historical traceability only: ANVISA RE 9/2003, revoked by RDC 886/2024.
- **Dashboard State:** Normal / Attention / Alert / Insufficient data
- **Dashboard Message:** Relative humidity is within the configured screening band, outside the conditioned-space screening band, persistently high for moisture attention, or persistently low for dryness attention.<br>This is a screening indicator only, not proof of comfort or legal noncompliance.
- **Possible Management Investigation:** Check whether windows, doors, fans, AC operation, occupancy density, cleaning or wet activities, rain intrusion, condensate drainage, or local sensor placement explain the reading

### Limitations And Traceability

- **Interpretation Limits:** Relative humidity alone cannot diagnose mold, ventilation adequacy, infection risk, sick-building effects, learning impact, or comfort acceptance.<br>A single sensor cannot separate room-wide conditions from a local microclimate.
- **Overinterpretation Risk:** Users may mistake a humidity alert for a legal violation or a direct health diagnosis, and may incorrectly assume normal RH proves full IAQ or thermal comfort
- **Project Requirement:** Support a low-cost classroom dashboard that separates current normative references from historical or operational guidance and avoids unsupported compliance claims
- **Destination In Text:** Methodology chapter for alert logic, results discussion for humidity behavior, and limitations section on what the dashboard can and cannot infer

### Uncertain fields

- `aggregation_window`
- `calibration_status`
- `clear_rule`
- `edition_year`
- `instrument_specification`
- `limit_or_range`
- `measurement_position`
- `operating_context`
- `response_time`
- `room_operation_mode`
- `sampling_interval`
- `sensor_hysteresis_and_drift`
- `spatial_reference_zone`
- `trigger_rule`
- `valid_data_requirement`
- `verification_state`
