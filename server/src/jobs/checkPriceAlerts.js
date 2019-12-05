const ebay = require('../services/eBay')
const Alert = require('../models/alert')
const scheduleEmail = require('../services/scheduleEmail');

module.exports = async frequency => {
    try {
        const alerts = await Alert.find({ frequency })

        const itemsRequests = []
        for (const { searchPhrase } of alerts) {
            itemsRequests.push(ebay.findItemsByKeywords(searchPhrase))
        }
        const itemsBySearchPhrase = await Promise.all(itemsRequests)
        
        const lastRequestTime = new Date(new Date().getTime() + parseInt(frequency) * 60000).toISOString()

        const priceChangeRequests = []
        for (const items of itemsBySearchPhrase) {
            priceChangeRequests.push(ebay.getPriceChange(items, lastRequestTime))
        }
        const priceChangesBySearchPhrase = await Promise.all(priceChangeRequests)
        
        const scheduleEmailRequests = []
        for (let i = 0; i < priceChangesBySearchPhrase.length; i++) {
            if (priceChangesBySearchPhrase[i].length) {
                scheduleEmailRequests.push(scheduleEmail(alerts[i], priceChangesBySearchPhrase[i]))
            }
        }       
        const emailsScheduled = await Promise.all(scheduleEmailRequests)

    } catch (error) {
        console.log("Error [checkPriceAlerts]: ", error)

        return
    }
}