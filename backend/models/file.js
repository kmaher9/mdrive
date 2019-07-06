const mongoose  = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: { type: String, required: false },
    size: { type: Number, required: false },
    location: { type: String, required: false },
    mime: { type: String, required: false },
    encoding: { type: String, required: false }
}, { timestamps: true })

module.exports = mongoose.model('file', fileSchema)