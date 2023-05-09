//註記：需要動的只有router，剩下的保持不變

// 分別代表匯入express對應名字的模組
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 擬寫router變數，使其對應到各文件夾的router路由器組件，以便處理該路徑的 HTTP 請求
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var messageRouter = require('./routes/message');
var itemlistRouter = require('./routes/itemlist');

// 用express建立app，使用dotenv進行設定
var app = express();
require('dotenv').config();

// 查看程式引擎的設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env['COOKIE_KEY']));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

// 抓取404錯誤（找不到網頁） 並回傳到error handler（錯誤中心）
app.use(function(req, res, next) {
  next(createError(404));
});

// 錯誤中心
app.use(function(err, req, res, next) {
  // 設定locals, 用於開發中提供error信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染error網頁
  res.status(err.status || 500);
  res.render('error');
});

//將模組匯出到router
module.exports = app;
