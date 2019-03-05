module.exports = {
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    rememberMeExpires: 1000 * 60 * 60 * 60 * 24 ,
    crypto: {
        alg: 'aes-256-cfb',
        secret: 'hello'
    }
}