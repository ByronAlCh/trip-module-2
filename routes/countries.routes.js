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

            // res.send(countriesData)
            res.render('countries/list.hbs', { reponses: countriesData })
                .catch(err => next(err))
        })
        .catch(err => next(err))
});


router.get('/:iso2/estados', (req, res, next) => {

    const { iso2 } = req.params

    countriesService
        .getCountryStates(iso2)
        .then(({ data }) => {
            res.render('countries/states.hbs', { allStates: data })
        })
        .catch(err => next(err))



    // res.render('countries/cities.hbs')
})



module.exports = router;
