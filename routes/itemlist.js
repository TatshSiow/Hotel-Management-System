var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const { user, userId } = req.signedCookies;
    if (!user) {
      return res.redirect('/user/login');
    }
    const [rows, fields] = await mysql.execute(
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

router.post('/delete', async function(req, res, next) {
  const { id } = req.body;

  try {
    const deleteQuery = 'DELETE FROM `itemlist` WHERE id = ?';
    console.log('Delete SQL Query:', deleteQuery);

    const [deleteRows, deleteFields] = await mysql.execute(deleteQuery, [id]);

    if (deleteRows.affectedRows !== 1) {
      throw new Error('刪除失敗');
    }

    // 如果需要重新加载整个列表，可以保留以下这部分
    const [selectitemlistRows, selectitemlistFields] = await mysql.execute('SELECT * FROM `itemlist`');
    
    return res.status(200).json({
      status: true,
      message: '刪除成功',
      data: selectitemlistRows,
    });
  } catch (e) {
    console.error('Error deleting item:', e);
    console.log('ID attempted to delete:', id); // 添加这一行
    console.log('Erro r details:', e); // 添加这一行


    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

module.exports = router;
