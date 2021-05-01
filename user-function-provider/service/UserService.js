const userDao = require('../dao/UserDao')
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const md5 = require('md5-node')
const enterpriseFile = require('../minio/EnterpriseFiles')
const secret = 'just for fun'
const FeginClient = require('../fegin')

const couponFegin = new FeginClient('coupon-function-provider', 'http://localhost:8000')

module.exports = {
    async register(params) {
        // 校验用户名是否已存在
        const username = params.username
        const user = await userDao.findByUsername(username)
        if (user && user.id) {
            return {
                code: 500,
                message: '用户名已存在.'
            }
        }
        const id = uuid.v4()
        if (params.role === 'Enterprise') {
            await enterpriseFile.addFile(id, fs.createReadStream(params.file.path), params.file.size, params.file.type)
        }
        // 保存用户信息
        let model = {
            id: id,
            username: params.username,
            password: md5(params.password),
            role: (params.role === 'Enterprise' ? 'ROLE_ENTERPRISE' : 'ROLE_USER'),
            createTime: Date.now(),
            email: params.email,
            emailStatus: 'UnCheck',
            accountStatus: (params.role === 'Enterprise' ? 0 : 1),
            contentType: (params.role === 'Enterprise' ? params.file.type : null),
        }
        if (params.role === 'Enterprise') {
            model.filename = params.file.name
        }
        const ret = await userDao.addNewUser(model)
        // 生成一个token
        let token = jwt.sign({
            id: model.id,
            username: model.username
        }, secret, {
            expiresIn: 60 * 60 * 24
        })
        // 获取三张新人优惠券
        await couponFegin.get('/api/couponInfo/registerSendCoupon', {
            headers: {
                token
            }
        })
        if (result.code !== 200) {
            console.log(result.message)
        }
        // 判断是否保存成功
        if (ret && ret.username === params.username) {
            return {
                code: 200,
                message: '注册成功.'
            }
        } else {
            return {
                code: 500,
                message: '服务器忙.'
            }
        }
    },
    async login({ username, password }) {
        const user = await userDao.findByUsername(username)
        // 判断用户名密码是否正确
        if (!user || user.username !== username || user.password !== md5(password)) {
            return {
                code: 500,
                message: '用户名或密码错误.'
            }
        }
        // 编码jwt字符串
        let token = jwt.sign({
            id: user.id,
            username: user.username
        }, secret, {
            expiresIn: 60 * 60 * 24
        })
        return {
            code: 200,
            message: '登录成功',
            data: {
                token,
                role: user.role
            }
        }
    },
    async updateInfo(params, token) {
        const data = jwt.verify(token, secret)
        const user = await userDao.findById(data.id)
        if (!user) {
            return {
                code: 500,
                message: '用户不存在.'
            }
        }
        if (params.password) {
            user.password = md5(params.password)
        }
        if (params.email) {
            user.email = params.email
            user.emailStatus = 'UnCheck'
        }
        await userDao.updateById(user)
        return {
            code: 200,
            message: '更新成功.'
        }
    },
    async paserToken(token) {
        try {
            // 解析jwt字符串
            const data = jwt.verify(token, secret)
            const user = await userDao.findById(data.id)
            user.password = null
            return {
                code: 200,
                data: user
            }
        } catch (err) {
            return {
                code: 500,
                message: err
            }
        }
    }
}