/*導入express模組
用express.Router() 建立了 router 路由器物件*/
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const { user } = req.signedCookies;
  return res.render('index', {user, title: '大樓管理'});
});


//將模組匯出到router
module.exports = router;
