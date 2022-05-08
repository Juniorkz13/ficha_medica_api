const mongoose = require('mongoose')
const HospitalizacaoSchema = new mongoose.Schema(
    {
        nomeHospital: String,
        data: String,
        numeroDias: String,
        razao: String,
        tratamento: String,
        observacoes: String
    },
    { typeKey: '$type' }
)

module.exports = mongoose.model('Hospitalizacao', HospitalizacaoSchema)
