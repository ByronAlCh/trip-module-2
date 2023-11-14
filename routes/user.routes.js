const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get("/perfil", isLoggedIn, (req, res, next) => {

    const user = req.session.currentUser

    User
        .findById(user._id)
        .then(user => res.render('user/profile',
            {
                user: user,
            }
        ))
        .catch(err => next(err))
})

router.get('/listado', isLoggedIn, (req, res, next) => {

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




router.get("/admin", isLoggedIn, checkRole('ADMIN'), (req, res) => {

    res.render("user/admin-panel", { user: req.session.currentUser })
})

module.exports = router