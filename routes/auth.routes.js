const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const User = require('./../models/User.model')
const saltRounds = 10

const uploaderMiddleware = require('./../middleware/uploader.middleware')
const { isLoggedOut } = require('../middleware/route-guard')

router.get('/registrarse', isLoggedOut, (req, res, next) => {
    res.render('auth/signup')
})

router.post('/registrarse', isLoggedOut, uploaderMiddleware.single('cover'), (req, res, next) => {

    const { name, username, email, password, age } = req.body
    const { path: cover } = req.file

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(passwordHash => User.create({ name, username, email, password: passwordHash, age, cover }))
        .then(() => res.redirect('/inicio-sesion'))
        .catch(err => next(err))
})

router.get('/inicio-sesion', isLoggedOut, (req, res, next) => {
    res.render('auth/login')
})

router.post('/inicio-sesion', (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'Rellena todos los campos' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'Email no registrado' })
                return
            }
            if (bcrypt.compareSync(password, foundUser.password) === false) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = foundUser
            res.redirect('/')
        })
        .catch(err => next(err))
})

router.get('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router