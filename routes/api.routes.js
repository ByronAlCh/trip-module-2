const express = require('express');
const router = express.Router();

const Trip = require('../models/Trip.model')

router.get("/trip", (req, res, next) => {

    Trip
        .find()
        .then(trip => res.json(trip))
        .catch(err => res.status(500).json({ message: 'Server issue D:', errorDetails: err }))
})

module.exports = router