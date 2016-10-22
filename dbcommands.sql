DROP DATABASE IF EXISTS ccdb;
CREATE DATABASE ccdb;
\connect ccdb;

DROP TABLE IF EXISTS chat_room;

CREATE TABLE userinfo (
    user_id serial PRIMARY KEY,
    name VARCHAR(40),
    flight VARCHAR(6),
    type TEXT,
    target TEXT,
    country VARCHAR(20),
    language VARCHAR(2)
);

CREATE TABLE chatroom (
    rm_id serial PRIMARY KEY
);

CREATE TABLE message (
    msg_id serial PRIMARY KEY,
    rm_id VARCHAR(40) REFERENCES chatroom(rm_id),
    user_id VARCHAR(40) REFERENCES userinfo(user_id),
    msg_type TEXT,
    msg_content TEXT,
    time TIMESTAMPTZ
);