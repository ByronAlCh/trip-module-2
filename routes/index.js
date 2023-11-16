module.exports = app => {

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require('./auth.routes')
    app.use("/", authRoutes)

    const tripRoutes = require('./trip.routes');
    app.use("/guia-viajes", tripRoutes)

    const userRoutes = require('./user.routes')
    app.use('/', userRoutes)

    const apiRoutes = require('./api.routes')
    app.use('/api', apiRoutes)

    const countriesRoutes = require('./countries.routes')
    app.use('/paises', countriesRoutes)



}
