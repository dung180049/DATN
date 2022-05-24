const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://vietdunghust:H7e3agYmdqNif8Rc@vietdung.0cgmj.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully');

    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };