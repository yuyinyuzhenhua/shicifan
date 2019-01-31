const axios = require('axios')
const svgCaptcha = require('svg-captcha');
const User = require('../service/user')

exports.showIndex = async (req, res, next) => {
    res.render('index.html', {sessionUser: req.session.user})
}

exports.showLogin = async (req, res, next) => {
    res.render('login.html')
}

exports.signup = async (req, res, next) => {
    try {
        // 1.获取数据
        const { email, password, nickname, captcha } =  req.body
        const { captcha: sessionCaptcha } = req.session
        
        // 2. 表单数据验证

        // 3. 业务处理
        // 3.1 校验昵称是否被占用
        if (await User.findByNickname(nickname)) {
            return res.status(200).json({
                code: 2,
                message: '昵称已存在'
            })
        }
    
        // console.log(captcha, sessionCaptcha.text)
        
        // 如果当前时间 超过 会话验证码的过期时间
        if( +new Date() > +sessionCaptcha.expires) {
            return res.status(200).json({
                code: 4,
                message: '验证码过期'
            })
        }

        // 2. 表单数据验证
            // 验证码校验
        if (captcha.toLowerCase() !== sessionCaptcha.text.toLowerCase()) {
            return res.status(200).json({
                code:1,
                message:'验证码错误'
            })
        }
        // 3. 业务处理
        const ret = await User.signup({
            email,
            password,
            nickname
        })
        console.log('ret-----');
        console.log(ret);
        req.session.user = ret

        res.send(ret)


    } catch (err) {
        next(err)
    }


}


// 创建验证码的时候，把验证码的值写在req.session
exports.captcha = async (req, res, next) => {
    var captcha = svgCaptcha.create();   //创建验证码
    req.session.captcha = {
        text: captcha.text,
        expires: +new Date() + 1000 * 15 * 60
    };  //  把验证码文本存储到 session 中
    
    res.type('svg');   //设置响应内容类型
    res.status(200).send(captcha.data);   //发送响应结果
}


exports.checkCaptcha = async (req, res, next) => {
    const { captcha } = req.query
    const { captcha: sessionCaptcha } = req.session

    let ret = false;
    if (+new Date() < +sessionCaptcha.expires && captcha.toLowerCase() === sessionCaptcha.text.toLowerCase()) {
        ret = true;
    }    
    res.status(200).send(ret)
}


// 用户登录
exports.signin = async (req, res, next) => {
    try {
        const { email, password, remember} = req.body

        // 校验用户名是否存在
        // 校验密码是否正确
        // 登陆成功


        const user = await User.signin({
            email,
            password
        })

        // 用户登陆成功，记录session保存登录状态
        req.session.user = user

        res.send(user);

    } catch (err) {
        next(err)
    }
}