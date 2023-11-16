const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const uploaderMiddleware = require('./../middleware/uploader.middleware')

router.get("/perfil", isLoggedIn, (req, res, next) => {

    const { currentUser: user } = req.session

    User
        .findById(user._id)
        .then(user => res.render('user/profile', user))
        .catch(err => next(err))
})

router.get("/admin", isLoggedIn, checkRole('ADMIN'), (req, res) => {
    res.render("user/admin-panel", { user: req.session.currentUser })
})

router.get('/listado', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    User
        .find()
        .then(user => res.render('user/admin-panel',
            {
                user,
                isAdmin: req.session.currentUser.role === 'ADMIN'
            }
        ))
        .catch(err => next(err))
})

router.get('/perfil/editar', isLoggedIn, (req, res, next) => {

    const { currentUser: user } = req.session

    User
        .findById(user._id)
        .then(user => res.render('user/edit', user))
        .catch(err => next(err))
})

router.post('/perfil/editar', isLoggedIn, (req, res, next) => {

    const { name, username, email } = req.body
    const { currentUser: user } = req.session

    User
        .findByIdAndUpdate(user._id, { name, username, email })
        .then(() => res.redirect('/perfil'))
        .catch(err => next(err))
})

router.post('/eliminar/:_id', (req, res, next) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/listado'))
        .catch(err => next(err))
})

module.exports = router