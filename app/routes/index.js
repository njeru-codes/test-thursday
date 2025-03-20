const express = require("express");
const router = express.Router();
const userRouter = require('./user')
const authRouter = require('./auth')
const commentRouter = require('./comment')

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/comments', commentRouter)


module.exports = router;