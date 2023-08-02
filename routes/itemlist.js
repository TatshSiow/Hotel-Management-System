var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

/*從router用GET指令取得user UserID的cookie
然後設rows,fields來取得SQL裡面的資料
SELECT itemlist的所有東西，照著ID升序排列*/
router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;
  return res.render('itemlist/index', { title: '大樓管理', user });
});

//從router取得資料並暫存在/fetch，在SQL中下達以下指令
router.get('/fetch', async function(req, res, next) {
    const [rows,fields] = await mysql.execute(
        'SELECT * FROM itemlist ORDER BY ID DESC');

//如果回傳值正確，則在rows中顯示資料    
    return res.status(200).json({
        'status': true,
        'data': rows,
    });
});
//將得到的資料（user,rows --- title自定義）回傳到itemlist/index
router.post('/submit', async function(req, res, next) {
  //
 

   const connection = await mysql.getConnection();
  try {

 
  const { itemcode } = req.body;
  const { quantity } = req.body;
  const { price } = req.body;


  const [rows, fields] = await mysql.execute('INSERT INTO `repair` (itemcode,quantity ,price) VALUES (?, ?, ? )', [itemcode,quantity,price]);
      if (rows.affectedRows !== 1) {
      throw new Error('寫入留言失敗');
    }
  // router.post('/delete-itemlist', async function(req, res, next) {
  // const { itemId } = req.body;
//     if (rows.affectedRows !== 1) {
//       throw new Error('寫入留言失敗');
//     }
//   try {
//     // 在這裡執行刪除資料的相關操作
//     await mysql.execute('DELETE FROM `itemlist` WHERE id = ?', [itemId]);

//     // 返回刪除成功的回應
//     return res.json({ message: '刪除成功' });
//   } catch (error) {
//     // 處理錯誤
//     console.error('刪除資料時發生錯誤:', error);
//     return res.status(500).json({ message: '刪除資料時發生錯誤' });
//   }
// });
        await connection.commit();
    } catch (e) {
        await connection.rollback();
        return res.status(500).json({
        'status': false,
        'message': e.message,
        });
    }
//如果回傳值正確，顯示成功的信息
    return res.status(200).json({
        'status': true,
        'message': '成功',
    });
});
//模組回傳至router
module.exports = router; 