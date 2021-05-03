const { mongoose, connect } = require('../mongodb')

const OrderSchema = new mongoose.Schema({
    id: String,
    goods: [String],
    coupon: String,
    location: String,
    userId: String,
    status: Number,
    createTime: Date
})


const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel