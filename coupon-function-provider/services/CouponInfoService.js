const couponInfoDao = require('../dao/CouponInfoDao')
const couponDao = require('../dao/CouponDao')
const FeignClient = require('../fegin')
const uuid = require('node-uuid')
const userFegin = new FeignClient('user-function-provider', 'http://localhost:8000')

module.exports = {
    async registerSendCoupon(token) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (!userResult) {
            return {
                code: 500,
                message: '登录失效, 请重新登录.'
            }
        }
        const couponArr = await couponDao.getCouponByType('REGISTER')
        for (index in couponArr) {
            const item = couponArr[index]
            let model = await couponInfoDao.getInfoByCouponId(userResult.id, item.id)
            if (!model) {
                model = {
                    id: uuid.v4(),
                    couponId: item.id,
                    userId: userResult.id,
                    status: 0,
                    getTime: Date.now(),
                    useTime: null
                }
                await couponInfoDao.addNewInfo(model)
            }
        }
        return {
            code: 200,
            message: '操作成功.'
        }
    },
    async getAllInfos(token) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (!userResult) {
            return {
                code: 500,
                message: '登录失效, 请重新登录.'
            }
        }
        return {
            code: 200,
            data: await couponInfoDao.getInfos(userResult.id)
        }
    },
    async updateCoupon(token, id) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (!userResult) {
            return {
                code: 500,
                message: '登录失效, 请重新登录.'
            }
        }
        const model = await couponInfoDao.getInfoById(id)
        if (model) {
            if (model.userId != userResult.id) {
                return {
                    code: 500,
                    message: '权限不足.'
                }
            }
            if (model.status !== 0) {
                return {
                    code: 500,
                    message: '数据已被使用.'
                }
            }
            model.status = 1
            model.useTime = Date.now()
            await couponInfoDao.updateInfo(model)
            return {
                code: 200,
                message: '成功.'
            }
        } else {
            return {
                code: 500,
                message: '数据不存在.'
            }
        }
    },
    async getCoupon(token, id) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (!userResult) {
            return {
                code: 500,
                message: '登录失效, 请重新登录.'
            }
        }
        const info = await couponInfoDao.getInfoById(id)
        if (!info || info.userId !== userResult.id) {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        return {
            code: 200,
            data: await couponDao.getCouponById(info.couponId)
        }
    }
}