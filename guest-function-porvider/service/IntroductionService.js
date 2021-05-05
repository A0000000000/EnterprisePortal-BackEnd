const fs = require('fs')
const introductionFiles = require('../minio/IntroductionFiles')
const uuid = require('node-uuid')
const introductionDao = require('../dao/IntroductionDao')
const Fegin = require('../fegin')
const userFegin = new Fegin('user-function-provider', 'http://localhost:8000')

module.exports = {
    async getImage(id) {
        return await introductionFiles.getImage(id)
    },
    async addNewPart(image, lines, order) {
        try {
            await introductionDao.addNewIntroduction(uuid.v4(), image.name, image.type, lines, order)
            if (image) {
                await introductionFiles.addImage(image.name, fs.createReadStream(image.path), image.size, image.type)
            }
            return {
                code: 200,
                message: '添加成功.'
            }
        } catch (err) {
            return {
                code: 500,
                message: err
            }
        }
    },
    async getIntroductions() {
        return await introductionDao.getIntroductions()
    },
    async deleteById(token, id) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (userResult.role !== 'ROLE_ADMIN' && userResult.role != 'ROLE_MANAGER') {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        await introductionDao.deleteById(id)
        return {
            code: 200,
            message: '删除成功.'
        }
    }
}