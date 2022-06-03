const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeSave = new Date()

const Sensor = new Schema({
    Month: { type: Number, require: true, default: timeSave.getMonth() + 1 },
    Date: { type: Number, require: true, default: timeSave.getDate() },
    Hour: { type: Number, require: true, default: timeSave.getHours() },
    temperature: { type: Number, require: true },
    humidity: { type: Number, require: true },
}, );

module.exports = mongoose.model('Sensor', Sensor);