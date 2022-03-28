const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const authRoutes = require('./routes/auth.js')
const dashboardRoutes = require('./routes/dashboard')
const verifyToken = require('./routes/validate-token')

// Capturar body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conexión a la base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fda5w.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.error('Error DB:', e))

// Middlewares
app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyToken, dashboardRoutes)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})