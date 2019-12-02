const assert = require('assert')
const Alert = require('../../src/models/alert')
const { FREQUENCY_TYPES } = require('../../src/utils/constants')

describe('Alert', () => {
    it('can be created with a valid schema', async () => {
        const body = { 
            searchPhrase: 'a'.repeat(255),
            frequency: FREQUENCY_TYPES[Math.floor(Math.random() * FREQUENCY_TYPES.length)],
            email: 'a@a.com'
        };
        const alert = await new Alert(body).save();
        assert.deepEqual(alert, body);
    }).timeout(10000)

    it('must have a search phrase', async () => {
        try {
            const body = { 
                searchPhrase: '',
                frequency: FREQUENCY_TYPES[Math.floor(Math.random() * FREQUENCY_TYPES.length)],
                email: 'a@a.com'
            }
            await new Alert(body).save()
            assert.fail()
        } catch (err) {
            assert(/Path `searchPhrase` is required/.test(err.message))
        } 
    })

    it('must not have an overly long search phrase', async function() {
        try {
            const body = {
                searchPhrase: 'a'.repeat(1000),
                frequency: FREQUENCY_TYPES[Math.floor(Math.random() * FREQUENCY_TYPES.length)],
                email: 'a@a.com'
            }
            await new Alert(body).save()
            assert.fail()
        } catch (err) {
            assert(/is longer than the maximum allowed length/.test(err.message))
        } 
    })


    it('must have a frequency', async () => {
        try {
            const body = { 
                searchPhrase: 'a'.repeat(255),
                frequency: null,
                email: 'a@a.com'
            }
            await new Alert(body).save()
            assert.fail()
        } catch (err) {
            assert(/Path `frequency` is required/.test(err.message))
        }
    })

    it('must have a valid frequency', async () => {
        try {
            const body = { 
                searchPhrase: 'a'.repeat(255),
                frequency: '39',
                email: 'a@a.com'
            }
            await new Alert(body).save()
            assert.fail()
        } catch (err) {
            assert(/is not a valid enum value for path `frequency`/.test(err.message))
        }
    })

    it('must have a email', async () => {
        try {
            const body = { 
                searchPhrase: 'a'.repeat(255),
                frequency: FREQUENCY_TYPES[Math.floor(Math.random() * FREQUENCY_TYPES.length)],
                email: ''
            }
            await new Alert(body).save()
            assert.fail()
        } catch (err) {
            assert(/Path `email` is required/.test(err.message))
        }
    })

    it('must have a valid email', async () => {
        try {
            const body = { 
                searchPhrase: 'a'.repeat(255),
                frequency: FREQUENCY_TYPES[Math.floor(Math.random() * FREQUENCY_TYPES.length)],
                email: 'aaa'
            }
            await new Alert(body).save()
            assert.fail()
        } catch (err) {
            assert(/email invalid/.test(err.message))
        }
    })
})