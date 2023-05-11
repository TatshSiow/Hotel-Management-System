/*導入express模組
導入mysql promise模組
用express.Router() 建立了 router 路由器物件
導入argon2密碼模組*/ 
var express = require('express');
var { promisePool: mysql } = require('../lib/mysql');
var router = express.Router();
const argon2 = require('argon2');

/*從router GET 主目錄index頁面，
讀取user的cookie
從 req.query 中查詢 error */
router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

//如果為error，將會傳送到user/index
  return res.render('user/index', { title: '會員中心', user, error });
});

//如果router讀取到用戶點擊login，則會把用戶導到user/login
router.get('/login', function(req, res, next) {
  return res.render('user/login', { title: '登入' });
});

//如果router讀取到用戶點擊logout，則會把用戶導到index，並且清除cookies
router.get('/logout', function(req, res, next) {
  res.clearCookie('user');
  return res.render('index', { title: '大樓管理' });
});

/*router用POST方式取得login網頁
req.body取得網頁中的username和password欄位作為需要的資料*/
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

//通過SQL查找user裡面，username的名字
  const [rows,fields] = await mysql.execute('SELECT * FROM `user` WHERE username = ?', [username]);

//如果無法在user/username這個rows中查到輸入的值，則會顯示以下信息（這部分是賬號）
  if (rows.length != 1) {
    return res.status(200).json({
      'status': false,
      'message': '帳號或密碼錯誤',
    });
  }

  const user = rows[0]; //清空user的rows的值

//如果無法在user.password中查到輸入的值，則會顯示以下信息（這部分是密碼）
  if (!await argon2.verify(user.password, password)) {
    return res.status(200).json({
      'status': false,
      'message': '帳號或密碼錯誤',
    });
  }

/*當cookie中的user和userId的登入都有被讀取到
系統會回傳 “成功” */
  res.cookie('user', user.name, {signed: true});
  res.cookie('userId', user.id, {signed: true});
  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

//router用GET指令取得user/register的頁面
router.get('/register', function(req, res, next) {
  res.render('user/register', { title: '註冊' });
});

/*router用POST方式取得register網頁
req.body取得網頁中的username，password，name欄位作為需要的資料
const hanshedpassword會用argon2模組加密用戶輸入的密碼*/
router.post('/register', async function(req, res, next) {
  const { username, password, name } = req.body;
  const hashedPassowrd = await argon2.hash(password);

/*如果成功的話將會在mysql執行以下指令
會在user資料庫裡面添加username,password,name,amount的名字
[？]代表用戶輸入的值，500是給予的amount*/
  const [rows,fields] = await mysql.execute('INSERT INTO `user` (username, password, name, amount) VALUES (?, ?, ?, ?)', [username, hashedPassowrd, name, 500]);

//如果rows裡面沒東西，則會顯示註冊失敗
  if(rows.affectedRows !== 1) {
    return res.status(200).json({
      'status': false,
      'message': '註冊失敗',
    });
  }

//否則會顯示註冊成功
  return res.status(200).json({
    'status': true,
    'message': '成功',
  });
});

//將模組匯出到router
module.exports = router;