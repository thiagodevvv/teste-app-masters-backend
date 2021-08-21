const router = require('express').Router()
const {
    getAllRegister,
    getRegister,
    AddFavorite,
    removeFavorite
} = require('../services/index')

router.get('/', getAllRegister)
router.get('/:id', getRegister)
router.post('/favorite', AddFavorite)
router.delete('/favorite/:appid', removeFavorite)

module.exports = router

