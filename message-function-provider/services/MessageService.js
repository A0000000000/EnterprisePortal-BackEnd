const uuid = require('node-uuid')
const fs = require('fs')
const messageDao = require('../dao/MessageDao')
const fileDao = require('../dao/FileDao')
const messageFile = require('../minio/MessageFile')
const FeignClient = require('../fegin')

const userFeign = new FeignClient('user-function-provider', 'http://localhost:8000')

module.exports = {
    async getMessageTitle() {
        return {
            code: 200,
            data: await messageDao.findAll()
        }
    },
    async getMessageById(id) {
        return {
            code: 200,
            data: await messageDao.findById(id)
        }
    },
    async addNewMessage(token, params) {
        if (!params || !params.title || !params.content) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        const userResult = await userFeign.get('/api/user/token', {
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
        let messageModel = {
            id: uuid.v4(),
            title: params.title,
            content: params.content,
            createTime: Date.now(),
            url: params.url,
            order: params.order
        }
        await messageDao.addNewMessage(messageModel)
        return {
            code: 200,
            message: '添加成功'
        }
    },
    async updateMessage(token, params) {
        if (!params || !params.id) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        const userResult = await userFeign.get('/api/user/token', {
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
        let messageModel = await messageDao.findById(params.id)
        if (params.title) {
            messageModel.title = params.title
        }
        if (params.content) {
            messageModel.content = params.content
        }
        if (params.order) {
            messageModel.order = params.order
        }
        if (params.url) {
            messageModel.url = params.url
        }
        await messageDao.updateMessage(messageModel)
        return {
            code: 200,
            message: '更新成功.'
        }
    },
    async deleteMessage(token, id) {
        if (!id) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        const userResult = await userFeign.get('/api/user/token', {
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
        await messageDao.deleteMessage(id)
        return {
            code: 200,
            message: '删除成功'
        }
    },
    async addImage(token, image) {
        try {
            const userResult = await userFeign.get('/api/user/token', {
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
            let fileModel = {
                id: uuid.v4(),
                filename: image.name,
                contentType: image.type,
                uploadTime: Date.now()
            }
            await fileDao.addImageInfo(fileModel)
            let res = await messageFile.addImage(image.name, fs.createReadStream(image.path), image.size, image.type)
            return {
                code: 200,
                data: fileModel.id,
                message: '上传成功'
            }
        } catch (err) {
            return {
                code: 500,
                message: err
            }
        }
    },
    async getImageById(id) {
        let image = await fileDao.getImageById(id)
        return {
            file: await messageFile.getImage(image.filename),
            contentType: image.contentType
        }
    },
    async getImageList(token) {
        const userResult = await userFeign.get('/api/user/token', {
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
            data: await fileDao.findAll()
        }
    }
}