const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
  try {
    const user = await userService.getById(req.params.id)
    res.send(user)
  } catch (err) {
    logger.error('Failed to get user', err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}

async function getUsers(req, res) {
  try {
    logger.debug('Getting Users')
    const filterBy = { isMentor: (req.query.isMentor === 'false') ? false : true }
    const users = await userService.query(filterBy)
    res.send(users)

  } catch (err) {
    logger.error('Failed to get users', err)
    res.status(500).send({ err: 'Failed to get users' })
  }
}

module.exports = {
  getUser,
  getUsers,
}
