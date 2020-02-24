const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const mock = require('./mocks/alert');
const { ObjectID } = require('mongodb');
const db = require('../../src/database')();

describe('Alert endpoints', () => {
    before(async () => {
        try {
            await db.collection('alerts').drop();
        } catch (err) {/* does nothing */}

        await db.collection('alerts')
            .insertMany(mock.setupDocuments.map(o => ({ 
                ...o, 
                _id: ObjectID(o._id)
            })));
    })
    it('should get all non deleted alerts', async () => {
        const { statusCode, body } = await request(app)
            .get('/alert')
            .set(mock.header[0], mock.header[1])
        expect(statusCode).equal(200);
        expect(body).to.have.property('data');
        expect(body).to.have.property('page');
        expect(body).to.have.property('pages');
        expect(body).to.have.property('total');
        expect(body.data).to.have.lengthOf(3);
    })
    it('should get the alert form params', async () => {
        const { statusCode, body } = await request(app)
            .get('/alert/params')
            .set(mock.header[0], mock.header[1])
        expect(statusCode).equal(200);
        expect(body).to.have.property('email');
        expect(body).to.have.property('searchPhrase');
        expect(body).to.have.property('frequency');
    })
    it('should get an alert by its id', async () => {
        const { statusCode, body } = await request(app)
            .get(`/alert/${mock.docToGetId}`)
            .set(mock.header[0], mock.header[1])
        expect(statusCode).equal(200);
        expect(body).to.have.property('id');
        expect(body).to.have.property('email');
        expect(body).to.have.property('searchPhrase');
        expect(body).to.have.property('frequency');
    })
    it('should create an alert', async () => {
        const { statusCode, body } = await request(app)
            .post('/alert')
            .set(mock.header[0], mock.header[1])
            .send(mock.createBody)
        expect(statusCode).equal(201);
        expect(body).to.have.property('message');
        expect(body).to.have.property('data');
    })
    it('should update an alert', async () => {
        const { statusCode, body } = await request(app)
            .patch(`/alert/${mock.docToUpdateId}`)
            .set(mock.header[0], mock.header[1])
            .send(mock.updateBody)
        expect(statusCode).equal(200);
        expect(body).to.have.property('message');
    })
    it('should delete an alert', async () => {
        const { statusCode, body } = await request(app)
            .delete(`/alert/${mock.docToDeleteId}`)
            .set(mock.header[0], mock.header[1])
        expect(statusCode).equal(200);
        expect(body).to.have.property('message');
    })
})