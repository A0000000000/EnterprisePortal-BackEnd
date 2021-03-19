const { mongoose, connect } = require('../mongodb')

const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    role: [],
    createTime: Date,
    birthday: Date,
    status: String,
    email: String
})


let UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel