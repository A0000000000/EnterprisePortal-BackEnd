const { mongoose, connect } = require('../mongodb')

const IntroductionSchema = new mongoose.Schema({
    id: String,
    image: String,
    contents: [String],
    order: Number
})

const IntroductionModel = mongoose.model('Introduction', IntroductionSchema)

module.exports = IntroductionModel
