const { mongoose, connect } = require('../mongodb')

const MessageSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    createTime: Date,
    url: String,
    order: Number
})


let MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel