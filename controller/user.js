const User = require('../service/user')


exports.check = async (req, res, next) => {
    const { nickname, email } = req.query
    console.log('nickname::::'+nickname);
    let user;
    if (email) {
        user = await User.findByEmail(email)
    } else if (nickname){
        user = await User.findByNickname(nickname)
    }
    res.status(200).send( user ? false : true );
}