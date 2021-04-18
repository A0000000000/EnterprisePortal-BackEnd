const introductionModel = require('../models/IntroductionModel')

module.exports = {
    async addNewIntroduction(id, image, type, lines, order) {
        let model = {
            id,
            image,
            type,
            contents: lines,
            order
        }
        return await introductionModel.create(model)
    },
    async getIntroductions() {
        return await introductionModel.find()
    }
}