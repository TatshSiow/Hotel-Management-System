var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
	const { user, userId } = req.signedCookies;
	const [rows, fields] = await mysql.execute(
      'SELECT * FROM `itemlist` ORDER BY id DESC'
    );
  
  return res.status(200).render('itemlist/index', { user, title: 'itemlist', rows });
});

module.exports = router;