const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)
    logger.info('User login: ', user)
    res.cookie('loginToken', loginToken)
    res.json(user)
  } catch (err) {
    logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  try {
    const { username, password } = req.body
    const account = await authService.signup(username, password)
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)

    logger.info('User login: ', user)
    res.cookie('loginToken', loginToken)
    res.json(user)
  } catch (err) {
    logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

module.exports = {
  login,
  signup,
}
