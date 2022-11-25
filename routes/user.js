var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index',{title:'會員中心'});
});

router.get('/login', function(req, res, next) {
  res.render('user/login',{title:'登入'});
});

router.get('/logout', function(req, res, next) {
  res.renderect('/user/');
});

router.get('/login', function(req, res, next) {
  const { username, password } = req.body;

  console.log({username, password});

   if(username === 'user1' && password === '123456'){
    ('username', username, {maxAge:60*1000});
   }

   //if susses
  res.renderect('/user/');
});





module.exports = router;
