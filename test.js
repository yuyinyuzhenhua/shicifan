const crypto = require('crypto');



// 创建一个加密对象
// 第一个参数：加密算法
// 第二个参数：加解密的私钥
const cipher = crypto.createCipher('aes192', 'a password');


// 使用加密对象对指定的字符串进行加密
let encrypted = cipher.update('some clear text data', 'utf8', 'hex');

// 加密对象调用，final方法结束加密，阐述加密的结果，指定输出结果为16进制的格式
encrypted += cipher.final('hex');
console.log('加密结果：：'+encrypted);


const decipher = crypto.createDecipher('aes192', 'a password');

const encrypted1 ="ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504"

let decrypted = decipher.update(encrypted1, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('解密结果：：：' + decrypted);