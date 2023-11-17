
require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require("./config/session.config")(app)

require("./utils/formatDate")(app)

app.locals.appTitle = `TRIPWEB`

require("./routes")(app)
require("./error-handling")(app)

module.exports = app