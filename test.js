const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
// Use the async `crypto.scrypt()` instead.
const key = crypto.scryptSync(password, 'salt', 24);
// Use `crypto.randomBytes` to generate a random iv instead of the static iv
// shown here.
const iv = Buffer.alloc(16, 0); // Initialization vector.


// 创建一个加密对象
// 第一个参数：加密算法
// 第二个参数：加解密的私钥
const cipher = crypto.createCipheriv(algorithm, key, iv);


// 使用加密对象对指定的字符串进行加密
let encrypted = cipher.update('some clear text data', 'utf8', 'hex');

// 加密对象调用，final方法结束加密，阐述加密的结果，指定输出结果为16进制的格式
encrypted += cipher.final('hex');
console.log(encrypted);