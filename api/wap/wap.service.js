
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const asyncLocalStorage = require('../../services/als.service');
const screenshootService = require('../../services/screenshoot.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getById,
    getByName,
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
        let waps = await collection.find({ owner: ObjectId(userId) }).toArray()
        waps = waps.map(wap => {
            wap.createdAt = wap._id.getTimestamp()
            return wap
        })
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

async function getByName(wapName) {
    try {
        const collection = await dbService.getCollection('wap')
        const wap = await collection.findOne({ 'name': wapName })
        if (!wap) throw new Error
        return wap
    } catch (err) {
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
        // screenshootService.takeScreenShoot(wap._id)
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
        return wap
    } catch (err) {
        logger.error('cannot insert wap', err)
        throw err
    }
}

async function addLead(wapName, lead) {
    try {
        // peek only updatable fields!
        const collection = await dbService.getCollection('wap')
        await collection.updateOne({ name: wapName }, { $push: { leads: lead } })
        return lead;
    } catch (err) {
        logger.error(`cannot update wap ${wap._id}`, err)
        throw err
    }
}
