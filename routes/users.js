const express = require('express')
const router = express.Router()
const { userValidations, userController } = require('../controllers/user-controller')

router.get('/register', async (req,res, next) => {
    res.render('users/register', {
        title: 'Register'
    })
})

router.post('/register', userValidations , async(req,res,next)=>{
    await userController.create(req, res, next)
})

router.get('login', async(req, res, next)=>{
    res.render('users/login',{
        title: 'Login'
    })
})

module.exports = router