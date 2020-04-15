CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(10) NOT NULL,
  password varchar(30) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE notes (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  body varchar(3000) DEFAULT NULL,
  cursor_position int DEFAULT NULL,
  selected tinyint(1) DEFAULT 0,
  in_process tinyint(1) DEFAULT 0,
  is_saved tinyint(1) DEFAULT 0,
  user_id int DEFAULT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  deleted_at datetime DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY title (title),
  KEY user_id (user_id),
  CONSTRAINT notes_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE
  SET
    NULL ON UPDATE CASCADE
);
CREATE TABLE user_sessions (
  session_id varchar(60) NOT NULL,
  user_id int DEFAULT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (session_id),
  KEY user_id (user_id),
  CONSTRAINT user_sessions_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE
  SET
    NULL ON UPDATE CASCADE
);