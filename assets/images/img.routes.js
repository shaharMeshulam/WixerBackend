const express = require('express');
const { getImg } = require('./img.controller');

const router = express.Router();
router.get('/images', getImg)

module.exports = router