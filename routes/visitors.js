/*導入express模組
導入mysql promise模組
用express.Router() 建立了 router 路由器物件*/
var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

/*從router GET 主目錄index頁面，
讀取user的cookie，如果有則會回傳message/index的頁面*/


// router.get('/', async function(req, res, next) {
//   const { user } = req.signedCookies;
//   return res.render('visitors/index', { title: '大樓管理', user });
// });

//從router取得資料並暫存在/fetch，在SQL中下達以下指令
router.get('/', async function(req, res, next) {
    const { user, userId } = req.signedCookies;
    const [rows,fields] = await mysql.execute(
        'SELECT * FROM visitors ORDER BY ID  ASC');

//如果回傳值正確，則在rows中顯示資料    
  return res.status(200).render('visitors/index', { user, title: 'visitors', rows });
});


/*router用POST讀取submit，並讀取網頁中message欄位的資料
這裡的messagePrice=1是指會在user裡面的amount -1的值*/

// router.post('/submit', async function(req, res, next) {
  //
 

  // 使用 mysql.getConnection 获取数据库连接，并将其赋值给 connection 变量

  // const connection = await mysql.getConnection();
  // try {

  // const { VDATE } = req.body;
  // const { VNAME } = req.body;
  // const { IDCARD } = req.body;
  // const { VROOM } = req.body;
  
  // const [rows, fields] = await mysql.execute('INSERT INTO `visitors` (VDATE,VNAME,IDCARD,VROOM) VALUES (?, ?, ?, ?)', [VDATE,VNAME,IDCARD,VROOM]);

  //   if (rows.affectedRows !== 1) {
  //     throw new Error('寫入失敗');
  //   }

  //       await connection.commit();
  //   } catch (e) {
  //       await connection.rollback();
  //       return res.status(500).json({
  //       'status': false,
  //       'message': e.message,
  //       });
  //   }
//如果回傳值正確，顯示成功的信息

//     return res.status(200).json({
//         'status': true,
//         'message': '成功',
//     });
// });

//將模組匯出到router
module.exports = router;