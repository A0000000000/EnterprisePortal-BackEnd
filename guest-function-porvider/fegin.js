const axios = require('axios')

class Fegin {
    constructor(name, url) {
        this.name = name
        this.url = url
    }

    requestProxy(callback) {
        axios.get(this.url + '/api/service/' + this.name).
        then(data => {
            if (data.status !== 'success') {
                callback(data.message)
                console.log('微服务不存在.')
            } else {
                const profix = data.url + ':' + data.port
                callback(null, profix)
            }
        })
    }

    get(url, options, callback) {
        this.requestProxy((err, profix) => {
            if (err) {
                callback(err)
                return
            }
            axios.get(profix + url, options).then(data => {
                if(data.status === 'success') {
                    callback(null, data.data)
                } else {
                    console.log(data.message)
                    callback(err)
                }
            })
        })
    }

    post(url, params, options, callback) {
        this.requestProxy((err, profix) => {
            if (err) {
                callback(err)
                return
            }
            axios.post(profix + url, params, options).then(data => {
                if(data.status === 'success') {
                    callback(null, data.data)
                } else {
                    console.log(data.message)
                    callback(err)
                }
            })
        })
    }

    put(url, params, options, callback) {
        this.requestProxy((err, profix) => {
            if (err) {
                callback(err)
                return
            }
            axios.put(profix + url, params, options).then(data => {
                if(data.status === 'success') {
                    callback(null, data.data)
                } else {
                    console.log(data.message)
                    callback(err)
                }
            })
        })
    }

    delete(url, options, callback) {
        this.requestProxy((err, profix) => {
            if (err) {
                callback(err)
                return
            }
            axios.delete(profix + url, options).then(data => {
                if(data.status === 'success') {
                    callback(null, data.data)
                } else {
                    console.log(data.message)
                    callback(err)
                }
            })
        })
    }

}

module.exports = Fegin