import mongoose from "mongoose";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);  // Force Google DNS in Node.js

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/heartNoteBlogApp`) 
        mongoose.connection.on('connected', ()=>{
            console.log("Database connected.");
        })
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;