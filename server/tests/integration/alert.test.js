const app = require('../../src/app');
const request = require('supertest');
const { expect } = require('chai');

describe('Alert Endpoints', () => {
    it('should create an alert', async () => {
        const { statusCode, body } = await request(app)
            .post('/alert')
            .set('Accept-Language', 'pt-BR,pt;q=0.9')
            .send({
                searchPhrase: "Horses",
                frequency: 30,
                email: "test@gmail.com"
            })
        expect(statusCode).equal(201);
        expect(body).to.have.property('message');
        expect(body).to.have.property('data');
    })
})