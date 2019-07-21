const mongoose = require("../db.js");//引入模块
const {Schema} = mongoose;//es6 解构赋值

//确定一个数据集合字段和类型
const OrdersSchema = new Schema({
	orderId:{type:String},	// 购买用户id+时间戳
	goodsname:{type:String},//商品名称
	goodsId:{type:String},//商品_id
	goodsid:{type:String},//商品id
	time:{type:String},//购买时间
	money:{type:Number},//总价格
	unitPrice:{type:Number},//单价
	img:{type:String},//商品图片
	kind:{type:String},//分类
	num:{type:Number},//购买数量
	userid:{type:String}//购买用户id
})
// 创建一个集合并且将它暴露出去，供其他人增删改查
// 会在数据库中创建出一个 users 的集合，与mongoose.model()的第一个参数有关
module.exports = mongoose.model('Orders', OrdersSchema);