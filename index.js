const express = require('express')
const app = express()

app.use('/', (req, res)=>{
    res.send('Hola mundo!')
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})