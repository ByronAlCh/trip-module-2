const express = require('express');
const router = express.Router();

const countriesService = require('../services/countries.services')

/* GET home page */
router.get("/", (req, res, next) => {
    // res.render("countries/list.hbs")
    countriesService
        .getAllCountries()
        .then(({ data }) => {

            // console.log("ESTOS SON TODOS LOS PAISES----------------------------", data[0])
            data.map(elm => {
                countriesService
                    .getCountryDetails(elm.iso2)
                    .then(({ data }) => {

                        console.log("---------------------------", data)

                    })
                    .catch(err => next(err))
            })
            // console.log("------------------------------------------------", data.forEach(elm => elm.iso2))

            // res.render("countries/list", { allCountries: data })
        })
        .catch(err => next(err))

});




module.exports = router;
