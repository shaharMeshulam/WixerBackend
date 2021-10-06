
const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');

const ObjectId = require('mongodb').ObjectId

module.exports = {
    getById,
    update,
    add,
    addLead,
    getWaps
}

async function getWaps() {
    try {
        const collection = await dbService.getCollection("wap")
        const waps = await collection.find({}).toArray()
        return waps
    } catch (err) {
        logger.error(`while finding wap`, err)
        throw err
    }
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
    console.log('Add')
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

async function addLead(wapId, lead) {
    console.log('Add Lead')
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
