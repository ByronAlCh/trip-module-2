const axios = require('axios')

class CountriesService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.countrystatecity.in/v1',
            headers: {
                'X-CSCAPI-KEY': process.env.API_KEY_COUNTRIES
            }
        })
    }

    getAllCountries() {
        return this.axiosApp.get('/countries')
    }

    getCountryDetails(iso2) {
        return this.axiosApp.get(`/countries/${iso2}`)
    }

    getCountryStates(iso2) {
        return this.axiosApp.get(`/countries/${iso2}/states`)
    }

}

const countriesService = new CountriesService()

module.exports = countriesService

