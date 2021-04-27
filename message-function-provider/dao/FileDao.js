const fileModel = require('../models/FileModel')

module.exports = {
    async getImageById(id) {
        return await fileModel.findOne({ id })
    },
    async addImageInfo(params) {
        return await fileModel.create(params)
    },
    async findAll() {
        return await fileModel.find({})
    }
}
