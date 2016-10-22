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
    insertMessage: function(chatRoom, username, message, unix_time, callback) {
        var insertMessageQueryString = 'INSERT INTO message VALUES (DEFAULT, \'' + chatRoom + '\',\'' + username + '\',\'' + message + '\', to_timestamp(' + unix_time + '))';
        pgQuery(insertMessageQueryString, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },
    insertChatRoom: function(chatRoomName, callback) {
        var insertChatRoomQueryString = 'INSERT INTO chat_room VALUES (\'' + chatRoomName + '\')';
        pgQuery(insertChatRoomQueryString, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },
    getMessages: function(chatRoom, limit, callback) {
        // No need for time zone conversion!
        var getMessagesQueryString = 'SELECT username, msg, to_char(time, \'HH24:MI\') as time FROM message JOIN chat_room ON chat_room.room_name=message.room_name WHERE chat_room.room_name=\'' + chatRoom + '\'' + ' LIMIT ' + limit;

        pgQuery(getMessagesQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result.rows);
            }
        });
    },
    getChatRooms: function(callback) {
        pgQuery('SELECT * FROM chatroom', function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result.rows);
            }
        });
    }
};
