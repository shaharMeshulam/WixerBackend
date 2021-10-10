const express = require('express');
const { getImg } = require('./img.controller');

const router = express.Router();
router.get('/websites-screenshots', getImg)

module.exports = router