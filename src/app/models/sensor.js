const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var timeSave = new Date()

const Sensor = new Schema({
    Month: { type: Number, require: true, default: timeSave.getMonth() + 1 },
    Date: { type: Number, require: true, default: timeSave.getDate() },
    Hour: { type: String, require: true, default: timeSave.toLocaleTimeString() },
    temperature: { type: Number, require: true },
    humidity: { type: Number, require: true },
}, );

module.exports = mongoose.model('Sensor', Sensor);