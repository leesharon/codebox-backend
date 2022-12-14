
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    query,
    getByUsername
}

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('user')
        const users = await collection.find(filterBy).toArray()
        return users.map(user => {
            delete user.password
            return user
        })
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}