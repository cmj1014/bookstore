var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book');
var testRouter = require('./routes/test');
var statusRouter = require('./routes/status');
var ordersRouter = require('./routes/orders');
var bannersRouter = require('./routes/banners');

var cors = require('cors')	// 跨域

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);
app.use('/test', testRouter);
app.use('/status', statusRouter);
app.use('/orders', ordersRouter);
app.use('/banner', bannersRouter);


var corsOptions = {
  origin: 'http://47.100.225.183', //只有百度可以访问
  optionsSuccessStatus: 200 
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: '只有百度可以访问'})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use('*',function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

res.setHeader("Access-Control-Allow-Origin", "*"); 
res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
if (req.method == 'OPTIONS') {
    res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }

res.setHeader("X-Powered-By",' 3.2.1');
res.setHeader("Content-Type", "text/html"); 


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
