const app = require('../src');
const request = require('supertest');
const { expect } = require('chai');

describe('Alert Endpoints', () => {
    it('should create an alert', async () => {
        const { statusCode, body } = await request(app)
            .post('/alert')
            .send({
                searchPhrase: "Horses",
                frequency: 30,
                email: "test@gmail.com"
            })
        console.log(body)
        expect(statusCode).equal(201);
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
    })
})