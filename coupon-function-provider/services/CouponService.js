const couponDao = require('../dao/CouponDao')
const FeignClient = require('../fegin')
const uuid = require('node-uuid')
const userFegin = new FeignClient('user-function-provider', 'http://localhost:8000')

module.exports = {
    async getAllCoupon(token) {
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
            data: await couponDao.getAllCoupon()
        }
    },
    async getCouponById(id) {
        return {
            code: 200,
            data: await couponDao.getCouponById(id)
        }
    },
    async addNewCoupon(token, params) {
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
        if (!params || !params.type || !params.condition || !params.money || !params.count) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        const model = {
            id: uuid.v4(),
            type: params.type,
            condition: params.condition,
            money: params.money,
            count: params.count,
            createTime: Date.now()
        }
        await couponDao.addNewCoupon(model)
        return {
            code: 200,
            message: '添加成功.'
        }
    },
    async updateCoupon(token, params) {
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
        const model = await couponDao.getCouponById(params.id)
        if (params.type) {
            model.type = params.type
        }
        if (params.condition) {
            model.condition = params.condition
        }
        if (params.money) {
            model.money = params.money
        }
        if (params.count !== undefined) {
            model.count = params.count
        }
        await couponDao.updateCoupon(model)
        return {
            code: 200,
            message: '修改成功.'
        }
    },
    async deleteCouponById(token, id) {
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
        if (!id) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        await couponDao.deleteCouponById(id)
        return {
            code: 200,
            message: '删除成功.'
        }
    }
}