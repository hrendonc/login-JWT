const router = require('express').Router()
const User = require('../models/User')

router.post('/register', async (req, res)=>{
    console.log(req.body.name)
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    } catch(e){
        res.status(400).json({e})
    }
})

module.exports = router