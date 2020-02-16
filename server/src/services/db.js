const logger = require('./logger');
const db = require('../database')();
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { roundUp } = require('../utils');


const isDocument = v => !!v && v instanceof mongoose.Document;

const isModel = v => !!v && v.prototype instanceof mongoose.Document;

const get = (coll, query = {}, fields = {}) => {
    try {
        query.deleted = 0;
        if (isModel(coll)) return coll.find(query, fields);
        return db.collection(coll).find(query, fields);
    } catch (error) {
        logger.error({ message: 'db:get', meta: error });
        throw error;
    }
}   

const getOne = (coll, query = {}, fields = {}) => {
    try {
        query.deleted = 0;
        return (isModel(coll) ? coll : db.collection(coll))
            .findOne(query, fields);
    } catch (error) {
        logger.error({ message: 'db:getOne', meta: error });
        throw error;
    }
}

const getById = (coll, id, fields) => {
    try {
        if (isModel(coll)) {
            return coll.findOne({
                _id: mongoose.Types.ObjectId(id), 
                deleted: 0,  
            }, fields);
        }
        return db.collection(coll).findOne({ 
            _id: ObjectID(id), 
            deleted: 0 
        }, fields);
    } catch (error) {
        logger.error({ message: 'db:getById', meta: error });
        throw error;
    }
}

const exists = (coll, query = {}) => {
    try {
        query.deleted = 0;
        return !!(isModel(coll) ? coll : db.collection(coll)).count(query);
    } catch (error) {
        logger.error({ message: 'db:exists', meta: error });
        throw error;
    }
}

const paginate = async (coll, query, options) => {
    try {
        query.deleted = 0;
        if (isModel(coll)) return coll.paginate(query, options);
        const [{ docs, total: { total }}] = await db.collection(coll).aggregate([{
            $facet: {
                docs: [
                    { $match: query },
                    { $project: options.select },
                    { $skip: options.limit * (options.page - 1) },
                    { $limit: options.limit }
                ],
                total: [{ $count: "total" }]
            }
        }]);
        return {
            docs, 
            total, 
            limit: options.limit,  
            page: options.page,  
            pages: roundUp(total / options.limit),  
        }
    } catch (error) {
        logger.error({ message: 'db:paginate', meta: error });
        throw error;
    }
}

const save = (coll, doc) => {
    try {
        if (isDocument(coll)) return coll.save();
        if (isModel(coll)) return new coll(doc).save();
        return db.collection(coll).insert(doc);
    } catch (error) {
        logger.error({ message: 'db:save', meta: error });
        throw error;
    }
}

const update = (coll, set, query) => {
    try {
        if (!set || !Object.keys(set).length) 
            throw Error("no values to update");
        if (!query || !Object.keys(query).length) 
            throw Error("an update without where");
        query.deleted = 0;
        set.lastModifiedAt = new Date().toISOString();
        return (isModel(coll) ? coll : db.collection(coll))
            .updateMany(query, { $set: set });
    } catch (error) {
        logger.error({ message: 'db:update', meta: error });
        throw error;
    }
}

const updateOne = (coll, set, query) => {
    try {
        if (isDocument(coll)) {
            coll.lastModifiedAt = new Date().toISOString();
            return coll.save();
        }
        if (!set || !Object.keys(set).length) 
            throw Error("no values to update");
        if (!query || !Object.keys(query).length) 
            throw Error("an update without where");
        query.deleted = 0;
        set.lastModifiedAt = new Date().toISOString();
        return (isModel(coll) ? coll : db.collection(coll))
            .updateOne(query, { $set: set });
    } catch (error) {
        logger.error({ message: 'db:updateOne', meta: error });
        throw error;
    }
}

const _delete = (coll, query) => {
    try {
        return (isModel(coll) ? coll : db.collection(coll))
            .updateMany(query, { $set: { 
                deleted: 1,
                lastModifiedAt: new Date().toISOString()
            }});
    } catch (error) {
        logger.error({ message: 'db:delete', meta: error });
        throw error;
    }
}

const deleteOne = (coll, query, set) => {
    try {
        if (isDocument(coll)) {
            coll.deleted = 1;
            coll.lastModifiedAt = new Date().toISOString();
            return coll.save();
        }
        set.deleted = 1;
        set.lastModifiedAt = new Date().toISOString();
        return (isModel(coll) ? coll : db.collection(coll))
            .updateOne(query, { $set: set });
    } catch (error) {
        logger.error({ message: 'db:deleteOne', meta: error });
        throw error;
    }
}

module.exports.isModel = isModel;
module.exports.isDocument = isDocument;
module.exports.get = get;
module.exports.getOne = getOne;
module.exports.getById = getById;
module.exports.exists = exists;
module.exports.paginate = paginate;
module.exports.save = save;
module.exports.update = update;
module.exports.updateOne = updateOne;
module.exports.delete = _delete;
module.exports.deleteOne = deleteOne;

module.exports = {
    isModel,
    isDocument,
    get,
    getOne,
    getById,
    exists,
    paginate,
    save,
    update,
    updateOne,
    delete: _delete,
    deleteOne,
};