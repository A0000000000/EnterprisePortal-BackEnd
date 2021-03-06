const feedbackDao = require('../dao/FeedbackDao')
const FeignClient = require('../fegin')
const uuid = require('node-uuid')

const userFeign = new FeignClient('user-function-provider', 'http://localhost:8000')

module.exports = {
    async addNewFeedback(params, token) {
        const userResult = await userFeign.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (!userResult || !userResult.id) {
            return {
                code: 500,
                message: '请先登录.'
            }
        }
        params.userId = userResult.id
        params.id = uuid.v4()
        await feedbackDao.addNewFeedback(params)
        return {
            code: 200,
            message: '反馈成功.'
        }
    },
    async getAllFeedback(token) {
        const userResult = await userFeign.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (!userResult || !userResult.id) {
            return {
                code: 500,
                message: '请先登录.'
            }
        }
        return {
            code: 200,
            data: await feedbackDao.getAllFeedback(userResult.id)
        }
    },
    async getFeedbacks(token) {
        const userResult = await userFeign.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (userResult.role !== 'ROLE_ADMIN' && userResult.role !== 'ROLE_MANAGER') {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        return {
            code: 200,
            data: await feedbackDao.findAll()
        }
    },
    async setResult(token, params) {
        const userResult = await userFeign.get('/api/user/token', {
            headers: {
                token
            }
        })
        if (userResult.role !== 'ROLE_ADMIN' && userResult.role !== 'ROLE_MANAGER') {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        const model = await feedbackDao.getById(params.id)
        model.status = 1
        model.result = params.result
        await feedbackDao.updateById(model)
        return {
            code: 200,
            message: '反馈成功.'
        }
    }
}