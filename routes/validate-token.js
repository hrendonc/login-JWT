const jwt = require('jsonwebtoken')

// Middleware para validar token
const verifyToken = (req, res, next)=>{
    const token = req.header('auth-token')
    if (!token) {
        return res.status(404).json({
            error: 'Acceso denegado!'
        })
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next() //Continuar
    } catch (error) {
        res.status(400).json({
            error: 'Token invalido!'
        })
    }
}

module.exports = verifyToken