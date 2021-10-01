const wapService = require('./wap.service');
const logger = require('../../services/logger.service');

// GET (get wap)
async function getWap(req, res) {
    try {
        const wap = await wapService.getById(req.query.wapId)
        res.send(wap)
    } catch (err) {
        logger.error('Failed to get wap', err)
        res.status(500).send({ err: 'Failed to get wap' })
    }
}

// POST (add wap)
async function addWap(req, res) {
    try {
        const wap = req.body;
        const addedWap = await wapService.add(wap)
        res.json(addedWap)
    } catch (err) {
        logger.error('Failed to add wap', err)
        res.status(500).send({ err: 'Failed to add wap' })
    }
}

// PUT (Update wap)
async function updateWap(req, res) {
    try {
        const wap = req.body
        const savedWap = await wapService.update(wap)
        res.send(savedWap)
    } catch (err) {
        logger.error('Failed to update wap', err)
        res.status(500).send({ err: 'Failed to update wap' })
    }
}

module.exports = {
    getWap,
    addWap,
    updateWap
}