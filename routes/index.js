var express = require('express');
var router = express.Router();
var db = require('../db.js');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/chatroom', function (req, res, next) {
  // Force page refresh on redirects and hitting "go back" button.
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  var renderData = {
    title: 'chatter',
    loginMessage: null,
    errorMessage: null,
    usernameInputPlaceholder: 'Set username...',
    loggedIn: currUser
  }

  var currUser = req.session.username;
  if (!currUser) {
    renderData.errorMessage = 'Please set a username before joining a room';
  } else {
    renderData.loginMessage = 'Logged in as ' + currUser + '.';
    renderData.usernameInputPlaceholder = 'Change username...'
  }

  res.render('chatroom', renderData);
});

router.post('/login', function (req, res, next) {
  req.session.username = req.body.username;
  console.log(req.session);
  res.end('done');
});

router.get('/login', function (req, res, next) {
  res.send(req.session.username);
});

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'chatter'
  });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/menu', function (req, res, next) {
  res.render('menu');
});

router.get('/chat', function (req, res, next) {
  res.render('chat');
});

router.post('/insertUser', function (req, res, next) {
  db.insertUser(req.body.name,
    req.body.flight,
    req.body.type,
    req.body.target,
    req.body.country,
    req.body.language,
    function (response) {
      console.log(response);
    });
});

router.post('/insertUser', function (req, res, next) {
  db.insertUser(req.body.name,
    req.body.flight,
    req.body.type,
    req.body.target,
    req.body.country,
    req.body.language,
    function (response) {
      console.log(response);
    });
});


module.exports = router;
