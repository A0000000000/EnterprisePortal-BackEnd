const OrderModel = require('../models/OrderModel')

module.exports = {
    async createNewOrder(params) {
        return await OrderModel.create(params)
    },
    async changeStatus(id, status) {
        let model = await OrderModel.findOne({ id })
        if (!model) {
            return {
                code: 500,
                message: '订单不存在.'
            }
        }
        model.status = status
        return await OrderModel.findOneAndUpdate({ id }, model)
    },
    async getOrdersByUserId(userId) {
        return await OrderModel.find({ userId })
    },
    async getOrders() {
        return await OrderModel.find({})
    },
    async getOrderById(id) {
        return await OrderModel.findOne({ id })
    }
}