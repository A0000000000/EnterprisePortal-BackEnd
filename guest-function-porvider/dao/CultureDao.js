const cultureModel = require('../models/CultureModel')

module.exports = {
    async addNewCultureDao(id, image, type, title, lines, order) {
        let model = {
            id,
            image,
            type,
            title,
            contents: lines,
            order
        }
        return await cultureModel.create(model)
    },
    async getCultures() {
        return await cultureModel.find()
    }
}