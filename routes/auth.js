const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(355).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/register', async (req, res)=>{   
    
    // Validar usuario
    const {error} = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({
            error:'Ups! ' + error.message
        })
    }

    // Validar si el correo ya esta registrado
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) {
        return res.status(400).json({
            error: 'Correo ya registrado'
        })
    }

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