var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();
const argon2 = require('argon2');

router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

  res.render('user/index', { title: '會員中心', user, error });
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '登入' });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('user');

  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  const [rows,fields] = await mysql.execute('SELECT * FROM `user` WHERE username = ?', [username]);

  if (rows.length != 1) {
    return res.status(200).json({
      'status': false,
      'message': '帳號或密碼錯誤',
    });
  }

  const user = rows[0];

  if (!await argon2.verify(user.password, password)) {
    return res.status(200).json({
      'status': false,
      'message': '帳號或密碼錯誤',
    });
  }

  res.cookie('user', user.name, {signed: true});

  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

router.get('/register', function(req, res, next) {
  res.render('user/register', { title: '註冊' });
});

router.post('/register', async function(req, res, next) {
  const { username, password, name } = req.body;
  const hashedPassowrd = await argon2.hash(password);

  const [rows,fields] = await mysql.execute('INSERT INTO `user` (username, password, name) VALUES (?, ?, ?)', [username, hashedPassowrd, name]);

  if(rows !== 1) {
    return res.status(200).json({
      'status': false,
      'message': '註冊失敗',
    });
  }

  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

module.exports = router;
