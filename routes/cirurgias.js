const router = require('express').Router()
const Cirurgia = require('../models/Cirurgia')
const InfoMedica = require('../models/InfoMedica')

router.post('/new', async (req, res) => {
    try {
        const cirurgia = new Cirurgia(req.body)
        await cirurgia.save()
        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $push: { cirurgias: cirurgia } }
        )
        res.status(200).json({
            msg: 'Cirurgia criada com sucesso',
            cirurgia: cirurgia
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const cirurgias = await Cirurgia.find()
        res.status(200).json(cirurgias)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:nomeCirurgia', async (req, res) => {
    try {
        const cirurgia = await Cirurgia.findOneAndDelete({
            nomeCirurgia: req.params.nomeCirurgia
        })

        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $pull: { cirurgias: cirurgia._id } }
        )

        res.status(200).json({ msg: 'Cirurgia excluida', cirurgia: cirurgia })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/put/:nomeCirurgia', async (req, res) => {
    try {
        const cirurgia = await Cirurgia.findOneAndUpdate(
            { nomeCirurgia: req.params.nomeCirurgia },
            { $set: req.body }
        )

        const cirurgiaAtualizada = await Cirurgia.findOne({
            nomeCirurgia: req.params.nomeCirurgia
        })

        res.status(200).json({ msg: 'Cirurgia atualizada', cirurgia: cirurgiaAtualizada })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
