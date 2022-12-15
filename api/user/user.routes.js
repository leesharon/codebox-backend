const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getUsers } = require('./user.controller')

const router = express.Router()
router.get('/', requireAuth, getUsers)

module.exports = router