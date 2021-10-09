
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getById
}

async function getById(imgId) {
    try {
        const img =  __dirname + `/websites-screenshots/${imgId}.jpg`
        return img
    } catch (err) {
        logger.error(`error while finding img ${imgId}`, err)
        throw err
    }
}