var express = require('express');
var router = express.Router();

/*GET首頁*/
router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  res.render('index', { title: '大樓管理', user });
});

module.exports = router;
