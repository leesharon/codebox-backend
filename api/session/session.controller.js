const logger = require("../../services/logger.service")
const sessionService = require("./session.service.js")

async function add(req, res) {
    try {
        const session = req.body
        const addedSession = await sessionService.add(session)
        res.json(addedSession)

    } catch (err) {
        logger.error("Failed to add session", err)
        res.status(500).send({ err: "Failed to add session" })
    }
}

module.exports = { add }