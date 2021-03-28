let minioClient = require('../minio')

const bucketName = 'introduction'

minioClient.bucketExists('introduction').then(flag => {
    if (!flag) {
        minioClient.makeBucket(bucketName, null, err => {
            console.log('Minio出现错误, ', err)
        })
    }
})

module.exports = {
    async addImage(id, stream, size, contentType) {
        return await new Promise((resolve, reject) => {
            minioClient.putObject(bucketName, id, stream, size, contentType, (err, etag) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(etag)
                }
            })
        })
    },
    async getImage(id) {
        return await new Promise((resolve, reject) => {
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