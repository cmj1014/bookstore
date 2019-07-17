var express = require('express');
var router = express.Router();
var User = require('../sql/model/users');
var sql = require('./../sql/index'); // <==>  ./../sql

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is users data');
});
router.get('/name', function(req, res, next) {
  res.send('this is name data');
});
//注册账号
router.post('/addAction', function(req, res, next) {
	let insertData = req.query;// 获得提交数据
	let tel = req.query.tel;//手机号
	if(undefined ==tel||""==tel.trim()||null ==tel){
		res.send({"code":"500","msg":"号码不能为空"});
	}
	let sendCode = "";// 短信验证码
	let arr =new Object;
	//添加用户sql
	sql.insert(User,insertData).then((data)=>{
		let len = data.length;
		console.log(len)
		if(len ==0){// 没有查询到
			arr = {"code":"404","msg":"没有注册成功","data":data};
		}else if(len >0){
			arr = {"code":"1","msg":"注册成功","data":data};
		}else{
			arr = {"code":"500","msg":"注册异常","data":data};
		}
		res.send(arr);
	});
	//console.log("ret"+ret);
	/* sql.find(User,insertData).then((data)=>{
		
	}) */
  
});
// 查询手机号
router.get("/gettel",function(req, res){
	let arr =new Object;
	let whereObj = req.query;//获取提交数据
	
	//查询数据
	sql.find(User,whereObj).then((data)=>{
		console.log("ret"+data)
		let len = data.length;
		console.log(len)
		if(len ==0){// 没有查询到
			arr = {"code":"404","msg":"没有查询到该号码","data":data};
		}else if(len >0){
			arr = {"code":"1","msg":"查询成功","data":data};
		}else{
			arr = {"code":"500","msg":"查询异常","data":data};
		}
		 res.send(arr); 
	})
	
})

function findData(whereObj){
	return sql.find(User,whereObj).then((data)=>{
		//console.log("data"+data)
		
		return data });
}

module.exports = router;
