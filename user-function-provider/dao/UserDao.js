const UserModel = require('../models/UserModel')

module.exports = {
    async findByUsername(username) {
        return await UserModel.findOne({ username: username })
    },
    async addNewUser(params) {
        return await UserModel.create(params)
    },
    async findById(id) {
        return await UserModel.findOne({ id })
    },
    async updateById(model) {
        return await UserModel.findOneAndUpdate({ id: model.id }, model)
    },
    async findAll() {
        return await UserModel.find({})
    }
}