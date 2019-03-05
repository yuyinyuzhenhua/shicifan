const User = require('../service/user')

module.exports = async(req, res, next) => {
    const { user: sessionUser } = req.session;

    if (!sessionUser) {
        let { user: cookieUser } = req.cookies;
        if (!cookieUser) {
            return next()
        }
        // cookie 里有用户信息
        // 验证用户信息是否正确
        try {
            cookieUser = JSON.parse(cookieUser)
            const ret = await User.signin({
                email: cookieUser.email,
                password: cookieUser.password
            })
            // 保持登录状态
            req.session.user = ret
        } catch (err) {
            return next()
        }
    }
    next()
}