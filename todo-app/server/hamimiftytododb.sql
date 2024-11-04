DROP TABLE IF EXISTS task;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);
INSERT INTO task (description) VALUES ('First task');
INSERT INTO task (description) VALUES ('Another task');