const router = require('express').Router()
const Hospitalizacao = require('../models/Hospitalizacao')
const InfoMedica = require('../models/InfoMedica')

router.post('/new', async (req, res) => {
    try {
        const hospitalizacao = new Hospitalizacao(req.body)
        await hospitalizacao.save()
        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $push: { hospitalizacoes: hospitalizacao } }
        )
        res.status(200).json({
            msg: 'Hospitalizacao criada com sucesso',
            hospitalizacao: hospitalizacao
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const hospitalizacoes = await Hospitalizacao.find()
        res.status(200).json(hospitalizacoes)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:nomeHospital', async (req, res) => {
    try {
        const hospitalizacao = await Hospitalizacao.findOneAndDelete({
            nomeHospital: req.params.nomeHospital
        })

        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $pull: { hospitalizacoes: hospitalizacao._id } }
        )

        res.status(200).json({ msg: 'Hospitalizacao excluida', hospitalizacao: hospitalizacao })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/put/:nomeHospital', async (req, res) => {
    try {
        const hospitalizacao = await Hospitalizacao.findOneAndUpdate(
            { nomeHospital: req.params.nomeHospital },
            { $set: req.body }
        )

        const hospitalizacaoAtualizada = await Hospitalizacao.findOne({
            nomeHospital: req.params.nomeHospital
        })

        res.status(200).json({
            msg: 'Hospitalizacao atualizada',
            hospitalizacao: hospitalizacaoAtualizada
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
