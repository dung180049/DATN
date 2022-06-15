const controlRouter = require('./control')
const paramRouter = require('./param')
const predictRouter = require('./predict')
const homeRouter = require('./home')
const storeRouter = require('./store')
const updateRouter = require('./update')

function route(app) {
    app.use('/update', updateRouter)
    app.use('/control', controlRouter)
    app.use('/sensor-parameters', paramRouter)
    app.use('/predict', predictRouter)
    app.use('/store', storeRouter)
    app.use('/', homeRouter)
}

module.exports = route