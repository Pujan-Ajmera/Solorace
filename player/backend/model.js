const mongoose = require('mongoose')
const schema = mongoose.Schema({
    path:String,
    name:String,
    id: { type: Number, unique: true }
})

const model = mongoose.model('solorace',schema)

module.exports = model;