const router = require('express').Router()
const InfoMedica = require('../models/InfoMedica')

router.post('/', async (req, res) => {
    try {
        const infoMedica = new InfoMedica(req.body)
        infoMedica.nome = 'infoMedica'
        await infoMedica.save()
        res.status(200).json({
            msg: 'Informações Médicas criadas com sucesso',
            infoMedica: infoMedica
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const infoMedica = await InfoMedica.findOneAndDelete(req.body.id)
        res.status(200).json({ msg: 'Informações Médicas excluidas', inforMedica: infoMedica })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const infoMedica = await InfoMedica.find()
        res.status(200).json(infoMedica)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
