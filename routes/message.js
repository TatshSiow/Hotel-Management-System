/*導入express模組
導入mysql promise模組
用express.Router() 建立了 router 路由器物件*/
var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

/*從router GET 主目錄index頁面，
讀取user的cookie，如果有則會回傳message/index的頁面*/
router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;
  return res.render('message/index', { title: '大樓管理', user });
});

//從router取得資料並暫存在/fetch，在SQL中下達以下指令
router.get('/fetch', async function(req, res, next) {
    const [rows,fields] = await mysql.execute(
        'SELECT * FROM repair ORDER BY `repair`.id DESC');

//如果回傳值正確，則在rows中顯示資料    
    return res.status(200).json({
        'status': true,
        'data': rows,
    });
});

/*router用POST讀取submit，並讀取網頁中message欄位的資料
這裡的messagePrice=1是指會在user裡面的amount -1的值*/
router.post('/submit', async function(req, res, next) {
    const { userId } = req.signedCookies;
    const { message } = req.body;
    const messagePrice = 1;

/*使用mysql.getConnection取得資料庫連線，並回傳到connection函數
try抓取錯誤，如果rows值回傳不等於1，則顯示 error '寫入留言失敗' */
  const connection = await mysql.getConnection();
  try {
        await connection.beginTransaction();
        const [rows,fields] = await connection.execute('INSERT INTO `message` (user_id, message, create_at) VALUES (?, ?, NOW())', [userId, message]);
        if(rows.affectedRows !== 1) {
        throw new Error('寫入留言失敗');
        }

//這個位置是指如果userID不等於資料庫內的任何一個，則顯示 '找不到使用者'
        const [selectUserRows, selectUserFields] = await connection.execute('SELECT amount FROM `user` WHERE id = ?', [userId]);
        if (selectUserRows.length != 1) {
        throw new Error('找不到使用者');
        }

/*把user裡面selectUserRows清零
用UserOriginAmount代表user.amount（資料庫中user的amount）
如果userOriginAmount的值小於messagePrice的值（上面設定為1）
則顯示error ‘餘額不足’ */
        const user = selectUserRows[0];
        const userOriginAmount = user.amount;
        if (userOriginAmount < messagePrice) {
            throw new Error('餘額不足');
        }
        
/*這裡會用update語法更新資料庫內的資料
如果更新失敗，則會顯示error '更新使用者金額失敗'*/
        const [updateUserRows, updateUserFields] = await connection.execute('UPDATE `user` SET `amount` = `amount` + ? WHERE id = ?', [-messagePrice, userId]);
        if (updateUserRows.affectedRows != 1) {
            throw new Error('更新使用者金額失敗');
        }

/*等待連線，取得對應的值，這裡SQL的NOW是使用當前時間的意思*/
        const [insertUserAmountLogRows, insertUserAmountLogFields] = await connection.execute(
            'INSERT INTO `user_amount_log` (`user_id`, amount, origin_amount, create_at) VALUE (?, ?, ?, NOW())',
            [userId, messagePrice, userOriginAmount]
        );

/*如果無法插入值，則會顯示error '寫入使用者紀錄失敗' */
        if (insertUserAmountLogRows.affectedRows != 1) {
            throw new Error('寫入使用者紀錄失敗');
        }

/*這一個部分是用於debug，如果回傳值為以上的失敗結果，則會顯示error的信息
並且回到失敗之前的狀態（rollback）*/
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

//將模組匯出到router
module.exports = router;
