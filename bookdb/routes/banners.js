var express = require('express');
var router = express.Router();
var Banners = require('../sql/model/banners');
var sql = require('./../sql/index'); // <==>  ./../sql


/* GET 查看订单. */
router.get('/', function(req, res, next) {
	let count = 1; // 状态为1的轮播图
	let whereObj = {"status":1};
console.log("Banners")
	sql.sort(Banners, whereObj, {}, whereObj).then((data) => {
		let arr = new Object; //存内容
		let len = data.length;
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

module.exports = router;
