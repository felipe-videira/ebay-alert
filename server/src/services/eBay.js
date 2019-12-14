
const axios = require('axios')

module.exports.findItemsByKeywords = async (keywords, entriesPerPage = 3) => {
    try {
        const params =  {
            'OPERATION-NAME': 'findItemsByKeywords',
            'SERVICE-VERSION': '1.13.0',
            'SECURITY-APPNAME': process.env.EBAY_APP_ID,
            'GLOBAL-ID': 'EBAY-US',
            'RESPONSE-DATA-FORMAT': 'JSON',
            'keywords': encodeURIComponent(keywords),
            'paginationInput.entriesPerPage': entriesPerPage,
            'REST-PAYLOAD': true,
            'sortOrder': 'PricePlusShippingLowest'
        }

        const { data } = await axios.get(process.env.EBAY_SEARCH_API_URL, { params })

        const [ response ] = data.findItemsByKeywordsResponse

        if (response.ack[0] !== "Success") {
            throw response.Errors;
        }
        
        return response.searchResult[0].item.map(o => ({
            id: o.itemId[0],
            title: o.title[0],
            price: `${o.sellingStatus[0].currentPrice[0]['@currencyId']} ${o.sellingStatus[0].currentPrice[0].__value__}`
        }))

    } catch (error) {
        throw error
    }
}

