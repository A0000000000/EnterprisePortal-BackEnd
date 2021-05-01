const axios = require('axios')

class Fegin {
    constructor(name, url) {
        this.name = name
        this.url = url
    }

    requestProxy(callback) {
        axios.get(this.url + '/api/service/' + this.name).
            then(res => {
                const data = res.data
                if (data.code !== 200) {
                    callback(data.message)
                    console.log('微服务不存在.')
                } else {
                    
                    const profix = data.data.url + ':' + data.data.port
                    callback(null, profix)
                }
            })
    }

    async get(url, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy((err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.get(profix + url, options).then(res => {
                    let data = res.data
                    if (data.code === 200) {
                        resolve(data.data)
                    } else {
                        console.log(data.message)
                        reject(err)
                    }
                })
            })
        })
    }

    async post(url, params, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy((err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.post(profix + url, params, options).then(res => {
                    let data = res.data
                    if (data.code === 200) {
                        resolve(data.data)
                    } else {
                        console.log(data.message)
                        reject(err)
                    }
                })
            })
        })
    }

    async put(url, params, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy((err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.put(profix + url, params, options).then(res => {
                    let data = res.data
                    if (data.code === 200) {
                        resolve(data.data)
                    } else {
                        console.log(data.message)
                        reject(err)
                    }
                })
            })
        })
    }

    async delete(url, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy((err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.delete(profix + url, options).then(res => {
                    let data = res.data
                    if (data.code === 200) {
                        resolve(data.data)
                    } else {
                        console.log(data.message)
                        reject(err)
                    }
                })
            })
        })
    }

}

module.exports = Fegin