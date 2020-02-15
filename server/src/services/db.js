const db = require('../database')();
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { roundUp } = require('../utils');

const isDocument = v => !!v && v instanceof mongoose.Document;

const isModel = v => !!v && v.prototype instanceof mongoose.Document;

const get = (coll, query = {}, fields = {}) => {
    query.deleted = 0;
    if (isModel(coll)) return coll.find(query, fields);
    return db.collection(coll).find(query, fields);
}   

const getOne = (coll, query = {}, fields = {}) => {
    query.deleted = 0;
    return (isModel(coll) ? coll : db.collection(coll)).findOne(query, fields);
}

const getById = (coll, id, fields) => {
    if (isModel(coll)) {
        coll.findOne({
            _id: mongoose.Types.ObjectId(id), 
            deleted: 0,  
        }, fields);
    }
    return db.collection(coll).findOne({ 
        _id: ObjectID(id), 
        deleted: 0 
    }, fields);
}

const exists = (coll, query = {}) => {
    query.deleted = 0;
    return !!(isModel(coll) ? coll : db.collection(coll)).count(query, { limit: 1 });
}

const paginate = async (coll, query, options) => {
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
}

const save = (coll, doc) => {
    if (isDocument(coll)) return coll.save();
    if (isModel(coll)) return new coll(doc).save();
    return db.collection(coll).insert(doc);
}

const update = (coll, set, query) => {
    if (!set || !Object.keys(set).length) return;
    if (!query || !Object.keys(query).length) return;
    query.deleted = 0;
    set.lastModifiedAt = new Date().toISOString();
    return (isModel(coll) ? coll : db.collection(coll)).updateMany(query, { $set: set });
}

const updateOne = (coll, set, query) => {
    if (!set || !Object.keys(set).length) return;
    if (!query || !Object.keys(query).length) return;
    query.deleted = 0;
    if (isDocument(coll)) {
        coll.lastModifiedAt = new Date().toISOString();
        return coll.save();
    }
    set.lastModifiedAt = new Date().toISOString();
    return (isModel(coll) ? coll : db.collection(coll)).updateOne(query, { $set: set });
}

const _delete = (coll, query) => {
    return (isModel(coll) ? coll : db.collection(coll)).updateMany(query, { $set: { 
        deleted: 1,
        lastModifiedAt: new Date().toISOString()
    }});
}

const deleteOne = (coll, query, set) => {
    if (isDocument(coll)) {
        coll.deleted = 1;
        coll.lastModifiedAt = new Date().toISOString();
        return coll.save();
    }
    set.deleted = 1;
    set.lastModifiedAt = new Date().toISOString();
    return (isModel(coll) ? coll : db.collection(coll)).updateOne(query, { $set: set });
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