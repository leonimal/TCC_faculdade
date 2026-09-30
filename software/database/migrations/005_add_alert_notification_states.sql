-- Estado de leitura individual para as notificações derivadas das ocorrências locais.
-- Não altera nem remove o histórico técnico de alertas.

CREATE TABLE user_alert_notification_states (
  user_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  last_cleared_at DATETIME(3) NOT NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_alert_notification_state_user
    FOREIGN KEY (user_id) REFERENCES application_users(id) ON DELETE CASCADE
);
