const mongoose = require('mongoose');


const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });

        console.log('Db online');
    } catch (error) {
        console.log(error);
        throw new Error('Error, consulte con el ADMIN');
    }
}

module.exports = {
    dbConnect
}