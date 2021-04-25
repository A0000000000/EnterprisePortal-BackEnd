const feedbackModel = require('../models/FeedbackModel')

module.exports = {
    async addNewFeedback(params) {
        return await feedbackModel.create(params)
    },

    async getAllFeedback(userId) {
        return await feedbackModel.find({
            userId
        })
    }
}