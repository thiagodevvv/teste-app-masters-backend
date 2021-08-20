const router = require('express').Router()
const {
    getAllRegister,
    getRegister,
    favorite
} = require('../services/index')

router.get('/', getAllRegister)
router.get('/:id', getRegister)
router.post('/favorite', favorite)

module.exports = router

