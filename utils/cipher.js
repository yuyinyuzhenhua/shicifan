const crypto = require('crypto');
const { alg, secret } = require('../config/config.default')


// 加密
exports.encrypt = function (data) {
    const cipher = crypto.createCipher(alg, secret);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


// 解密
exports.decrypt = function (data) {
    const decipher = crypto.createDecipher(alg, secret);
    
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8'); 
    return  decrypted;
}