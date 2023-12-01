var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const { user, userId } = req.signedCookies;
    if (!user) {
      return res.redirect('/user/login');
    }
    const [rows,fields] = await mysql.execute(
        'SELECT * FROM visitors ORDER BY id ASC');

  return res.status(200).render('visitors/index', { user, title: 'visitors', rows });
});

router.post('/submit', async function(req, res, next) {
  const { VDATE, VNAME, IDCARD, VROOM } = req.body; 
  try {
    const [rows, fields] = await mysql.execute('INSERT INTO `visitors` (VDATE, VNAME, IDCARD, VROOM) VALUES (?, ?, ?, ?)', [VDATE, VNAME, IDCARD, VROOM]);
    if (rows.affectedRows !== 1) {
      throw new Error('寫入失敗');
    }

    const [selectvisitorsRows, selectvisitorsFields] = await mysql.execute('SELECT * FROM `visitors`');

    return res.status(200).json({
      status: true,
      message: '成功',
      data: selectvisitorsRows,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

router.post('/delete', async function(req, res, next) {
  const { ID } = req.body;

  try {
    const deleteQuery = 'DELETE FROM `visitors` WHERE id = ?';
    console.log('Delete SQL Query:', deleteQuery);

    const [deleteRows, deleteFields] = await mysql.execute(deleteQuery, [ID]);

    if (deleteRows.affectedRows !== 1) {
      throw new Error('刪除失敗');
    }

    // 如果需要重新加载整个列表，可以保留以下这部分
    const [selectvisitorsRows, selectvisitorsFields] = await mysql.execute('SELECT * FROM `visitors`');
    
    return res.status(200).json({
      status: true,
      message: '刪除成功',
      data: selectvisitorsRows,
    });
  } catch (e) {
    console.error('Error deleting item:', e);
    console.log('ID attempted to delete:', ID); // 添加这一行
    console.log('Error details:', e); // 添加这一行


    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
});

module.exports = router;

