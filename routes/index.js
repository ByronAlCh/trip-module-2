module.exports = app => {



    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require('./auth.routes')
    app.use("/", authRoutes)

    const tripRoutes = require('./trip.routes');
    app.use("/guia-viajes", tripRoutes)

}
