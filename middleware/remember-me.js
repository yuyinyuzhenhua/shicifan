const User = require('../service/user')

module.exports = async(req, res, next) => {
    const { user: sessionUser } = req.session;

    if (!sessionUser) {
        let { user: cookieUser } = req.cookies;
        console.log(cookieUser)
        if (!cookieUser) {
            return next()
        }
        // cookie 里有用户信息
        // 验证用户信息是否正确
        try {
            cookieUser = JSON.parse(cookieUser)
            console.log(1212)
            const ret = await User.signin({
                email: cookieUser.email,
                password: cookieUser.password
            })
            console.log(ret);
            // 保持登录状态
            req.session.user = ret
        } catch (err) {
            return next()
        }
    }
    next()
}