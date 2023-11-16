const express = require('express')
const router = express.Router()

const Trip = require('./../models/Trip.model')
const User = require('./../models/User.model')
const Comment = require('./../models/Comments.model')

const { isLoggedIn } = require('../middleware/route-guard')

router.get('/', (req, res, next) => {

    Trip
        .find()
        .then(trips => res.render('trips/list.hbs', { trips }))
        .catch(err => next(err))
})


router.get('/detalles/:_id', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.params

    Trip
        .findById(owner)
        .populate('attendees')
        .then(trip => res.render('trips/details.hbs', trip))
        .catch(err => next(err))
})

router.get('/crear', isLoggedIn, (req, res, next) => {
    res.render('trips/create.hbs')
})

router.post('/crear', isLoggedIn, (req, res, next) => {

    const { country, city, minimumAge, date, namePlace, description, latitude, longitude } = req.body
    const { _id: owner } = req.session.currentUser

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Trip
        .create({ country, city, minimumAge, date, namePlace, description, location, owner })
        .then(() => res.redirect('/guia-viajes'))
        .catch(err => next(err))

})

router.get('/editar/:_id', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.params

    Trip
        .findById(owner)
        .then(trips => res.render('trips/edit.hbs', trips))
        .catch(err => next(err))
})

router.post('/editar/:_id', isLoggedIn, (req, res, next) => {

    const { country, city, minimumAge, date, namePlace, description } = req.body
    const { _id: id_trip } = req.params

    Trip
        .findByIdAndUpdate(id_trip, { country, city, minimumAge, date, namePlace, description, owner })
        .populate('owner')
        .then(() => res.redirect(`/detalles/${owner}`))
        .catch(err => next(err))
})

router.post('/eliminar/:_id', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.params

    Trip
        .findByIdAndDelete(owner)
        .then(() => res.redirect('/guia-viajes'))
        .catch(err => next(err))
})

router.post("/apuntarse/:id_trip", isLoggedIn, (req, res, next) => {

    const { currentUser: user } = req.session
    const { id_trip } = req.params

    Trip
        .findById(id_trip)
        .then(trip => {
            if (trip.attendees.includes(user._id)) {
                return
            }
            else {
                return Trip.findByIdAndUpdate(id_trip, { $push: { attendees: user._id } })
            }
        })
        .then(trip => {
            if (trip) {
                res.redirect(`/guia-viajes/detalles/${trip._id}`)
            }
            else {
                res.send({ errorMessage: 'Ya estas apuntado' })
            }
        })
        .catch(err => next(err))
})

router.get('/guia-viajes/comentar/:_id', (req, res, next) => {
    const { _id: id_trip } = req.params
    console.log('funcionaaa')

    // Comment

    //     .findById(id_trip)
    //     .then(() => res.send(id_trip))
    //     .catch(err => next(err))

})

router.post('/eliminar/:_id', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.params

    Trip
        .findByIdAndDelete(owner)
        .then(() => res.redirect('/guia-viajes'))
        .catch(err => next(err))

})

router.get("/map", (req, res, next) => {
    res.render('trips/list.hbs')
})

module.exports = router