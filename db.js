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
  ssl: true
};
var pool = new Pool(db_config);

var count = 0
pool.on('connect', client => {
  client.count = count++;
});

pool.connect().then(client => {
    return client.query('SELECT $1::int AS "clientCount"', [client.count])
      .then(res => console.log(res.rows[0].clientCount)) // outputs 0
      .then(() => client)
}).then(client => client.release());

/*
function pgQuery(queryString, callback) {
    pg.connect(pgURL, function(err, client, done) {
        if (err) {
            callback(err);
        }
        client.query(queryString, function(err, result) {
            if (err) {
                return console.error('Error running query ', err);
            }
            callback(null, result);
            client.end();
        });
                
    });
}
*/

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
        pgQuery('SELECT room_name FROM chat_room', function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result.rows);
            }
        });
    }
};
