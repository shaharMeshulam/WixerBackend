
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');

const ObjectId = require('mongodb').ObjectId

module.exports = {
    getById,
    update,
    add
}

async function getById(wapId) {
    try {
        const collection = await dbService.getCollection('wap')
        const wap = await collection.findOne({ '_id': ObjectId(wapId) })

        return wap
    } catch (err) {
        logger.error(`while finding wap ${wapId}`, err)
        throw err
    }
}

async function update(wap) {
    try {
        // peek only updatable fields!
        const wapToSave = {
            ...wap,
            _id: ObjectId(wap._id), // needed for the returnd obj
        }
        const collection = await dbService.getCollection('wap')
        await collection.updateOne({ _id: wapToSave._id }, { $set: wapToSave })
        return wapToSave;
    } catch (err) {
        logger.error(`cannot update wap ${wap._id}`, err)
        throw err
    }
}

async function add(wap) {
    try {
        // peek only updatable fields!
        const collection = await dbService.getCollection('wap')
        await collection.insertOne(wap)
        return wap
    } catch (err) {
        logger.error('cannot insert wap', err)
        throw err
    }
}
