const express = require('express');
const router = express.Router();

const countriesService = require('../services/countries.services')

/* GET home page */
router.get("/", (req, res, next) => {
    countriesService
        .getAllCountries()
        .then(({ data }) => {
            const promises = data.map(country =>
                countriesService.getCountryDetails(country.iso2)
            )

            return Promise.all(promises)
        }).then(reponses => {
            const countriesData = reponses.map(response => response?.data)

            res.send(countriesData)
        })
});

router.get('/cuidades', (req, res, next) => {
    res.render('countries/cities.hbs')
})



module.exports = router;
