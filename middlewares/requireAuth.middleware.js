const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')

async function requireAuth(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

async function requireMentor(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser?.isMentor) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}

async function requireStudent(req, res, next) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (loggedinUser?.isMentor) {
    logger.warn(loggedinUser.fullname + 'attempted to perform student action')
    res.status(403).end('Only Students can update code blocks')
    return
  }
  next()
}

module.exports = {
  requireAuth,
  requireMentor,
  requireStudent
}
