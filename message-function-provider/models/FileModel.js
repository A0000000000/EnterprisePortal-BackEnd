const { mongoose, connect } = require('../mongodb')

const FileSchema = new mongoose.Schema({
    id: String,
    filename: String,
    contentType: String,
    uploadTime: Date
})


let FileModel = mongoose.model('File', FileSchema)

module.exports = FileModel