var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();
const argon2 = require('argon2');

router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

  return res.render('user/index', { title: '會員中心', user, error });
});

router.get('/login', function(req, res, next) {
  return res.render('user/login', { title: '登入' });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('user');

  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  const [rows,fields] = await mysql.execute('SELECT * FROM `user` WHERE username = ?', [username]);

  if (rows.length != 1) {
    return res.status(200).json({
      'status': false,
      'message': '帳號或密碼錯誤',
    });
  }

  const user = rows[0];

  if (!await argon2.verify(user.password, password)) {
    return res.status(200).json({
      'status': false,
      'message': '帳號或密碼錯誤',
    });
  }

  res.cookie('user', user.name, {signed: true});
  res.cookie('userId', user.id, {signed: true});

  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

router.get('/register', function(req, res, next) {
  res.render('user/register', { title: '註冊' });
});

router.post('/register', async function(req, res, next) {
  const { username, password, name } = req.body;
  const hashedPassowrd = await argon2.hash(password);

  const [rows,fields] = await mysql.execute('INSERT INTO `user` (username, password, name, amount) VALUES (?, ?, ?, ?)', [username, hashedPassowrd, name, 500]);

  if(rows.affectedRows !== 1) {
    return res.status(200).json({
      'status': false,
      'message': '註冊失敗',
    });
  }

  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

router.get('/recharge', function(req, res, next) {
  const { user } = req.signedCookies;
  return res.status(200).render('user/recharge', { user, title: '儲值' });
});

router.post('/recharge', async function(req, res, next) {
  const { code } = req.body;
  const { userId } = req.signedCookies;

  const connection = await mysql.getConnection();

  try {
    await connection.beginTransaction();

    const [updateCardRows, updateCardFields] = await connection.execute('UPDATE `card` SET `status` = 1 WHERE code = ? AND status = 0', [code]);

    if(updateCardRows.affectedRows !== 1) {
      throw new Error('序號有錯');
    }

    const [selectCardRows, selectCardFields] = await connection.execute('SELECT id, amount FROM `card` WHERE code = ?', [code]);

    if (selectCardRows.length != 1) {
      throw new Error('有奇怪事情發生');
    }

    const card = selectCardRows[0];
    const amount = card.amount;
    const cardId = card.id;

    const [insertCardUseRows, insertCardUseFields] = await connection.execute(
      'INSERT INTO `card_use` (`user_id`, `card_id`, create_at) VALUE (?, ?, NOW())',
      [userId, cardId]
    );

    if (insertCardUseRows.affectedRows != 1) {
      throw new Error('寫入卡片記錄失敗');
    }

    const [selectUserRows, selectUserFields] = await connection.execute('SELECT amount FROM `user` WHERE id = ?', [userId]);

    if (selectUserRows.length != 1) {
      throw new Error('找不到使用者');
    }

    const user = selectUserRows[0];
    const userOriginAmount = user.amount;

    const [updateUserRows, updateUserFields] = await connection.execute('UPDATE `user` SET `amount` = `amount` + ? WHERE id = ?', [amount, userId]);

    if (updateUserRows.affectedRows != 1) {
      throw new Error('更新使用者金額失敗');
    }

    const [insertUserAmountLogRows, insertUserAmountLogFields] = await connection.execute(
      'INSERT INTO `user_amount_log` (`user_id`, amount, origin_amount, create_at) VALUE (?, ?, ?, NOW())',
      [userId, amount, userOriginAmount]
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
