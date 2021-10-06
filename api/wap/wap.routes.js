const express = require('express');
const { addWap, getWap, updateWap, addLead, getWaps } = require('./wap.controller');
const router = express.Router();
router.get('/waps', getWaps)
router.post('/:id', addLead)
router.post('/', addWap)
router.get('/', getWap)
router.put('/:id', updateWap)

module.exports = router