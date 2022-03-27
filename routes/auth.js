const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const { findOne } = require('../models/User')

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
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

    // Password HASH
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
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

router.post('/login', async (req, res)=>{
    // Validaciones
    const {err} = schemaLogin.validate(req.body)
    if (err) {
        return res.status(400).json({
            error: err
        })
    }

    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).json({
            error: 'Existe un error en el usuario o conrtaseña, verifiquelo...'
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).json({
            error: 'Existe un error en el usuario o conrtaseña, verifiquelo...'
        })
    }

    res.json({
        error: null,
        data: 'Bienvenido!'
    })
})

module.exports = router