const { mongoose, connect } = require('../mongodb')

const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    role: String,
    createTime: Date,
    email: String,
    emailStatus: String,
    accountStatus: Number,
    contentType: String,
    filename: String
})


let UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel