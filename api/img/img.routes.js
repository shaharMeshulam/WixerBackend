const express = require('express');
// const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getImg } = require('./img.controller');

const router = express.Router();
router.get('/', getImg)

module.exports = router