const router = require('./auth')

const routes = require('express').Router()

router.get('/', (req, res)=>{
    res.json({
        error: null,
        data: {
            title: 'Mi ruta protegida',
            user: req.user
        }
    })
})

module.exports = router