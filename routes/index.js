var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { user } = req.signedCookies;
  res.render('index', { title: '會員中心', user });
});

module.exports = router;
