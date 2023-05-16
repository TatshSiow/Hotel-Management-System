//導入模組
var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

/*從router用GET指令取得user UserID的cookie
然後設rows,fields來取得SQL裡面的資料
SELECT itemlist的所有東西，照著ID升序排列*/
router.get('/', async function(req, res, next) {
	const { user, userId } = req.signedCookies;
	const [rows, fields] = await mysql.execute(
      'SELECT * FROM `itemlist` ORDER BY id ASC'
    );

//將得到的資料（user,rows --- title自定義）回傳到itemlist/index
  return res.status(200).render('itemlist/index', { user, title: 'itemlist', rows });
});

//模組回傳至router
module.exports = router; 