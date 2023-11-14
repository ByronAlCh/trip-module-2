const axios = require('axios')

class CountriesService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.countrystatecity.in/v1/'
        })


    }
}


const CountriesService = new CountriesService()

module.exports = CountriesService
