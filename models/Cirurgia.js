const mongoose = require('mongoose')
const CirurgiaSchema = new mongoose.Schema(
    {
        nomeCirurgia: String,
        data: String,
        nomeHospital: String,
        razao: String,
        observacoes: String
    },
    { typeKey: '$type' }
)

module.exports = mongoose.model('Cirurgia', CirurgiaSchema)
