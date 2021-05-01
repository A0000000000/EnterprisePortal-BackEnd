const CouponModel = require('../models/CouponModel')

module.exports = {
    async getAllCoupon() {
        return await CouponModel.find({})
    },
    async addNewCoupon(model) {
        return await CouponModel.create(model)
    },
    async updateCoupon(model) {
        return await CouponModel.findOneAndUpdate({ id: model.id }, model)
    },
    async getCouponById(id) {
        return await CouponModel.findOne({ id })
    },
    async deleteCouponById(id) {
        return await CouponModel.findOneAndDelete({ id })
    },
    async getCouponByType(type) {
        return await CouponModel.find({ type })
    }
}