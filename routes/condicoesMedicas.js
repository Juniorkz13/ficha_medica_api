const router = require('express').Router()
const CondicaoMedica = require('../models/CondicaoMedica')
const InfoMedica = require('../models/InfoMedica')

router.post('/new', async (req, res) => {
    try {
        const condicaoMedica = new CondicaoMedica(req.body)
        await condicaoMedica.save()
        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $push: { condicoesMedicas: condicaoMedica } }
        )
        res.status(200).json({
            msg: 'Condição médica criada com sucesso',
            condicaoMedica: condicaoMedica
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const condicoesMedicas = await CondicaoMedica.find()
        res.status(200).json(condicoesMedicas)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:nome', async (req, res) => {
    try {
        const condicaoMedica = await CondicaoMedica.findOneAndDelete({
            nome: req.params.nome
        })

        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $pull: { condicoesMedicas: condicaoMedica._id } }
        )

        res.status(200).json({ msg: 'Condição médica excluida', condicaoMedica: condicaoMedica })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/put/:nome', async (req, res) => {
    try {
        const condicaoMedica = await CondicaoMedica.findOneAndUpdate(
            { nome: req.params.nome },
            { $set: req.body }
        )

        const condicaoMedicaAtualizada = await CondicaoMedica.findOne({
            nome: req.params.nome
        })

        res.status(200).json({
            msg: 'Condição médica atualizada',
            condicaoMedica: condicaoMedicaAtualizada
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
