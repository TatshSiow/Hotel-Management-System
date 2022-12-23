var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();
router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;

  const [rows,fields] = await mysql.execute('SELECT `message`.`message`,`message`.`create_at`, `user`.`username` FROM `message` INNER JOIN `user` ON message.user_id = user.id');

  return res.render('message/index', { title: 'Express', user, rows });
});

module.exports = router;