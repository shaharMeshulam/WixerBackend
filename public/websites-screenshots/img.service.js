const logger = require('../../services/logger.service');

module.exports = {
    getById
}

async function getById(imgId) {
    console.log('servic');
    try {
        const img =  __dirname + `/${imgId}.jpg`
        return img
    } catch (err) {
        logger.error(`error while finding img ${imgId}`, err)
        throw err
    }
}