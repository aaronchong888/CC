var config = require('./config.js');
var pg = require('pg');

// Change to config.pg_local_url if working on local
var pgURL = config.pg_server_url;
var Pool = require('pg-pool');
var url = require('url')

const params = url.parse(pgURL);
const auth = params.auth.split(':');
const db_config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true,
  max: 200, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};
var pool = new Pool(db_config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

function pgQuery(queryString, callback) {
    pool.connect(function(err, client, done){
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query(queryString, function(err, result) {
            if (err) {
                return console.error('Error running query ', err);
            }
            callback(null, result);
            //call `done()` to release the client back to the pool
            done();
        });
    });
}

module.exports = {
    insertUser: function(name, flight, type, target, country, language, callback) {
        var insertUserQueryString = 'INSERT INTO userinfo VALUES (DEFAULT, \'' + name + '\',\'' + flight + '\',\'' + type + '\',\'' + target + '\',\'' + country + '\',\'' + language+ '\')';
        pgQuery(insertUserQueryString, function(err) {
            if (err) {
                callback(err);
            } else {
                pgQuery('SELECT user_id FROM userinfo WHERE name=\'' + name + '\'', function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(result.rows[0].user_id);
                    }
                });
            }
        });
    },
    createChatRoom: function(callback) {
        var createChatRoomQueryString = 'INSERT INTO chatroom VALUES (DEFAULT)';
        pgQuery(createChatRoomQueryString, function(err) {
            if (err) {
                callback(err);
            } else {
                pgQuery('SELECT MAX(rm_id) AS rm_id FROM chatroom', function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result.rows[0].rm_id);
                    }
                });
            }
        });
    },
    insertMessage: function(rm_id, user_id, msg_type, msg_content, unix_time, callback) {
        var insertMessageQueryString = 'INSERT INTO message VALUES (DEFAULT, \'' + rm_id + '\',\'' + user_id + '\',\'' + msg_type + '\',\'' + msg_content + '\', to_timestamp(' + unix_time + '))';
        pgQuery(insertMessageQueryString, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },
    getMessage: function(rm_id, limit, callback) {
        // No need for time zone conversion!
        var getMessageQueryString = 'SELECT user_id, msg_type, msg_content, to_char(time, \'HH24:MI\') as time FROM message JOIN chatroom ON chatroom.rm_id=message.rm_id WHERE chatroom.rm_id=\'' + rm_id + '\'' + ' LIMIT ' + limit;

        pgQuery(getMessageQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result.rows);
            }
        });
    }
};
