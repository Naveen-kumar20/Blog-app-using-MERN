import mongoose from "mongoose";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);  // Force Google DNS in Node.js

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=>{
            console.log("Database connected.");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/heartNoteBlogApp`) 
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;