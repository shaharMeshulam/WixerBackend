const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser} = require('./user.controller')
const router = express.Router()

router.get('/:id', getUser)


module.exports = router