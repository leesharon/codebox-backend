const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const ObjectId = require("mongodb").ObjectId

module.exports = {
    query,
    getById,
    update,
}

async function query() {
    try {
        const collection = await dbService.getCollection("codeblock")
        const codeBlocks = await collection.find({}).toArray()
        return codeBlocks
    } catch (err) {
        logger.error("cannot find code blocks", err)
        throw err
    }
}

async function getById(codeblockId) {
    try {
        const collection = await dbService.getCollection("codeblock")
        const codeblock = collection.findOne({ _id: ObjectId(codeblockId) })
        return codeblock
    } catch (err) {
        logger.error(`while finding code block ${codeblockId}`, err)
        throw err
    }
}

async function update(codeblock) {
    try {
        let codeblockId = codeblock._id
        let id = ObjectId(codeblock._id)
        delete codeblock._id
        const collection = await dbService.getCollection("codeblock")
        await collection.updateOne({ _id: id }, { $set: { ...codeblock } })
        codeblock._id = codeblockId
        return codeblock
    } catch (err) {
        logger.error(`cannot update code block ${codeblockId}`, err)
        throw err
    }
}
