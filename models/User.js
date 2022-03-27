const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date
})

module.exports = mongoose.model('User', userSchema)
