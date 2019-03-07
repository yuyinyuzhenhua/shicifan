const express = require('express')
const router = express.Router()
const commentCtrl = require('../controller/comment')

router
  .get('/comments', commentCtrl.list)

module.exports = router