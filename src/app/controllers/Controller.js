const json2csv = require('json2csv').parse
const fs = require('fs')
const fields = ['Month', 'Date', 'Hour', 'temperature', 'humidity'];
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

    update(req, res) {
        Sensor.find({}, function(err, sensors) {
            if (err) {
                return res.render('predict')
            } else {
                let csv
                try {
                    csv = json2csv(sensors, { fields })
                } catch (err) {
                    return res.status(500).json({ err })
                }
                const filePath = ('forecast/data.csv')
                fs.writeFile(filePath, csv, function(err) {
                    if (err) {
                        return res.render('store')
                    } else {
                        const { spawn } = require('child_process');
                        const pyProg = spawn('python', ['forecast/forecast.py']);

                        pyProg.stdout.on('data', function(data) {
                            console.log(data.toString());
                            return res.render('home')
                        })
                    }
                })
            }
        })
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