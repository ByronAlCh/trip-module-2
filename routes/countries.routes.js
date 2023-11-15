const express = require('express');
const router = express.Router();

const countriesService = require('../services/countries.services')

/* GET home page */
router.get("/", (req, res, next) => {

    // countriesService
    //     .getAllCountries()
    //     .then(({ data }) => {

    //         // console.log("ESTOS SON TODOS LOS PAISES----------------------------", data[0])
    //         data.map(elm => {
    //             countriesService
    //                 .getCountryDetails(elm.iso2)
    //                 .then(({ data }) => {

    //                     console.log("---------------------------", data)

    //                 })
    //                 .catch(err => next(err))
    //         })
    //         // console.log("------------------------------------------------", data.forEach(elm => elm.iso2))

    //         // res.render("countries/list", { allCountries: data })
    //     })
    //     .catch(err => next(err))


    countriesService
        .getAllCountries()
        .then(({ data }) => res.render("countries/list.hbs", { allCountries: data }))
        .catch(err => next(err))



});

router.get('/cuidades', (req, res, next) => {
    res.render('countries/cities.hbs')
})



module.exports = router;
