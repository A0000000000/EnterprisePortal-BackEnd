const { mongoose, connect } = require('../mongodb')

const CouponSchema = new mongoose.Schema({
    id: String,
    type: String,
    condition: Object,
    money: Number,
    count: Number,
    createTime: Date
})


let CouponModel = mongoose.model('Coupon', CouponSchema)

module.exports = CouponModel