const civilizationModel = require('../models/CivilizationModel')

module.exports = {
    async getCivilizations() {
        return await civilizationModel.find()
    },
    async addNewCivilization(model) {
        return await civilizationModel.create(model)
    }
}