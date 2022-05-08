const mongoose = require('mongoose')
const ImplanteSchema = new mongoose.Schema(
    {
        nome: String,
        tipo: String,
        data: String,
        observacoes: String
    },
    { typeKey: '$type' }
)

module.exports = mongoose.model('Implante', ImplanteSchema)
