const fs = require('fs')
const uuid = require('node-uuid')
const goodDao = require('../dao/GoodDao')
const imageDao = require('../dao/ImageDao')
const goodFile = require('../minio/GoodFile')
const Fegin = require('../fegin')
const userFegin = new Fegin('user-function-provider', 'http://localhost:8000')

module.exports = {
    async getAllGoods(type) {
        return await goodDao.getAllGoods(type)
    },
    async getGoodById(id) {
        return await goodDao.getGoodById(id)
    },
    async getImageById(id) {
        let image = await imageDao.getImageById(id)
        return {
            data: await goodFile.getFile(image.filename),
            type: image.contentType
        }
    },
    async addNewGood(token, params, image) {
        if (!token) {
            return {
                code: 500,
                message: '请先登录.'
            }
        }
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
        let imageModel = {
            id: uuid.v4(),
            filename: image.name,
            contentType: image.type,
            type: 'icon',
            createTime: Date.now()
        }
        await goodFile.addFile(imageModel.filename, fs.createReadStream(image.path), image.size, image.type)
        await imageDao.addNewImage(imageModel)
        await goodDao.addNewGood({
            id: uuid.v4(),
            name: params.name,
            price: params.price,
            picture: imageModel.id,
            count: params.count,
            details: params.details,
            type: params.type,
            time: Date.now()
        })
        return {
            code: 200,
            message: '添加成功.'
        }
    },
    async updateGood(token, params) {
        if (!token) {
            return {
                code: 500,
                message: '请先登录.'
            }
        }
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
        if (!params || !params.id) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        let good = await goodDao.getGoodById(params.id)
        if (params.name) {
            good.name = params.name
        }
        if (params.price) {
            good.price = params.price
        }
        if (params.count) {
            good.count = params.count
        }
        if (params.details) {
            good.details = params.details
        }
        if (params.type) {
            good.type = params.type
        }
        await goodDao.updateGood(good)
        return {
            code: 200,
            message: '修改成功.'
        }
    },
    async uploadImage(token, image) {
        if (!token) {
            return {
                code: 500,
                message: '请先登录.'
            }
        }
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
        if (!image) {
            return {
                code: 500,
                message: '图片不能为空'
            }
        }
        let imageModel = {
            id: uuid.v4(),
            filename: image.name,
            contentType: image.type,
            type: 'content',
            createTime: Date.now()
        }
        await goodFile.addFile(imageModel.filename, fs.createReadStream(image.path), image.size, image.type)
        await imageDao.addNewImage(imageModel)
        return {
            code: 200,
            message: '上传成功.'
        }
    },
    async getImageList(token) {
        if (!token) {
            return {
                code: 500,
                message: '请先登录.'
            }
        }
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
        return {
            code: 200,
            data: await imageDao.getAllImages('content')
        }
    }
}
