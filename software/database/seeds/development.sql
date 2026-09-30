INSERT INTO devices (public_id, name, active)
VALUES ('classroom-node-01', 'Nó de desenvolvimento da sala de aula', TRUE)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  active = VALUES(active);

INSERT INTO classrooms (code, name, building, floor, active)
VALUES ('DEV-01', 'Sala de desenvolvimento', 'Ambiente local', NULL, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name), building = VALUES(building), active = VALUES(active);

INSERT INTO device_classroom_assignments (device_id, classroom_id, installation_position, responsible, notes)
SELECT d.id, c.id, 'Ambiente de desenvolvimento', 'development-seed', 'Cadastro controlado; não representa coleta experimental.'
FROM devices d INNER JOIN classrooms c ON c.code = 'DEV-01'
WHERE d.public_id = 'classroom-node-01'
  AND NOT EXISTS (SELECT 1 FROM device_classroom_assignments a WHERE a.device_id = d.id AND a.unassigned_at IS NULL);

INSERT INTO sampling_configurations (
  device_id,
  version,
  sampling_interval_seconds,
  status,
  requested_by,
  acknowledged_at
)
SELECT
  id,
  1,
  60,
  'APPLIED',
  'development-seed',
  CURRENT_TIMESTAMP(3)
FROM devices
WHERE public_id = 'classroom-node-01'
ON DUPLICATE KEY UPDATE
  sampling_interval_seconds = VALUES(sampling_interval_seconds),
  status = VALUES(status),
  requested_by = VALUES(requested_by),
  acknowledged_at = VALUES(acknowledged_at),
  rejection_reason = NULL;
