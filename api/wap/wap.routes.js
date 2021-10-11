const express = require('express');
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { addWap, getWap,getWapByName, updateWap, addLead, getWaps } = require('./wap.controller');

const router = express.Router();
router.get('/waps', requireAuth, getWaps)
router.post('/:id', addLead)
router.post('/', addWap)
router.get('/', getWap)
router.put('/:id', updateWap)

module.exports = router