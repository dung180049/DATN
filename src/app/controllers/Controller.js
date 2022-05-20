const Sensor = require('../models/sensor')
const { multipleMongooseToObject } = require('../../util/mongoose')

class Controller {
    show(req, res, next) {
        Sensor.find({})
            .then(sensors => {
                res.render('param', {
                    sensors: multipleMongooseToObject(sensors)
                });
            })
            .catch(next);
    }

    control(req, res) {
        res.render('control')
    }

    home(req, res) {
        res.render('home')
    }

    predict(req, res) {
        res.render('predict')
    }

    store(req, res, next) {
        const sensor = new Sensor(req.query)
        sensor.save()
        res.render('store')
    }
}

module.exports = new Controller