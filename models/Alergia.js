const mongoose = require('mongoose')
const AlergiaSchema = new mongoose.Schema(
    {
        elementoCausador: String,
        sintomas: String,
        observacoes: String
    },
    { typeKey: '$type' }
)

module.exports = mongoose.model('Alergia', AlergiaSchema)
