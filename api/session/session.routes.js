const express = require('express')
const { add } = require('./session.controller')

const router = express.Router()

router.post('/', add)

module.exports = router