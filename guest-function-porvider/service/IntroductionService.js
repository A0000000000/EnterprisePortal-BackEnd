const fs = require('fs')
const introductionFiles = require('../minio/IntroductionFiles')
const uuid = require('node-uuid')
const introductionDao = require('../dao/IntroductionDao')

module.exports = {
    async getImage(id) {
        return await introductionFiles.getImage(id)
    },
    async addNewPart(image, lines, order) {
        try {
            await introductionDao.addNewIntroduction(uuid.v4(), image.name, image.type, lines, order)
            await introductionFiles.addImage(image.name, fs.createReadStream(image.path), image.size, image.type)
            return {
                status: 'success',
                message: '添加成功.'
            }
        } catch (err) {
            return {
                status: 'failed',
                message: err
            }
        }
    },
    async getIntroductions() {
        return await introductionDao.getIntroductions()
    }
}