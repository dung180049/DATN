const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sensor = new Schema({
    temperature: { type: Number, require: true },
    humidity: { type: Number, require: true },
    createdAt: { type: Date, require: true, default: Date.now }
}, {
    // timestamps: true,
});

module.exports = mongoose.model('Sensor', Sensor);