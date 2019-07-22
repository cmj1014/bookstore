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
	let insertData = req.body;// 获得提交数据
	console.log(insertData);
	let tel = req.body.tel;//手机号
	if(undefined ==tel||""==tel||null ==tel){
		res.send({"code":"500","msg":"号码不能为空"});
		return false;
	}
	
	//let sendCode = "";// 短信验证码
	//查询用户
	
	sql.sort(User,{"tel":tel}).then((data)=>{
		let len = data.length;
		if(len >0){
			res.send("2");
		}
	})
	
	
	let arr =new Object;
	//添加用户sql
	sql.insert(User,insertData).then((data)=>{
		let len = data.length;
		//console.log(len)
		if(len ==0){// 没有查询到
			arr = {"code":"404","msg":"没有注册成功","data":data};
		}else if(len >0){
			arr = "1";
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
router.post("/gettel",function(req, res){
	let arr =new Object;
	let whereObj = req.body;//获取提交数据
	console.log("req.body"+req.body.tel)
	//查询数据
	sql.sort(User,whereObj).then((data)=>{
	//console.log("ret"+data)
		let len = data.length;
		//console.log(len)
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
// 手机号登录
router.post("/login",function(req, res){
	//console.log("login")
	let arr ="-1";
	let username = req.body.username;//获取提交数据
	let password = req.body.password;//获取提交数据
	//console.log(req.body)
	//console.log(username,password)
	//查询数据
	sql.find(User,{tel:username}).then((data)=>{
		//console.log("ret"+data)
		let len = data.length;
		//console.log(len)
		if(len ==0){// 没有查询到
			arr = "2";
		}else if(len >0){
			//console.log(data[0].password);
			if(data[0].password===password){
				arr = "1";
				
			}else{
				arr = "-1";
			}
			
		}else{
			arr = "-1";
		}
		//console.log(arr);
		 res.send(arr); 
	})
	
})


function findData(whereObj){
	return sql.find(User,whereObj).then((data)=>{
		//console.log("data"+data)
		
		return data });
}

module.exports = router;
