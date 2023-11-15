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
        .then(trips => res.render('trips/details.hbs', trips))
        .catch(err => next(err))
})


router.get('/crear', isLoggedIn, (req, res, next) => {
    res.render('trips/create.hbs')
})

router.post('/crear', isLoggedIn, (req, res, next) => {

    const { country, city, minimumAge, date, description, latitude, longitude } = req.body


    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }


    Trip
        .create({ owner, country, city, minimumAge, date, description, location })
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

    const { country, city, minimumAge, date, description } = req.body
    const { _id: owner } = req.params

    Trip
        .findByIdAndUpdate(owner, { country, city, minimumAge, date, description, owner })
        .populate('owner')
        .then(() => res.redirect(`/detalles/${owner}`))
        .catch(err => next(err))
})


router.post("/apuntarse/:id_trip", isLoggedIn, (req, res, next) => {

    const { id_trip } = req.params

    const { _id: idUser } = req.session.currentUser

    Trip
        .findByIdAndUpdate(id_trip, { $push: { attendees: idUser } })

        .then(() => res.redirect(`/guia-viajes/detalles/${id_trip}`))
        .catch(err => next(err))
})



router.get('/guia-viajes/comentar/:_id', (req, res, next) => {

    const { _id: id_trip } = req.params

    Comment

        .findById(id_trip)
        .then(() => res.send(id_trip))
        .catch(err => next(err))





})


router.post('/eliminar/:_id', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.params

    Trip
        .findByIdAndDelete(owner)
        .then(() => res.redirect('/guia-viajes'))
        .catch(err => next(err))

})

router.get("/map", (req, res, next) => {
    // res.send('Aqui va a ir el mapa')
    res.render('trips/list.hbs')
})


module.exports = router