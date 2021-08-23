const router = require('express').Router()
const {
    getAllRegister,
    getRegister,
    AddFavorite,
    removeFavorite,
    getFavorites,
    verifyCache,
} = require('../services/index')


router.get('/', verifyCache, getAllRegister)
router.get('/search/:id', verifyCache, getRegister)
router.post('/favorite', AddFavorite)
router.delete('/favorite/:appid', removeFavorite)
router.get('/favorite', verifyCache, getFavorites)

module.exports = router

