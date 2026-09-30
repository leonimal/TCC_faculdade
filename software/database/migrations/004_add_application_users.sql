-- Contas humanas e sessoes da aplicacao. Credenciais de nos IoT continuam separadas.

CREATE TABLE application_users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(254) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN','VIEWER') NOT NULL DEFAULT 'VIEWER',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT uq_application_user_email UNIQUE (email)
);

CREATE TABLE application_sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  last_seen_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_application_session_user FOREIGN KEY (user_id) REFERENCES application_users(id) ON DELETE CASCADE,
  CONSTRAINT uq_application_session_token UNIQUE (token_hash),
  INDEX ix_application_sessions_expiry (expires_at),
  INDEX ix_application_sessions_user (user_id)
);
