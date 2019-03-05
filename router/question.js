const express = require('express')
const questionCtrl = require('../controller/question')
const { body } = require('express-validator/check')
const checkSchema = require('../middleware/check-schema')

const router = express.Router();

router
    .get('/questions/new', questionCtrl.showNew)
    
router    
    .post('/questions', ...checkSchema([
        body('title').not().isEmpty(),
        body('tags').not().isEmpty(),
        body('body').not().isEmpty()
    ]),questionCtrl.create)

router
    .get('/questions/:id', ...checkSchema([
    ]), questionCtrl.show)



module.exports = router
