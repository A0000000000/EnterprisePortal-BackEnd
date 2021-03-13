let mongoose = require('mongoose')
let url = 'mongodb://A00000:Aa.000000@192.168.99.100:27017/node?authSource=admin'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let connect = mongoose.connection

connect.on('open', () => {
    console.log('打开成功.')
})

connect.on('err', () => {
    console.log('打开失败.')
})

module.exports = {
    mongoose,
    connect
}