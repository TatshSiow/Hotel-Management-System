/*導入express模組
用express.Router() 建立了 router 路由器物件*/
var express = require('express');
var router = express.Router();

/*GET主目錄的index*/
router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  res.render('index', { title: '大樓管理', user });
});

//將模組匯出到router
module.exports = router;
