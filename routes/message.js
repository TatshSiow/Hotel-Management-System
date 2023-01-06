var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;

  return res.render('message/index', { title: 'Express', user });
});

router.get('/fetch', async function(req, res, next) {
    const [rows,fields] = await mysql.execute(
        'SELECT `message`.`message`,`message`.`create_at`, `user`.`username` '+
        'FROM `message` INNER JOIN `user` ON message.user_id = user.id ' +
        'ORDER BY `message`.id DESC');
    
    return res.status(200).json({
        'status': true,
        'data': rows,
    });
});

router.post('/submit', async function(req, res, next) {
    const { userId } = req.signedCookies;
    const { message } = req.body;

    const messagePrice = 500;

  const connection = await mysql.getConnection();

  try {
        await connection.beginTransaction();

        const [rows,fields] = await connection.execute('INSERT INTO `message` (user_id, message, create_at) VALUES (?, ?, NOW())', [userId, message]);

        if(rows.affectedRows !== 1) {
            throw new Error('寫入留言失敗');
        }

        const [selectUserRows, selectUserFields] = await connection.execute('SELECT amount FROM `user` WHERE id = ?', [userId]);

        if (selectUserRows.length != 1) {
        throw new Error('找不到使用者');
        }

        const user = selectUserRows[0];
        const userOriginAmount = user.amount;

        if (userOriginAmount < messagePrice) {
            throw new Error('餘額不足');
        }
        
        const [updateUserRows, updateUserFields] = await connection.execute('UPDATE `user` SET `amount` = `amount` + ? WHERE id = ?', [-messagePrice, userId]);

        if (updateUserRows.affectedRows != 1) {
            throw new Error('更新使用者金額失敗');
        }

        const [insertUserAmountLogRows, insertUserAmountLogFields] = await connection.execute(
            'INSERT INTO `user_amount_log` (`user_id`, amount, origin_amount, create_at) VALUE (?, ?, ?, NOW())',
            [userId, messagePrice, userOriginAmount]
        );
    
        if (insertUserAmountLogRows.affectedRows != 1) {
            throw new Error('寫入使用者紀錄失敗');
        }

        await connection.commit();
    } catch (e) {
        await connection.rollback();
        return res.status(500).json({
        'status': false,
        'message': e.message,
        });
    }

    return res.status(200).json({
        'status': true,
        'message': '成功',
    });
});
  
module.exports = router;
