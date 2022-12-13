const express = require('express')
const { requireStudent } = require('../../middlewares/requireAuth.middleware')
const { getCodeblocks, getCodeblockById, updateCodeblock } = require('./codeblock.controller')
const router = express.Router()

router.get('/', getCodeblocks)
router.get('/:id', getCodeblockById)
router.put('/:id', requireStudent, updateCodeblock)

module.exports = router
