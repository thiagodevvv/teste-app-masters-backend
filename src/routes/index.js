const router = require('express').Router()
const {getAllRegister,getRegister} = require('../services/index')

router.get('/', getAllRegister)

module.exports = router

