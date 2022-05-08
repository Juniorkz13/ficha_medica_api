const express = require('express')
const mongoose = require('mongoose')
const infoMedicaRoute = require('./routes/infoMedica')
const alergiaRoute = require('./routes/alergias')
const cirurgiaRoute = require('./routes/cirurgias')
const condicaoMedicaRoute = require('./routes/condicoesMedicas')
const hospitalizacaoRoute = require('./routes/hospitalizacoes')
const implanteRoute = require('./routes/implantes')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/infoMedica', infoMedicaRoute)
app.use('/infoMedica/alergias', alergiaRoute)
app.use('/infoMedica/cirurgias', cirurgiaRoute)
app.use('/infoMedica/condicoesMedicas', condicaoMedicaRoute)
app.use('/infoMedica/hospitalizacoes', hospitalizacaoRoute)
app.use('/infoMedica/implantes', implanteRoute)

mongoose
    .connect(
        'mongodb+srv://admin:admin@apicluster.evtkx.mongodb.net/db?retryWrites=true&w=majority'
    )
    .then(() => {
        console.log('Conectado ao mongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
