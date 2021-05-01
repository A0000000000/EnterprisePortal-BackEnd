const GoodModel = require('../models/GoodModel')

module.exports = {
    async addNewGood(params) {
        return await GoodModel.create(params)
    },
    async deleteGoodById(id) {
        return await GoodModel.findOneAndDelete({ id })
    },
    async updateGood(params) {
        return await GoodModel.findOneAndUpdate({ id: params.id }, params)
    },
    async getAllGoods(type) {
        return await GoodModel.find({ type })
    },
    async getGoodById(id) {
        return await GoodModel.findOne({ id })
    },
    async getGoods() {
        return await GoodModel.find({})
    }
}