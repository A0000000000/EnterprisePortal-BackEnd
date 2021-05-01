const locationDao = require('../dao/LocationDao')
const uuid = require('node-uuid')
const userService = require('../service/UserService')

module.exports = {
    async addNewLocation(token, params) {
        const data = await userService.paserToken(token)
        if (data.code !== 200) {
            return data
        }
        params.userId = data.data.id
        params.id = uuid.v4()
        const ret = await locationDao.addNewLocation(params)
        if (ret && ret.id === params.id) {
            return {
                code: 200,
                message: '添加成功.'
            }
        } else {
            return {
                code: 500,
                message: '服务器忙.'
            }
        }
    },
    async getAllLocation(token) {
        const data = await userService.paserToken(token)
        if (data.code !== 200) {
            return data
        }
        const ret = await locationDao.getAllLocation(data.data.id)
        if (ret) {
            return {
                code: 200,
                message: '查询成功.',
                data: ret
            }
        } else {
            return {
                code: 500,
                message: '服务器忙.'
            }
        }
    },
    async deleteById(token, id) {
        const data = await userService.paserToken(token)
        if (data.code !== 200) {
            return data
        }
        const model = await locationDao.getLocationById(id)
        if (model.userId === data.data.id) {
            await locationDao.deleteLocation(model.id)
            return {
                code: 200,
                message: '删除成功.'
            }
        }
        return {
            code: 500,
            message: '权限不足.'
        }
    }
}