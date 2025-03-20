const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const  authMiddleware = require('../middleware/authMiddleware');


router.post('/register' , userController.registerNewUser );
router.get('/single-user',  authMiddleware, userController.getUserById );

module.exports = router