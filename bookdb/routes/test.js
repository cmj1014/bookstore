var express = require('express');
var router = express.Router();
//导入数据相关模组调用数据
var User = require('./../sql/model/users');
var sql = require('./../sql/testSQL'); // <==>  ./../sql

//测试页面
router.get('/', function(req, res, next) {
  res.render('test', { title: '测试页面' });
});
//测试接口
router.get('/name', function(req, res, next) {
	//调sql 命令，返回json对象 
	var test = {"name":"123","age":"19","test":"this is test data"}
  res.send(test);
});

module.exports = router;
