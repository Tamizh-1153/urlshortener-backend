const express = require('express')
const router=express.Router()

const {forgotPassword,resetPassword,login,register}=require('../controllers/user')


router.route('/login').post(login)
router.route('/register').post(register)
router.route('/forgot_password').post(forgotPassword)
router.route('/reset_password/:id/:token').post(resetPassword)



module.exports=router