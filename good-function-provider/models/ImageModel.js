const { mongoose, connect } = require('../mongodb')

const ImageSchema = new mongoose.Schema({
    id: String,
    filename: String,
    contentType: String,
    createTime: String,
    type: String
})

const ImageModel = mongoose.model('Image', ImageSchema)

module.exports = ImageModel