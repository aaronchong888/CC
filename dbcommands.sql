DROP DATABASE IF EXISTS ccdb;
CREATE DATABASE ccdb;
\connect ccdb;

DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS chatroom;
DROP TABLE IF EXISTS userinfo;

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
    rm_id serial PRIMARY KEY,
    user_id1 integer REFERENCES userinfo(user_id),
    user_id2 integer REFERENCES userinfo(user_id)
);

CREATE TABLE message (
    msg_id serial PRIMARY KEY,
    rm_id integer REFERENCES chatroom(rm_id),
    user_id integer REFERENCES userinfo(user_id),
    msg_type TEXT,
    msg_content TEXT,
    time TIMESTAMPTZ
);