const axios = require('axios')

function register(url, params) {
    axios.post(url + '/api/register', params).then(function (data) {
        if (data.data.code === 200) {
            console.log('成功向注册中心完成注册.')
        }
    })
}

function flush(url, params) {
    setInterval(function () {
        axios.get(url + '/api/flush/' + params.name).
            then(function (data) {
                if (data.data.code !== 200) {
                    console.log('刷新失败, 准备重新向注册中心进行注册.')
                    register(url, params)
                }
            })
    }, 2000)
}

module.exports = function (url, params) {
    register(url, params)
    flush(url, params)
}