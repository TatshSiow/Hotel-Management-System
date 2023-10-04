var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();
const util = require('util'); // 引入util模塊

router.get('/', async function(req, res, next) {
    const { user, userId } = req.signedCookies;
    if (!user) {
      return res.redirect('/user/login');
    }
    const [rows,fields] = await mysql.execute(
        'SELECT * FROM itemlist ORDER BY id ASC');

  return res.status(200).render('itemlist/index', { user, title: 'itemlist', rows });
});

router.post('/submit', async function(req, res, next) {
  const { itemcode, quantity, price } = req.body;
  try {
    const [rows, fields] = await mysql.execute('INSERT INTO `itemlist` (itemcode, quantity, price) VALUES (?, ?, ?)', [itemcode, quantity, price]);
    if (rows.affectedRows !== 1) {
      throw new Error('寫入失敗');
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

// 在這裡添加一個新的POST路由處理程序，用於刪除項目
router.post('/delete', async function(req, res, next) {
  const { id } = req.body; // 假設前端在請求中發送了要刪除的項目的ID

  try {
    // 刪除項目的SQL語句
    const deleteQuery = 'DELETE FROM `itemlist` WHERE id = ?';

    // 執行SQL語句
    const [deleteRows, deleteFields] = await mysql.execute(deleteQuery, [id]);

    if (deleteRows.affectedRows !== 1) {
      throw new Error('刪除失敗');
    }

    // 成功刪除後，重新獲取剩餘的項目列表
    const [selectitemlistRows, selectitemlistFields] = await mysql.execute('SELECT * FROM `itemlist`');
    
    return res.status(200).json({
      status: true,
      message: '刪除成功',
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
