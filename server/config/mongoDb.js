const mongoose = require('mongoose');
const db = process.env.DB;
const connectMongo = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(` 2 : Connected to mongoDB`)
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectMongo;
