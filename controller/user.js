const User = require('../service/user')


exports.check = async (req, res, next) => {
    const { nickname } = req.query
    if(await User.findByNickname(nickname)) {
        res.status(200).send(false)
    } else {
        res.status(200).send(true)
    }
}