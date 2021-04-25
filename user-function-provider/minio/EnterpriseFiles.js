let minioClient = require('../minio')

const bucketName = 'enterprise'

minioClient.bucketExists(bucketName).then(flag => {
    if (!flag) {
        minioClient.makeBucket(bucketName, '', err => {
            if (err) {
                console.log('Minio出现错误, ', err)
            }
        })
    }
})

module.exports = {
    async addFile(id, stream, size, contentType) {
        return await new Promise((resolve, reject) => {
            minioClient.putObject(bucketName, id, stream, size, contentType, (err, ret) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async getFile(id) {
        return await Promise((resolve, reject) => {
            minioClient.getObject(bucketName, id, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}