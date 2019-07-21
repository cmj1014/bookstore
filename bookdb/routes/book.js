var express = require('express');
var router = express.Router();
var Books = require('../sql/model/books');
var sql = require('./../sql/index'); // <==>  ./../sql

/* GET 所有书籍. */
router.get('/', function(req, res, next) {
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
	console.log("whereObj.count" + whereObj.count);
	console.log(".count" + count);
	sql.find(Books, {}, count, start).then((data) => {

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
//条件查询书籍
router.get('/find', function(req, res, next) {
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

	//console.log("whereObj.count" + whereObj.count);
	//console.log(".count" + count);
	//调sql 命令，返回json对象 
	//console.log(whereObj)
	sql.find(Books, whereObj, count, start).then((data) => {
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
// 根据_id查详情
router.get('/byId', function(req, res, next) {
	let count = 20; //默认显示多少条数据
	let start = 0; //默认开始数据
	let mongoose = require('mongoose');
	let _id = req.query._id;
	_id = mongoose.Types.ObjectId(_id);
	//调sql 命令，返回json对象 
	//console.log(whereObj)
	sql.find(Books, {
		_id: _id
	}, count, start).then((data) => {
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
//查看书籍分类
router.get('/distinctkind', function(req, res, next) {
	//调sql 命令，返回json对象 
	//console.log(whereObj)
	sql.distinct(Books, "kind").then((data) => {
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

//搜索书籍
router.get('/search', function(req, res, next) {
	//调sql 命令，返回json对象 
	//console.log(whereObj)
	let search = req.query.search;
	sql.find(Books, {
		$or: [{
			"bookname": {
				$regex: search
			}
		}, {
			"subhead": {
				$regex: search
			}
		}, {
			"intro": {
				$regex: search
			}
		}, {
			"writer": {
				$regex: search
			}
		}, {
			"publishingouse": {
				$regex: search
			}
		}, {
			"kind": {
				$regex: search
			}
		}, {
			"money": {
				$regex: search
			}
		}]
	}).then((data) => {
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

function findbooks(whereObj) {
	return sql.find(Books, whereObj).then((data) => {
		console.log(data)
		return data;
	})

}
//判断时候有值
function isparam(dataObj, num) {
	if (undefined !== dataObj && "" !== dataObj) {
		return Number(dataObj);
	} else {
		return num
	}
}

module.exports = router;
