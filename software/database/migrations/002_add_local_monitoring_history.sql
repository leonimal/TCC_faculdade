-- Faixas locais de acompanhamento e ocorrências informativas.
-- Não representam classificação normativa, conforto térmico ou conformidade da sala.

CREATE TABLE local_monitoring_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  version INT UNSIGNED NOT NULL,
  status ENUM('ENABLED','DISABLED','SUPERSEDED') NOT NULL,
  requested_by VARCHAR(120) NOT NULL,
  justification VARCHAR(500) NOT NULL,
  source_reference VARCHAR(500) NULL,
  effective_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_local_profile_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT uq_local_profile_version UNIQUE (device_id, version),
  INDEX ix_local_profile_active (device_id, status, effective_at)
);

CREATE TABLE local_monitoring_rules (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  profile_id BIGINT UNSIGNED NOT NULL,
  variable ENUM('TEMPERATURE_C','RELATIVE_HUMIDITY_PCT','ILLUMINANCE_LX') NOT NULL,
  lower_limit DECIMAL(12,3) NOT NULL,
  upper_limit DECIMAL(12,3) NOT NULL,
  CONSTRAINT fk_local_rule_profile FOREIGN KEY (profile_id) REFERENCES local_monitoring_profiles(id),
  CONSTRAINT uq_local_rule_variable UNIQUE (profile_id, variable),
  CONSTRAINT chk_local_rule_order CHECK (lower_limit < upper_limit)
);

CREATE TABLE local_monitoring_occurrences (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  measurement_id CHAR(36) NOT NULL,
  profile_id BIGINT UNSIGNED NOT NULL,
  profile_version INT UNSIGNED NOT NULL,
  rule_id BIGINT UNSIGNED NOT NULL,
  variable ENUM('TEMPERATURE_C','RELATIVE_HUMIDITY_PCT','ILLUMINANCE_LX') NOT NULL,
  direction ENUM('BELOW','ABOVE') NOT NULL,
  observed_value DECIMAL(12,3) NOT NULL,
  lower_limit DECIMAL(12,3) NOT NULL,
  upper_limit DECIMAL(12,3) NOT NULL,
  occurred_at DATETIME(3) NOT NULL,
  recorded_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_local_occurrence_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT fk_local_occurrence_measurement FOREIGN KEY (measurement_id) REFERENCES measurements(measurement_id),
  CONSTRAINT fk_local_occurrence_profile FOREIGN KEY (profile_id) REFERENCES local_monitoring_profiles(id),
  CONSTRAINT fk_local_occurrence_rule FOREIGN KEY (rule_id) REFERENCES local_monitoring_rules(id),
  CONSTRAINT uq_local_occurrence_rule_measurement UNIQUE (measurement_id, rule_id),
  INDEX ix_local_occurrence_device_time (device_id, occurred_at)
);
