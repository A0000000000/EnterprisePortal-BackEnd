const { mongoose, connect } = require('../mongodb')

const FeedbackSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    userId: String,
    createTime: Date,
    status: Number,
    result: String
})

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema)

module.exports = FeedbackModel
