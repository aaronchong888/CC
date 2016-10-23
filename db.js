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

var q1 = [], q2 = [], q3 = [], q4  = [], q5 = [];
module.exports = {
    insertUser: function(name, flight, type, target, country, language, callback) {
        var insertUserQueryString = 'INSERT INTO userinfo VALUES (DEFAULT, \'' + name + '\',\'' + flight + '\',\'' + type + '\',\'' + target + '\',\'' + country + '\',\'' + language+ '\')';
        pgQuery(insertUserQueryString, function(err) {
            if (err) {
                callback(err);
            } else {
                pgQuery('SELECT user_id, type FROM userinfo WHERE user_id = (SELECT MAX(user_id) FROM userinfo)', function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        switch(result.rows[0].type) {
                            case "business":
                                q1.push(result.rows[0].user_id);
                                break;
                            case "traveler":
                                q2.push(result.rows[0].user_id);
                                break;
                            case "homereturn":
                                q3.push(result.rows[0].user_id);
                                break;
                            case "transit":
                                q4.push(result.rows[0].user_id);
                                break;
                            default:
                                q5.push(result.rows[0].user_id);
                        }
                        console.log('PUSHING TO A USER TO QUEUE');
                        console.log(q5);
                        callback(result.rows[0].user_id);
                    }
                });
            }
        });
    },
    getUserId: function(name, callback) {
        var getUserIdQueryString = 'SELECT MAX(user_id) AS user_id FROM userinfo';
        pgQuery(getUserIdQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result.rows[0].user_id);
            }
        });
    },
    getChatRoom: function(user_id, callback) {
        var getChatRoomQueryString = 'SELECT rm_id FROM chatroom WHERE user_id1 =\'' + user_id + '\'' +'or user_id2 =\'' + user_id + '\'';
        pgQuery(getChatRoomQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result.rows[0].rm_id);
            }
        });
    },
    deleteChatRoom: function(rm_id, callback) {
        var getChatRoomQueryString = 'DELETE FROM chatroom WHERE rm_id =\'' + rm_id + '\'';
        pgQuery(getChatRoomQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null);
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
        var getMessageQueryString = 'SELECT name, msg_type, msg_content, to_char(time, \'HH24:MI\') as time FROM userinfo, message WHERE userinfo.user_id=message.user_id and message.rm_id=\'' + rm_id + '\'' + ' LIMIT ' + limit;

        pgQuery(getMessageQueryString, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result.rows);
            }
        });
    }
};

function createChatRoom(uid1, uid2, callback){
    var createChatRoomQueryString = 'INSERT INTO chatroom VALUES (DEFAULT, \'' + uid1 + '\', \'' + uid2 + '\')';
    pgQuery(createChatRoomQueryString, function(err) {
        if (err) {
            callback(err);
        } else {
            console.log('CREATED!');
        }
    });
}

var uid1, uid2;
function check_queue() {
    console.log('>>>>>>>>>>>>>QUEUE CHECKING');
    console.log('Q1 waiting: ' + q1.length);
    console.log('Q2 waiting: ' + q2.length);
    console.log('Q3 waiting: ' + q3.length);
    console.log('Q4 waiting: ' + q4.length);
    console.log('Q5 waiting: ' + q5.length);
    if(q1.length > 0){
        if (q1.length > 1){
            uid1 = q1.shift();
            uid2 = q1.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q2.length > 0){
            uid1 = q1.shift();
            uid2 = q2.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q3.length > 0){
            uid1 = q1.shift();
            uid2 = q3.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q4.length > 0){
            uid1 = q1.shift();
            uid2 = q4.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q5.length > 0){
            uid1 = q1.shift();
            uid2 = q5.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
    }
    if(q2.length > 0){
        if (q2.length > 1){
            uid1 = q2.shift();
            uid2 = q2.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q3.length > 0){
            uid1 = q2.shift();
            uid2 = q3.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q4.length > 0){
            uid1 = q2.shift();
            uid2 = q4.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q5.length > 0){
            uid1 = q2.shift();
            uid2 = q5.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
    }
    if(q4.length > 0){
        if (q4.length > 1){
            uid1 = q4.shift();
            uid2 = q4.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q3.length > 0){
            uid1 = q4.shift();
            uid2 = q3.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q5.length > 0){
            uid1 = q4.shift();
            uid2 = q5.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
            return;
        }
    }
    if(q5.length > 0){
        if (q5.length > 1){
            uid1 = q5.shift();
            uid2 = q5.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
            return;
        }
        if (q3.length > 0){
            uid1 = q5.shift();
            uid2 = q3.shift();
            createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
            return;
        }
    }
    if (q3.length > 1){
        uid1 = q3.shift();
        uid2 = q3.shift();
        createChatRoom(uid1, uid2, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
        return;
    }
}

setInterval(check_queue,1000);
