const messageModel = require('../models/MessageModel')

module.exports = {
    async findAll() {
        return await messageModel.find({})
    },
    async findById(id) {
        return await messageModel.findOne({ id })
    },
    async addNewMessage(params) {
        return await messageModel.create(params)
    },
    async updateMessage(model) {
        return await messageModel.findOneAndUpdate({ id: model.id }, model)
    },
    async deleteMessage(id) {
        return await messageModel.deleteOne({ id })
    }
}