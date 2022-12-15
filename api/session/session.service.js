const logger = require('../../services/logger.service')
const dbService = require("../../services/db.service")

async function add(session) {
    try {
        const collection = await dbService.getCollection("session")
        await collection.insertOne(session)
        return session

    } catch (err) {
        logger.error("cannot insert session", err)
        throw err
    }
}

module.exports = { add }
