const express = require('express')
const indexCtrl = require('../controller/index')
const userCtrl = require('../controller/user')
const { body,query } = require('express-validator/check');
const checkSchema = require('../middleware/check-schema')


const router = express.Router();


router
    .get('/', indexCtrl.showIndex)
    .get('/login', indexCtrl.showLogin)
    .get('/captcha', indexCtrl.captcha)

    .post('/signup',...checkSchema([    //验证规则
        body('email').isEmail(),
        body('password').not().isEmpty(),
        body('nickname').not().isEmpty(),
        body('captcha').not().isEmpty()
    ]),indexCtrl.signup)

    .get('/users/check', userCtrl.check)
    .get('/captcha/check',...checkSchema([
        query('captcha').not().isEmpty()
    ]), indexCtrl.checkCaptcha)

router
    .post('/signin',...checkSchema([
         body('email').not().isEmpty(),
         body('password').not().isEmpty(),
    ]),indexCtrl.signin)

module.exports = router