const mongoose = require('mongoose')

const InfoMedicaSchema = new mongoose.Schema({
    nome: String,
    condicoesMedicas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CondicaoMedica' }],
    alergias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alergia' }],
    implantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Implante' }],
    hospitalizacoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospitalizacao' }],
    cirurgias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cirurgia' }]
})

module.exports = mongoose.model('InfoMedica', InfoMedicaSchema)
