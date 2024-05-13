const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to database');
    }
    catch(error) {
        throw new Error('Error while connecting to database')
    }
};
module.exports = dbConnect;