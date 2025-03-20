const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()


router.post('/', authController.authUser )
router.post('/logout', authController.logoutUser)



module.exports = router