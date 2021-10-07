
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const asyncLocalStorage = require('../../services/als.service');
const screenshootService = require('../../services/screenshoot.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getById,
    update,
    add,
    addLead,
    getWaps
}

async function getWaps() {
    const store = asyncLocalStorage.getStore();
    const { userId } = store;
    try {
        const collection = await dbService.getCollection("wap")
        const waps = await collection.find({ owner: ObjectId(userId) }).toArray()
        return waps
    } catch (err) {
        logger.error(`error getting waps`, err)
        throw err
    }
}

async function getById(wapId) {
    try {
        const collection = await dbService.getCollection('wap')
        const wap = await collection.findOne({ '_id': ObjectId(wapId) })

        return wap
    } catch (err) {
        logger.error(`error while finding wap ${wapId}`, err)
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
        await screenshootService.takeScreenShoot(wap._id);
        return wapToSave;
    } catch (err) {
        logger.error(`cannot update wap ${wap._id}`, err)
        throw err
    }
}

async function add(wap) {
    try {
        const store = asyncLocalStorage.getStore();
        const { userId } = store;
        if (userId) wap.owner = ObjectId(userId);
        // peek only updatable fields!
        const collection = await dbService.getCollection('wap')
        await collection.insertOne(wap)
        // await screenshootService.takeScreenShoot(wap._id);
        return wap
    } catch (err) {
        logger.error('cannot insert wap', err)
        throw err
    }
}

async function addLead(wapId, lead) {
    try {
        // peek only updatable fields!
        const id = ObjectId(wapId)
        const collection = await dbService.getCollection('wap')
        console.log('wapId', wapId, 'lead', lead);
        await collection.updateOne({ _id: id }, { $push: { leads: lead } })
        return lead;
    } catch (err) {
        logger.error(`cannot update wap ${wap._id}`, err)
        throw err
    }
}
