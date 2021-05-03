const uuid = require('node-uuid')
const orderDao = require('../dao/OrderDao')
const Fegin = require('../fegin')

const userFegin = new Fegin('user-function-provider', 'http://localhost:8000')
const goodFegin = new Fegin('good-function-provider', 'http://localhost:8000')
const couponFegin = new Fegin('coupon-function-provider', 'http://localhost:8000')

module.exports = {
    async createNewOrder(token, params) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        let model = {
            id: uuid.v4(),
            userId: userResult.id,
            createTime: Date.now(),
            status: 0
        }
        if (!params || !params.goods || params.goods.length === 0) {
            return {
                code: 500,
                message: '购买的商品不存在.'
            }
        }
        model.goods = params.goods
        if (!params.location) {
            return {
                code: 500,
                message: '收货地址不存在'
            }
        }
        if (params.location.type === 'USE_OLD') {
            model.location = params.location.id
        } else {
            const locationData = await userFegin.post('/api/location/addNewLocation', {
                name: params.location.name,
                details: params.location.details
            }, {
                headers: {
                    token
                }
            })
            model.location = locationData
        }
        await goodFegin.post('/api/good/subPrice', {
            goods: model.goods
        }, {
            headers: {
                token
            }
        })
        model.coupon = params.coupon
        if (model.coupon) {
            await couponFegin.get('/api/couponInfo/useCoupon/' + model.coupon, {
                headers: {
                    token
                }
            })
        }
        await orderDao.createNewOrder(model)
        return {
            code: 200,
            data: model.id
        }
    },
    async getOrderById(token, id) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        let model = await orderDao.getOrderById(id)
        if (model.userId !== userResult.id) {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        return {
            code: 200,
            data: model
        }
    },
    async getOrders(token) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        return {
            code: 200,
            data: await orderDao.getOrdersByUserId(userResult.id)
        }
    },
    async sureSend(token, id) {
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
        await orderDao.changeStatus(id, 1)
        return {
            code: 200,
            message: '发货成功.'
        }
    },
    async sureReceiver(token, id) {
        const userResult = await userFegin.get('/api/user/token', {
            headers: {
                token
            }
        })
        const model = await orderDao.getOrderById(id)
        if (model.userId !== userResult.id) {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        await orderDao.changeStatus(id, 2)
        return {
            code: 200,
            message: '收货成功.'
        }
    },
    async getAllOrder(token) {
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
            data: await orderDao.getOrders()
        }
    }
}