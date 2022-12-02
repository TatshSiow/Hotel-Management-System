var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user/index', { title: '會員中心' });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '登入' });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('username');
  res.redirect('/user/');
});

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;

  console.log({ username, password });

  if (username === 'user1' && password === '123456') {
    res.cookie('username', username);
  }

  // if success
  res.redirect('/user/');
});


module.exports = router;
