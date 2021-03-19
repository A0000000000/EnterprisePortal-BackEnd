const LocationModel = require('../models/LocationModel')

module.exports = {
    async addNewLocation(params) {
        return await LocationModel.create(params)
    }
}
