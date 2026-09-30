-- MySQL 8.0+ | esquema inicial v0.1
CREATE DATABASE IF NOT EXISTS tcc_iot
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE tcc_iot;

CREATE TABLE devices (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  public_id VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);

CREATE TABLE sampling_configurations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  version INT UNSIGNED NOT NULL,
  sampling_interval_seconds SMALLINT UNSIGNED NOT NULL,
  status ENUM('PENDING','APPLIED','REJECTED','SUPERSEDED') NOT NULL DEFAULT 'PENDING',
  requested_by VARCHAR(120) NOT NULL,
  requested_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  acknowledged_at DATETIME(3) NULL,
  rejection_reason VARCHAR(500) NULL,
  CONSTRAINT fk_config_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT uq_config_version UNIQUE (device_id, version),
  CONSTRAINT chk_sampling_interval CHECK (sampling_interval_seconds BETWEEN 10 AND 300)
);

CREATE TABLE experimental_runs (
  id CHAR(36) PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  configuration_id BIGINT UNSIGNED NOT NULL,
  run_type ENUM('FUNCTIONAL_TEST','PILOT','MAIN') NOT NULL,
  status ENUM('PLANNED','ACTIVE','COMPLETED','INVALIDATED') NOT NULL DEFAULT 'PLANNED',
  planned_start DATETIME(3) NULL,
  planned_end DATETIME(3) NULL,
  actual_start DATETIME(3) NULL,
  actual_end DATETIME(3) NULL,
  invalidation_reason VARCHAR(1000) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_run_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT fk_run_config FOREIGN KEY (configuration_id) REFERENCES sampling_configurations(id),
  CONSTRAINT chk_run_window CHECK (planned_end IS NULL OR planned_start IS NULL OR planned_end > planned_start),
  CONSTRAINT chk_actual_window CHECK (actual_end IS NULL OR actual_start IS NULL OR actual_end > actual_start)
);

CREATE TABLE measurements (
  measurement_id CHAR(36) PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  boot_id CHAR(36) NOT NULL,
  sequence_number BIGINT UNSIGNED NOT NULL,
  run_id CHAR(36) NULL,
  configuration_version INT UNSIGNED NOT NULL,
  measured_at DATETIME(3) NULL,
  device_uptime_ms BIGINT UNSIGNED NOT NULL,
  time_sync_status ENUM('SYNCED','UNSYNCED') NOT NULL,
  temperature_c DECIMAL(7,3) NULL,
  temperature_status ENUM('VALID','READ_ERROR','CRC_ERROR','OUT_OF_RANGE') NOT NULL,
  relative_humidity_pct DECIMAL(6,3) NULL,
  humidity_status ENUM('VALID','READ_ERROR','CRC_ERROR','OUT_OF_RANGE') NOT NULL,
  illuminance_lx DECIMAL(12,3) NULL,
  illuminance_status ENUM('VALID','READ_ERROR','CRC_ERROR','OUT_OF_RANGE') NOT NULL,
  payload_hash CHAR(64) NOT NULL,
  raw_payload JSON NOT NULL,
  first_received_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_measurement_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT fk_measurement_run FOREIGN KEY (run_id) REFERENCES experimental_runs(id),
  CONSTRAINT fk_measurement_config FOREIGN KEY (device_id, configuration_version)
    REFERENCES sampling_configurations(device_id, version),
  CONSTRAINT uq_measurement_sequence UNIQUE (device_id, boot_id, sequence_number),
  CONSTRAINT chk_synced_time CHECK (
    (time_sync_status = 'SYNCED' AND measured_at IS NOT NULL) OR
    (time_sync_status = 'UNSYNCED' AND measured_at IS NULL)
  ),
  CONSTRAINT chk_temperature_value CHECK (
    (temperature_status = 'VALID' AND temperature_c BETWEEN -40 AND 125) OR
    (temperature_status <> 'VALID' AND temperature_c IS NULL)
  ),
  CONSTRAINT chk_humidity_value CHECK (
    (humidity_status = 'VALID' AND relative_humidity_pct BETWEEN 0 AND 100) OR
    (humidity_status <> 'VALID' AND relative_humidity_pct IS NULL)
  ),
  CONSTRAINT chk_illuminance_value CHECK (
    (illuminance_status = 'VALID' AND illuminance_lx BETWEEN 0 AND 140000) OR
    (illuminance_status <> 'VALID' AND illuminance_lx IS NULL)
  ),
  INDEX ix_measurements_device_time (device_id, measured_at),
  INDEX ix_measurements_run_time (run_id, measured_at)
);

