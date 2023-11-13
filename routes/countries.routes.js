const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("countries/list.hbs");
});

module.exports = router;
