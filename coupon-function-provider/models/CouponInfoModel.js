const { mongoose, connect } = require('../mongodb')

const CouponInfoSchema = new mongoose.Schema({
    id: String,
    couponId: String,
    userId: String,
    status: Number,
    getTime: Date,
    useTime: Date
})


let CouponInfoModel = mongoose.model('CouponInfo', CouponInfoSchema)

module.exports = CouponInfoModel