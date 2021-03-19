const UserModel = require('../models/UserModel')

module.exports = {
    async findByUsername(username) {
        return await UserModel.findOne({ username })
    },
    async addNewUser(params) {
        return await UserModel.create(params)
    },
    async findById(id) {
        return await UserModel.findOne({ id })
    }
}