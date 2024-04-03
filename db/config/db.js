import { mongoose } from 'mongoose';

// DB info
const dbHost = 'mongodb://localhost:27017';
const dbName = 'tooty';
const URL = `${dbHost}/${dbName}`;
const options = {};

// DB connect
const connectDB = async () => {
    try {
        await mongoose.connect(URL, options)
        console.log('Connecting to DB')
    } catch (err) {
        console.log(err)
        
    }
};

export { connectDB };