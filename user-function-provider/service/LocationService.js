const locationDao = require('../dao/LocationDao')
const uuid = require('node-uuid')

module.exports = {
    async addNewLocation(params) {
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
    async getAllLocation(id) {
        const ret = await locationDao.getAllLocation(id)
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
    }
}