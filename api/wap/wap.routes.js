const express = require('express');
const { addWap, getWap, updateWap } = require('./wap.controller');
const router = express.Router();

router.post('/', addWap)
router.get('/', getWap)
router.put('/:id', updateWap)

module.exports = router