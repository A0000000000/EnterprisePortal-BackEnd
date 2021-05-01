const CouponInfoModel = require('../models/CouponInfoModel')

module.exports = {
    async addNewInfo(model) {
        return await CouponInfoModel.create(model)
    },
    async getInfos(userId) {
        return await CouponInfoModel.find({
            userId: userId,
            status: 0
        })
    },
    async getInfoById(id) {
        return await CouponInfoModel.findOne({
            id
        })
    },
    async updateInfo(model) {
        return await CouponInfoModel.updateOne({ id: model.id }, model)
    },
    async getInfoByCouponId(uid, id) {
        return await CouponInfoModel.findOne({ userId: uid, couponId: id })
    }
}