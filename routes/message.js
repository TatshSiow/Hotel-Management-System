var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;

  const [rows,fields] = await mysql.execute('SELECT * FROM message');

  console.log({ rows });

  return res.render('message/index', { title: 'Express', user, rows });
});

module.exports = router;