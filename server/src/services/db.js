const log = require('./log');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { roundUp } = require('../utils');

const isModel = v => {
    return !!v && v.prototype instanceof mongoose.Document
}
const isDocument = v => {
    return !!v && v instanceof mongoose.Document
}

module.exports = {
    get: (db, coll, query = {}, fields = {}) => {
        try {
            query.deleted = 0;
            if (isModel(coll)) return coll.find(query, fields);
            return db.collection(coll).find(query, fields);
        } catch (error) {
            log.error({ message: 'db:get', meta: error });
            throw error;
        }
    },   
    getOne: (db, coll, query = {}, fields = {}) => {
        try {
            query.deleted = 0;
            return (isModel(coll) ? coll : db.collection(coll))
                .findOne(query, fields);
        } catch (error) {
            log.error({ message: 'db:getOne', meta: error });
            throw error;
        }
    },
    getById: (db, coll, id, fields) => {
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
            log.error({ message: 'db:getById', meta: error });
            throw error;
        }
    },
    exists: (db, coll, query = {}) => {
        try {
            query.deleted = 0;
            return !!(isModel(coll) ? coll : db.collection(coll)).count(query);
        } catch (error) {
            log.error({ message: 'db:exists', meta: error });
            throw error;
        }
    },
    paginate: async (db, coll, query, options) => {
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
            log.error({ message: 'db:paginate', meta: error });
            throw error;
        }
    },
    save: (db, coll, doc) => {
        try {
            if (isDocument(coll)) return coll.save();
            if (isModel(coll)) return new coll(doc).save();
            return db.collection(coll).insert(doc);
        } catch (error) {
            log.error({ message: 'db:save', meta: error });
            throw error;
        }
    },
    update: (db, coll, set, query) => {
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
            log.error({ message: 'db:update', meta: error });
            throw error;
        }
    },
    updateOne: (db, coll, set, query) => {
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
            log.error({ message: 'db:updateOne', meta: error });
            throw error;
        }
    },
    delete: (db, coll, query) => {
        try {
            return (isModel(coll) ? coll : db.collection(coll))
                .updateMany(query, { $set: { 
                    deleted: 1,
                    lastModifiedAt: new Date().toISOString()
                }});
        } catch (error) {
            log.error({ message: 'db:delete', meta: error });
            throw error;
        }
    },
    deleteOne: (db, coll, query, set) => {
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
            log.error({ message: 'db:deleteOne', meta: error });
            throw error;
        }
    },
    isModel,
    isDocument
};



