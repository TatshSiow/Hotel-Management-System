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
  const { user, userId } = req.signedCookies;
    const { message } = req.body;
    
    const [rows,fields] = await mysql.execute('INSERT INTO `message` (user_id, message, create_at) VALUES (?, ?, NOW())', [userId, message]);

    if(rows.affectedRows !== 1) {
        return res.status(200).json({
          'status': false,
          'message': '失敗',
        });
    }

    return res.status(200).json({
        'status': true,
        'message': '成功',
    });
});
  
module.exports = router;