const controlRouter = require('./control')
const paramRouter = require('./param')
const predictRouter = require('./predict')
const homeRouter = require('./home')
const storeRouter = require('./store')

function route(app) {
    app.use('/control', controlRouter)
    app.use('/sensor-parameters', paramRouter)
    app.use('/predict', predictRouter)
    app.use('/store', storeRouter)
    app.use('/', homeRouter)
}

module.exports = route