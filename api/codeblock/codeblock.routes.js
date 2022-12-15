const express = require('express')
const { requireStudent, requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getCodeblocks, getCodeblockById, updateCodeblock } = require('./codeblock.controller')
const router = express.Router()

router.get('/', requireAuth, getCodeblocks)
router.get('/:id', requireAuth, getCodeblockById)
router.put('/:id', requireStudent, updateCodeblock)

module.exports = router
