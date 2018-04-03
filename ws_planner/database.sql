CREATE DATABASE if not exists ws_planner CHARACTER SET utf8;

CREATE TABLE if not exists ws_planner.plans(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  week VARCHAR(64) NOT NULL,
  topic VARCHAR(64) NOT NULL,
  notes VARCHAR(200) NOT NULL,
  resources VARCHAR(200) NOT NULL
);

-- Dummy data
use ws_planner
INSERT INTO plans (week, topic, notes, resources)
VALUES ('value1', 'value2', 'value3', 'value4')



