const router = require('express').Router()
const Alergia = require('../models/Alergia')
const InfoMedica = require('../models/InfoMedica')

router.post('/new', async (req, res) => {
    try {
        const alergia = new Alergia(req.body)
        await alergia.save()
        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $push: { alergias: alergia } }
        )
        res.status(200).json({
            msg: 'Alergia criada com sucesso',
            alergia: alergia
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const alergias = await Alergia.find()
        res.status(200).json(alergias)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:elementoCausador', async (req, res) => {
    try {
        const alergia = await Alergia.findOneAndDelete({
            elementoCausador: req.params.elementoCausador
        })

        const infoMedica = await InfoMedica.findOneAndUpdate(
            { nome: 'infoMedica' },
            { $pull: { alergias: alergia._id } }
        )

        res.status(200).json({ msg: 'Alergia excluida', alergia: alergia })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/put/:elementoCausador', async (req, res) => {
    try {
        const alergia = await Alergia.findOneAndUpdate(
            { elementoCausador: req.params.elementoCausador },
            { $set: req.body }
        )

        const alergiaAtualizada = await Alergia.findOne({
            elementoCausador: req.params.elementoCausador
        })

        res.status(200).json({ msg: 'Alergia atualizada', alergia: alergiaAtualizada })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
