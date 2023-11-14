const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('Trips/list.hbs')
})


router.get("/map", (req, res, next) => {
    res.render('map/map');
})


module.exports = router