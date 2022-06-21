const json2csv = require('json2csv').parse
const fs = require('fs')
const fields = ['Month', 'Date', 'Hour', 'temperature', 'humidity'];
const csvReader = require('xlsx')
const Sensor = require('../models/sensor')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class Controller {
    show(req, res, next) {
        var regex = new RegExp(req.query.day)
        var dayShow = new Date(regex)
        var dateShow = dayShow.getDate()
        var monthShow = dayShow.getMonth() + 1

        Sensor.find({ Month: monthShow })
            .find({ Date: dateShow })
            .then(sensors => {
                res.render('show', {
                    sensors: multipleMongooseToObject(sensors)
                })
            })
            .catch(next);
    }

    searchParams(req, res) {
        res.render('param')
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
                        return res.render('control')
                    } else {
                        /* const { spawn } = require('child_process');
                        const pyProg = spawn('python', ['forecast/forecast.py']);

                        pyProg.stdout.on('data', function(data) {
                            console.log(data.toString()); */
                        return res.render('home')
                            // })
                    }
                })
            }
        })
    }

    home(req, res) {
        res.render('home')
    }

    predict(req, res) {
        const tomorrowData = csvReader.readFile('forecast/data.csv')
        const sheets = tomorrowData.SheetNames
        const prediction = csvReader.utils.sheet_to_json(tomorrowData.Sheets[sheets])
        console.log(prediction)
        res.render('predict', { prediction })
    }

    store(req, res, next) {
        const sensor = new Sensor(req.query)
        sensor.save()
        res.render('store')
    }
}

module.exports = new Controller