const { login } = require('./auth.controller')

const express = require('express')
const router = express.Router()
router.post('/login', login)

module.exports = router