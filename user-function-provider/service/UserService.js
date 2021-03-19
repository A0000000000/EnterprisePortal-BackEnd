const userDao = require('../dao/UserDao')
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
const secret = 'just for fun'

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
        // 保存用户信息
        const ret = await userDao.addNewUser({
            id: uuid.v4(),
            username: params.username,
            password: params.password,
            role: [(params.role === 'Enterprise' ? 'ROLE_ENTERPRISE' : 'ROLE_USER')],
            createTime: Date.now(),
            birthday: params.birthday,
            status: 'CREATE',
            email: params.email
        })
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
        if (!user || user.username !== username || user.password !== password) {
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
            data: token
        }
    },
    async paserToken(token) {
        try {
            // 解析jwt字符串
            const data = jwt.verify(token, secret)
            const user = await userDao.findById(data.id)
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