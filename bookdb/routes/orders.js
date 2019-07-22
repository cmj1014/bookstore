var express = require('express');
var router = express.Router();
var Orders = require('../sql/model/orders');
var User = require('../sql/model/users');
var sql = require('./../sql/index'); // <==>  ./../sql


/* GET 查看订单. */
router.get('/', function(req, res, next) {
	/* db.getCollection('users').aggregate([
    { $group: { _id : '$openid', count: { $sum : 1 } } },
    { $match: { count: { $gt : 1} } }
]) */
	let whereObj = req.query;
	let count = 20; //默认显示多少条数据
	let start = 0; //默认开始数据
	count = isparam(whereObj.count, 20);
	start = isparam(whereObj.start, 0);
	if (undefined !== whereObj.count && "" !== whereObj.count) {
		delete whereObj.count;
	}
	if (undefined !== whereObj.start && "" !== whereObj.start) {
		delete whereObj.start;
	}
	if (undefined === whereObj.tel || "" === whereObj.tel) {
		delete whereObj.tel;
	}
	sql.find(Orders, whereObj, count, start).then((data) => {
		let arr = new Object; //存内容
		let len = data.length;
		console.log(len)
		if (len == 0) { // 没有查询到
			arr = {
				"code": "404",
				"msg": "没有内容",
				"data": data
			};
		} else if (len > 0) {
			arr = {
				"code": "1",
				"msg": "查询成功",
				"data": data
			};
		} else {
			arr = {
				"code": "500",
				"msg": "查询异常",
				"data": data
			};
		}
		res.send(arr);
	})
});

/* GET 查看用户订单. */
router.post('/getUserOrder', function(req, res, next) {
	let whereObj = req.body;
	let id = whereObj.id;

	// 查询用户信息
	/* sql.sort(User,{tel:tel},{},{}).then((data)=>{
		//console.log("data[0]._id",data[0]._id)
		id = data[0]._id; */
		//console.log("id1",id)
		// 查询订单信息
		sql.sort(Orders, {"userid":id},{},{}).then((data) => {
			let arr = new Object; //存内容
			let len = data.length;
			//console.log(len)
			if (len == 0) { // 没有查询到
				arr = {
					"code": "404",
					"msg": "没有内容",
					"data": data
				};
			} else if (len > 0) {
				arr = {
					"code": "1",
					"msg": "查询成功",
					"data": data
				};
			} else {
				arr = {
					"code": "500",
					"msg": "查询异常",
					"data": data
				};
			}
			res.send(arr);
		})
		
	//});
	//console.log("id2",id)
	//console.log("userid","5d2f1b6944e8c9bded11f656")
	
});

/* GET 添加订单. */
router.get('/add', function(req, res, next) {
	let insertData = req.query;// 获得提交数据
	let tel = req.query.tel;//手机号
	let userid = req.query.userid;//用户id
	if(undefined ==tel||""==tel||null ==tel){
		res.send({"code":"500","msg":"号码不能为空"});
	}
	let time = getTimeFM();
	insertData.time = time;
	let orderId = userid+new Date().valueOf();
	insertData.orderId=orderId;
	let arr =new Object;
	//添加用户sql
	/* sql.insert(Orders,insertData).then((data)=>{
		let len = data.length;
		console.log(data)
		console.log(len)
		if(len ==0){// 没有查询到
			arr = {"code":"404","msg":"没有成功","data":data};
		}else if(len >0){
			arr = {"code":"1","msg":"成功","data":data};
		}else{
			arr = {"code":"500","msg":"异常","data":data};
		}
		res.send(arr);
	}); */
	sql.insert(Orders,insertData);
	res.send(arr);
});



//判断时候有值
function isparam(dataObj, num) {
	if (undefined !== dataObj && "" !== dataObj) {
		return Number(dataObj);
	} else {
		return num
	}
}
  function getTimeFM(){
	  let date = new Date();
	  date= date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+" "+(date.getHours())+":"+date.getMinutes()+":"+date.getSeconds();
	  //alert(date)
	  return date
  }
module.exports = router;
