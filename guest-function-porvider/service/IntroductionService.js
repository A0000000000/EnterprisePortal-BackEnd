const fs = require('fs')
const introductionFiles = require('../minio/IntroductionFiles')

module.exports = {
    async getImage(id) {
        return await introductionFiles.getImage(id)
    },
    async addNewPart(image, lines, order) {
        return await introductionFiles.addImage(image.name, fs.createReadStream(image.path), image.size, image.type)
    }
}