const imgService = require('./img.service');
const logger = require('../../services/logger.service');


// GET (get img)
async function getImg(req, res) {
    // console.log('imageid', req.query.imgId);
    try {
        const img = await imgService.getById(req.query.imgId)
        res.sendFile(img)
        // res.send(img)
    } catch (err) {
        logger.error('Failed to get img', err)
        res.status(500).send({ err: 'Failed to get img' })
    }
}


module.exports = {
    getImg
}