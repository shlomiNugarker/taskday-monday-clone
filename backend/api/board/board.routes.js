const express = require('express')
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {
  addBoard,
  updateBoard,
  getBoard,
  getBoards,
  deleteBoard,
} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:id', getBoard)
router.put('/', updateBoard)
router.post('/', addBoard)
router.delete('/:id', deleteBoard)

module.exports = router
