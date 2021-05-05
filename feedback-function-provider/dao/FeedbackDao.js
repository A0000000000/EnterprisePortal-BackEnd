const feedbackModel = require('../models/FeedbackModel')

module.exports = {
    async addNewFeedback(params) {
        return await feedbackModel.create(params)
    },

    async getAllFeedback(userId) {
        return await feedbackModel.find({
            userId
        })
    },
    async findAll() {
        return await feedbackModel.find({})
    },
    async getById(id) {
        return await feedbackModel.findOne({ id })
    },
    async updateById(model) {
        return await feedbackModel.findOneAndUpdate({ id: model.id }, model)
    }
}