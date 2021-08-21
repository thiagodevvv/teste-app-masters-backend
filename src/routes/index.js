const router = require('express').Router()
const {
    getAllRegister,
    getRegister,
    AddFavorite,
    removeFavorite,
    getFavorites
} = require('../services/index')


router.get('/', getAllRegister)
router.get('/search/:id', getRegister)
router.post('/favorite', AddFavorite)
router.delete('/favorite/:appid', removeFavorite)
router.get('/favorite', getFavorites)

module.exports = router

