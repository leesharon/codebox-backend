const express = require('express')
const { requireMentor } = require('../../middlewares/requireAuth.middleware')
const { add } = require('./session.controller')

const router = express.Router()
router.post('/', requireMentor, add)

module.exports = router