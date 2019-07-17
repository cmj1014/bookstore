const mongoose = require("../db.js");//引入模块
const {Schema} = mongoose;//es6 解构赋值

//确定一个数据集合字段和类型
const BooksSchema = new Schema({
	id:{type:String},	//id
	bookname:{type:String},//书名
	subhead:{type:String},//副标题
	writer:{type:String},//作者
	publishingouse:{type:String},//出版社
	time:{type:String},//出版时间
	money:{type:String},//价格
	intro:{type:String},//简介
	img:{type:String},//图片
	kind:{type:String},//分类
	newbook:{type:String},//新书
	promotion:{type:String}//促销
})
// 创建一个集合并且将它暴露出去，供其他人增删改查
// 会在数据库中创建出一个 users 的集合，与mongoose.model()的第一个参数有关
module.exports = mongoose.model('Books', BooksSchema);