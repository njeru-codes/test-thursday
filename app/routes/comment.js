const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')



router.get('/', commentController.getUserComments)
router.post('/', commentController.postUserComment)



module.exports = router