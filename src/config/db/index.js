const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/dinosaur_hotel_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connect to DB thanh cong!");
        // mongoose.connect('mongodb://localhost:27017').dinosaur_hotel_dev.listCollections().
    } catch (error) {
        console.log("Connect fail!");
    }
}

module.exports = { connect };
