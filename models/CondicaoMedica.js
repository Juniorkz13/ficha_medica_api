const mongoose = require('mongoose')
const CondicaoMedicaSchema = new mongoose.Schema(
    {
        nome: String,
        dataDiagnose: String,
        observacoes: String
    },
    { typeKey: '$type' }
)

module.exports = mongoose.model('CondicaoMedica', CondicaoMedicaSchema)
