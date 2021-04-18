const { mongoose, connect } = require('../mongodb')

const CultureSchema = new mongoose.Schema({
    id: String,
    image: String,
    type: String,
    title: String,
    contents: [String],
    order: Number
})

const CultureModel = mongoose.model('Culture', CultureSchema)

module.exports = CultureModel
