let Minio = require('minio')

let minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'a00000',
    secretKey: 'Aa000000'
})


module.exports = minioClient