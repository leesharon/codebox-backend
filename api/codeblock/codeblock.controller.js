const codeblockService = require("./codeblock.service.js")
const logger = require("../../services/logger.service")
const { broadcast } = require("../../services/socket.service.js")
const asyncLocalStorage = require("../../services/als.service.js")

module.exports = {
    getCodeblocks,
    getCodeblockById,
    updateCodeblock,
}

async function getCodeblocks(req, res) {
    try {
        logger.debug("Getting code blocks")
        const codeBlocks = await codeblockService.query()
        res.json(codeBlocks)
    } catch (err) {
        logger.error("Failed to get code blocks", err)
        res.status(500).send({ err: "Failed to get code blocks" })
    }
}

async function getCodeblockById(req, res) {
    try {
        const codeblockId = req.params.id
        const codeblock = await codeblockService.getById(codeblockId)
        res.json(codeblock)
    } catch (err) {
        logger.error("Failed to get code block", err)
        res.status(500).send({ err: "Failed to get code block" })
    }
}

async function updateCodeblock(req, res) {
    try {
        const codeblock = req.body
        const updatedCodeblock = await codeblockService.update(codeblock)

        const loggedinUser = asyncLocalStorage.getStore().loggedinUser
        broadcast({
            type: "update-codeblock",
            data: { code: updatedCodeblock.code },
            room: updatedCodeblock._id,
            userId: loggedinUser?._id,
        })

        res.json(updatedCodeblock)
    } catch (err) {
        logger.error("Failed to update code block", err)
        res.status(500).send({ err: "Failed to update code block" })
    }
}
