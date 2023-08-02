var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const { user, userId } = req.signedCookies;
    const [rows,fields] = await mysql.execute(
        'SELECT * FROM itemlist ORDER BY id ASC');

//如果回傳值正確，則在rows中顯示資料    
  return res.status(200).render('itemlist/index', { user, title: 'itemlist', rows });
});

router.post('/submit', async function(req, res, next) {
  const { itemcode, quantity, price } = req.body;

  try {
    const [rows, fields] = await mysql.execute('INSERT INTO `itemlist` (itemcode, quantity, price) VALUES (?, ?, ?)', [itemcode, quantity, price]);
    if (rows.affectedRows !== 1) {
      throw new Error('寫入留言失敗');
    }

    const [selectitemlistRows, selectitemlistFields] = await mysql.execute('SELECT * FROM `itemlist`');
    
    return res.status(200).json({
      status: true,
      message: '成功',
      data: selectitemlistRows,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

module.exports = router;