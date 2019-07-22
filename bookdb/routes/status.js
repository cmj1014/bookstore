var express = require('express');
var router = express.Router();
var Status = require('../sql/model/status');
var sql = require('./../sql/index'); // <==>  ./../sql

//短信验证码
router.post('/sendCode', function(req, res, next) {
	let tel = req.query.tel; // 获得手机号
	if (undefined == tel || "" == tel.trim() || null == tel || 11 !== tel.length) {
		res.send({
			"code": "500",
			"msg": "手机号码不正确"
		});
	}

	let sendCode = ""; // 短信验证码
	let arr = new Object;
	//添加用户sql
	sql.insert(User, insertData).then((data) => {
		let len = data.length;
		console.log(len)
		if (len == 0) { // 没有查询到
			arr = {
				"code": "404",
				"msg": "没有注册成功",
				"data": data
			};
		} else if (len > 0) {
			arr = {
				"code": "1",
				"msg": "注册成功",
				"data": data
			};
		} else {
			arr = {
				"code": "500",
				"msg": "注册异常",
				"data": data
			};
		}
		res.send(arr);
	});
	//console.log("ret"+ret);
	/* sql.find(User,insertData).then((data)=>{
		
	}) */

});
// 发送手机验证码
router.get("/addCode", function(req, res) {
	let arr = new Object;
	let tel = req.query.tel; //手机号
	console.log(req.query.tel)
	let code = sendTelCode(tel);
	console.log("code"+code);
	res.send(code);
})
//发送短息,返回验证码
function sendTelCode(tel) {
	console.log("sendTelCode");
	var http = require('http');
	
	var uri = "https://www.daxunxun.com/users/sendCode?tel="+tel;
	return  http.get(uri, function (res) {
		
        console.log("状态码: " + res);
    })
	
}


module.exports = router;
