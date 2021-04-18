const fs = require('fs')
const cultureFiles = require('../minio/CultureFiles')
const uuid = require('node-uuid')
const cultureDao = require('../dao/CultureDao')

module.exports = {
    async getImage(id) {
        return await cultureFiles.getImage(id)
    },
    async addNewPart(image, title, lines, order) {
        try {
            await cultureDao.addNewCultureDao(uuid.v4(), image.name, image.type, title, lines, order)
            await cultureFiles.addImage(image.name, fs.createReadStream(image.path), image.size, image.type)
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
    async getCultures() {
        return await cultureDao.getCultures()
    }
}