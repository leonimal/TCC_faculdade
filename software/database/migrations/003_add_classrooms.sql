-- Salas cadastradas e vínculo histórico entre um nó e seu local de instalação.
-- Cadastros adicionais não representam, por si só, coleta experimental.

CREATE TABLE classrooms (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(64) NOT NULL,
  name VARCHAR(120) NOT NULL,
  building VARCHAR(120) NULL,
  floor VARCHAR(64) NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT uq_classroom_code UNIQUE (code)
);

CREATE TABLE device_classroom_assignments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  device_id BIGINT UNSIGNED NOT NULL,
  classroom_id BIGINT UNSIGNED NOT NULL,
  assigned_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  unassigned_at DATETIME(3) NULL,
  installation_position VARCHAR(500) NULL,
  installation_height_cm DECIMAL(7,2) NULL,
  responsible VARCHAR(120) NULL,
  notes VARCHAR(1000) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_assignment_device FOREIGN KEY (device_id) REFERENCES devices(id),
  CONSTRAINT fk_assignment_classroom FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
  CONSTRAINT chk_assignment_window CHECK (unassigned_at IS NULL OR unassigned_at >= assigned_at),
  INDEX ix_assignment_device_active (device_id, unassigned_at),
  INDEX ix_assignment_classroom_active (classroom_id, unassigned_at)
);

ALTER TABLE measurements
  ADD COLUMN classroom_id BIGINT UNSIGNED NULL AFTER device_id,
  ADD CONSTRAINT fk_measurement_classroom FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
  ADD INDEX ix_measurements_classroom_time (classroom_id, measured_at);

ALTER TABLE local_monitoring_occurrences
  ADD COLUMN classroom_id BIGINT UNSIGNED NULL AFTER device_id,
  ADD CONSTRAINT fk_local_occurrence_classroom FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
  ADD INDEX ix_local_occurrence_classroom_time (classroom_id, occurred_at);
