const mongoose  = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: false },
    location: { type: String, required: true },
    mime: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('file', fileSchema)