
const axios = require('axios')

module.exports.findItemsByKeywords = async (keywords, entriesPerPage = 10) => {
    try {
        const { data } = await axios.get(process.env.EBAY_SEARCH_API_URL, {
            params: {
                'OPERATION-NAME': 'findItemsByKeywords',
                'SERVICE-VERSION': '1.13.0',
                'SECURITY-APPNAME': process.env.EBAY_APP_ID,
                'GLOBAL-ID': 'EBAY-US',
                'RESPONSE-DATA-FORMAT': 'JSON',
                'keywords': keywords,
                'paginationInput.entriesPerPage': entriesPerPage,
                'REST-PAYLOAD': true,
            }
        })

        const [ response ] = data.findItemsByKeywordsResponse

        if (response[0].Ack[0] !== "Success") {
            throw response[0].Errors;
        }
        
        return response.item[0]

    } catch (error) {
        console.log("Error [findItemsByKeywords]: ", error)

        throw error
    }
}

module.exports.getPriceChange = async (itemsIds, lastRequestTime) => {
    try {
        const params = {
            'Version': '1127',
            'callname': 'GetPublicAlerts',
            'LastRequestTime': lastRequestTime,
            'ApplicationID': process.env.EBAY_APP_ID,
        }

        for (let i = 0; i < itemsIds.length; i++) {
            params[`ChannelDescriptor(${i}).EventType`] = 'PriceChange'
            params[`ChannelDescriptor(${i}).ChannelType`] = 'Item'
            params[`ChannelDescriptor(${i}).ChannelID`] = itemsIds[i]
        }

        const { data } = await axios.get(process.env.EBAY_ALERT_API_URL, { params })

        if (data.Ack[0] !== "Success") {
            throw response[0].Errors;
        }

        return data.Content
        
    } catch (error) {
        console.log("Error [getPriceChange]: ", error)

        throw error
    }
}