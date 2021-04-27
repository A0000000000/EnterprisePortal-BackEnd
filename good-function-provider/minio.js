let Minio = require('minio')

let minioClient = new Minio.Client({
    endPoint: '192.168.99.100',
    port: 9000,
    useSSL: false,
    accessKey: 'a00000',
    secretKey: 'Aa000000'
})


module.exports = minioClient