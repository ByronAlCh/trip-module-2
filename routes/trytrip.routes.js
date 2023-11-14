const express = require('express')
const router = express.Router()

const Trip = require('./../models/Trip.model')

// router.get("/crear-lugar", (req, res, next) => {
//     res.render("map/create")
// })

// router.post("/crear-lugar", (req, res, next) => {

//     const { name, description, latitude, longitude } = req.body

//     const location = {
//         type: 'Point',
//         coordinates: [longitude, latitude]
//     }

//     Trip
//         .create({ name, description, location })
//         .then(() => res.redirect('/'))
//         .catch(err => next(err))
// })

router.get("/map", (req, res, next) => { //Pasar mñn a Valen
    res.render('map/map');
})


module.exports = router