CREATE TABLE ingestion_attempts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  claimed_measurement_id CHAR(36) NOT NULL,
  device_id BIGINT UNSIGNED NULL,
  received_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  delivery_mode ENUM('ONLINE','REPLAYED') NOT NULL,
  sent_at DATETIME(3) NULL,
  queue_depth_before_send SMALLINT UNSIGNED NULL,
  queue_capacity SMALLINT UNSIGNED NULL,
  dropped_total BIGINT UNSIGNED NULL,
  payload_hash CHAR(64) NOT NULL,
  outcome ENUM('STORED','ALREADY_STORED','INTEGRITY_CONFLICT','REJECTED','SERVER_ERROR') NOT NULL,
  http_status SMALLINT UNSIGNED NOT NULL,
  request_id CHAR(36) NOT NULL UNIQUE,
  CONSTRAINT fk_attempt_device FOREIGN KEY (device_id) REFERENCES devices(id),
  INDEX ix_attempt_measurement (claimed_measurement_id, received_at)
);

CREATE TABLE device_status_reports (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  observed_at DATETIME(3) NULL,
  received_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  firmware_version VARCHAR(80) NOT NULL,
  connection_status ENUM('ONLINE','OFFLINE') NOT NULL,
  queue_depth SMALLINT UNSIGNED NOT NULL,
  queue_capacity SMALLINT UNSIGNED NOT NULL DEFAULT 256,
  dropped_total BIGINT UNSIGNED NOT NULL DEFAULT 0,
  last_confirmed_at DATETIME(3) NULL,
  time_sync_status ENUM('SYNCED','UNSYNCED') NOT NULL,
  details JSON NULL,
  CONSTRAINT fk_status_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT chk_queue_depth CHECK (queue_depth <= queue_capacity),
  INDEX ix_status_device_received (device_id, received_at)
);

CREATE TABLE measurement_flags (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  measurement_id CHAR(36) NOT NULL,
  flag ENUM('TIME_UNSYNC','DUPLICATE','OUTSIDE_WINDOW','CONFIG_MISMATCH','MANUAL_EXCLUSION') NOT NULL,
  reason VARCHAR(1000) NULL,
  created_by VARCHAR(120) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_flag_measurement FOREIGN KEY (measurement_id) REFERENCES measurements(measurement_id),
  CONSTRAINT uq_measurement_flag UNIQUE (measurement_id, flag)
);

CREATE TABLE operational_events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  run_id CHAR(36) NULL,
  category ENUM('READ_ERROR','CRC_ERROR','QUEUE_WARNING','QUEUE_OVERFLOW','OFFLINE','RECONNECTED','CONFIG_CHANGE','CLOCK_UNSYNC','OTHER') NOT NULL,
  started_at DATETIME(3) NOT NULL,
  ended_at DATETIME(3) NULL,
  affected_records INT UNSIGNED NULL,
  impact VARCHAR(1000) NULL,
  action_taken VARCHAR(1000) NULL,
  responsible VARCHAR(120) NULL,
  details JSON NULL,
  CONSTRAINT fk_event_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT fk_event_run FOREIGN KEY (run_id) REFERENCES experimental_runs(id),
  CONSTRAINT chk_event_window CHECK (ended_at IS NULL OR ended_at >= started_at)
);

CREATE TABLE alert_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profile_key VARCHAR(80) NOT NULL,
  version INT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  status ENUM('DRAFT','DOCUMENT_VERIFIED','EXPERIMENTALLY_EVALUATED','RETIRED','TEST_ONLY') NOT NULL DEFAULT 'DRAFT',
  jurisdiction VARCHAR(120) NULL,
  environment_type VARCHAR(120) NULL,
  operation_mode VARCHAR(120) NULL,
  source_reference VARCHAR(500) NULL,
  source_edition VARCHAR(80) NULL,
  applicability_notes TEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT uq_alert_profile_version UNIQUE (profile_key, version)
);

CREATE TABLE alert_rules (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profile_id BIGINT UNSIGNED NOT NULL,
  variable ENUM('TEMPERATURE_C','RELATIVE_HUMIDITY_PCT','ILLUMINANCE_LX') NOT NULL,
  lower_limit DECIMAL(12,3) NULL,
  upper_limit DECIMAL(12,3) NULL,
  aggregation_window_seconds INT UNSIGNED NULL,
  persistence_seconds INT UNSIGNED NULL,
  hysteresis DECIMAL(12,3) NULL,
  message_template VARCHAR(500) NOT NULL,
  source_clause VARCHAR(200) NULL,
  engineering_rule BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_alert_rule_profile FOREIGN KEY (profile_id) REFERENCES alert_profiles(id),
  CONSTRAINT chk_alert_bounds CHECK (lower_limit IS NOT NULL OR upper_limit IS NOT NULL),
  CONSTRAINT chk_alert_order CHECK (lower_limit IS NULL OR upper_limit IS NULL OR lower_limit < upper_limit)
);
