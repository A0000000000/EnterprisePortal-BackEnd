const { mongoose, connect } = require('../mongodb')

const LocationSchema = new mongoose.Schema({
    id: String,
    userId: String,
    name: String,
    details: String,
    createTime: Date
})

const LocationModel = mongoose.model('Location', LocationSchema)

module.exports = LocationModel