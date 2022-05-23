const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://cluster0.bksgg.mongodb.net/sensors', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully');

    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };