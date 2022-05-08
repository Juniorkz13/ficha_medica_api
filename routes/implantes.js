const router = require('express').Router()
const Implante = require('../models/Implante')
const InfoMedica = require('../models/InfoMedica')

router.post('/new', async (req, res) => {
    try {
        const implante = new Implante(req.body)
        await implante.save()
        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $push: { implantes: implante } }
        )
        res.status(200).json({
            msg: 'Implante criado com sucesso',
            implante: implante
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const implantes = await Implante.find()
        res.status(200).json(implantes)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:nome', async (req, res) => {
    try {
        const implante = await Implante.findOneAndDelete({
            nome: req.params.nome
        })

        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $pull: { implantes: implante._id } }
        )

        res.status(200).json({ msg: 'Implante excluido', implante: implante })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/put/:nome', async (req, res) => {
    try {
        const implante = await Implante.findOneAndUpdate(
            { nome: req.params.nome },
            { $set: req.body }
        )

        const implanteAtualizado = await Implante.findOne({
            nome: req.params.nome
        })

        res.status(200).json({ msg: 'Implante atualizado', implante: implanteAtualizado })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
