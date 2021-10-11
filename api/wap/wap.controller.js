const wapService = require('./wap.service');
const logger = require('../../services/logger.service');

// GET (get all waps)
async function getWaps(req, res) {
    try {
        const waps = await wapService.getWaps()
        res.send(waps)
    } catch (err) {
        logger.error('Failed to get wap', err)
        res.status(500).send({ err: 'Failed to get wap' })
    }
}

// GET (get wap)
async function getWap(req, res) {
    try {
        let wap
        if(req.query.wapId) wap = await wapService.getById(req.query.wapId)
        else wap = await wapService.getByName(req.query.wapName)
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

// POST (add lead)
async function addLead(req, res) {
    try {
        const lead = req.body;
        const wapId = req.params.id;
        console.log('req.param', req.params)
        const addedLead = await wapService.addLead(wapId, lead)
        res.json(addedLead)
    } catch (err) {
        logger.error('Failed to add lead', err)
        res.status(500).send({ err: 'Failed to add lead' })
    }
}

module.exports = {
    getWap,
    addWap,
    updateWap,
    addLead,
    getWaps
}