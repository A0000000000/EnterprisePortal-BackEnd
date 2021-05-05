const userDao = require('../dao/UserDao')
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const md5 = require('md5-node')
const enterpriseFile = require('../minio/EnterpriseFiles')
const secret = 'just for fun'
const FeginClient = require('../fegin')
const { getFile } = require('../minio/EnterpriseFiles')

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
        const operator = await userDao.findById(data.id)
        let user = null
        if (params.id && operator.role === 'ROLE_ADMIN') {
            user = await userDao.findById(params.id)
        } else {
            user = await userDao.findById(data.id)
        }
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
    },
    async getAllUser(token) {
        const user = await userDao.findById(jwt.verify(token, secret).id)
        if (user.role !== 'ROLE_ADMIN' && user.role != 'ROLE_MANAGER') {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        let arr = await userDao.findAll()
        if (user.role === 'ROLE_ADMIN') {
            return {
                code: 200,
                data: arr.filter(item => item.role !== 'ROLE_ADMIN')
            }
        } else {
            return {
                code: 200,
                data: arr.filter(item => item.role !== 'ROLE_ADMIN' && item.role !== 'ROLE_MANAGER')
            }
        }
    },
    async addNewUser(token, params) {
        const currentUser = await userDao.findById(jwt.verify(token, secret).id)
        if (currentUser.role !== 'ROLE_ADMIN') {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        if (!params.username || !params.password || !params.email || !params.role) {
            return {
                code: 500,
                message: '参数不足.'
            }
        }
        const user = await userDao.findByUsername(params.username)
        if (user && user.username === params.username) {
            return {
                code: 500,
                message: '用户名已存在.'
            }
        }
        const userModel = {
            id: uuid.v4(),
            username: params.username,
            password: md5(params.password),
            email: params.email,
            emailStatus: 'UnCheck',
            role: params.role === 'ROLE_MANAGER' ? 'ROLE_MANAGER' : params.role === 'ROLE_ENTERPRISE' ? 'ROLE_ENTERPRISE' : 'ROLE_USER',
            createTime: Date.now(),
            accountStatus: 1,
            contentType: null,
            filename: null
        }
        await userDao.addNewUser(userModel)
        return {
            code: 200,
            message: '添加成功.'
        }
    },
    async authXMZZ(token, id) {
        const currentUser = await userDao.findById(jwt.verify(token, secret).id)
        if (currentUser.role !== 'ROLE_ADMIN' && currentUser.role !== 'ROLE_MANAGER') {
            return {
                code: 500,
                message: '权限不足.'
            }
        }
        const obj = await userDao.findById(id)
        if (!obj || obj.role !== 'ROLE_ENTERPRISE' || obj.accountStatus !== 0) {
            return {
                code: 500,
                message: '账户无需认证.'
            }
        }
        obj.accountStatus = 1
        await userDao.updateById(obj)
        return {
            code: 200,
            message: '认证成功.'
        }
    },
    async getFile(id) {
        let obj = await userDao.findById(id)
        let file = await enterpriseFile.getFile(id)
        return {
            file,
            filename: obj.filename,
            contentType: obj.contentType
        }
    }
}