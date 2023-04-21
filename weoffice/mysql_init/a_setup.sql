
CREATE DATABASE IF NOT EXISTS todo;
USE todo;

-- teamList
CREATE TABLE teamList (
  idx INT UNSIGNED AUTO_INCREMENT,
  nameEng varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  nameKor varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  ,PRIMARY KEY (idx)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원 기본 정보';


INSERT INTO teamList (idx, nameEng, teamKor) VALUES
(1, 'dev', '개발팀'),
(2, 'hr', '인사팀');


-- auth
CREATE TABLE auth (
  idx int UNSIGNED NOT NULL AUTO_INCREMENT,
  userId varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  userName varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  teamId int NOT NULL
  ,PRIMARY KEY (idx)
  ,INDEX( teamId )
  ,INDEX( userId )

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- teamTodoList
CREATE TABLE teamTodoList (
  idx int UNSIGNED NOT NULL AUTO_INCREMENT,
  teamId int NOT NULL,
  contents varchar(9999) NOT NULL,
  createDate varchar(20) NOT NULL,
  creatorId varchar(20) NOT NULL,
  creatorName varchar(20) NOT NULL,
  creatorTeamId int NOT NULL,
  updaterId varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  updateDate varchar(20) DEFAULT NULL,
  updaterName varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  updaterTeamId int DEFAULT NULL,
  tag json DEFAULT NULL,
  status int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- todoList
CREATE TABLE todoList (
  idx int UNSIGNED NOT NULL AUTO_INCREMENT,
  contents varchar(9999) NOT NULL,
  status int NOT NULL DEFAULT '0',
  creatorName varchar(20) NOT NULL,
  creatorId varchar(20) NOT NULL,
  createDate varchar(20) NOT NULL,
  creatorTeamId int NOT NULL,
  updaterName varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  updaterId varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  updateDate varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  updaterTeamId int DEFAULT NULL,
  tag json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- user추가
CREATE USER 'todo'@'%' IDENTIFIED BY '1234';
GRANT USAGE ON *.* TO 'todo'@'%';
GRANT EXECUTE, SELECT, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON `todo`.* TO 'todo'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

ALTER USER 'todo'@'%' IDENTIFIED WITH mysql_native_password BY '1234';