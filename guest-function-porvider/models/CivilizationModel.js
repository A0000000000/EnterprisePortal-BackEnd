const { mongoose, connect } = require('../mongodb')

const CivilizationSchema = new mongoose.Schema({
    id: String,
    time: Date,
    content: String
})

const CivilizationModel = mongoose.model('Civilization', CivilizationSchema)

module.exports = CivilizationModel
