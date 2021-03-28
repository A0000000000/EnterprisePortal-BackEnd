const LocationModel = require('../models/LocationModel')

module.exports = {
    async addNewLocation(params) {
        return await LocationModel.create(params)
    },
    async getAllLocation(id) {
        return await LocationModel.find({
            userId: id
        })
    },
    async updateLocation(params) {
        return await LocationModel.findOneAndUpdate({
            id: params.id
        }, params)
    },
    async deleteLocation(id) {
        return await LocationModel.deleteOne({
            id
        })
    }
}
