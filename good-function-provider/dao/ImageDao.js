const ImageModel = require('../models/ImageModel')

module.exports = {
    async addNewImage(params) {
        return await ImageModel.create(params)
    },
    async getImageById(id) {
        return await ImageModel.findOne({ id })
    },
    async getAllImages(type) {
        return await ImageModel.find({ type })
    }
}