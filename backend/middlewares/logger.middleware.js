const logger = require('../services/logger.service')

async function log(req, res, next) {
    logger.info('Req!!!')
    if (req.session && req.session.user) {
        logger.info('Req from user, named: ' + req.session.user.fullname)
    }
    next()
}

module.exports = {
    log
}