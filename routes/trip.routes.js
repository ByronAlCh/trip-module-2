const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('Trips/list.hbs')
})



module.exports = router