const { mongoose, connect } = require('../mongodb')

const GoodSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    picture: String,
    count: Number,
    details: String,
    type: String,
    time: Date
})

const GoodModel = mongoose.model('Good', GoodSchema)

module.exports = GoodModel