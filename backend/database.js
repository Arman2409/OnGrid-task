import mongoose from "mongoose";
import dotenv from 'dotenv';
import logger from './tools/logger.js';

dotenv.config();

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}; 

async function connect(){
  await mongoose.connect(process.env.MONGODB_URL,options).then((res,err) => {
     if(res){
         logger.info(`Databe connected to ${process.env.MONGODB_URL}`)
     }
     }).catch((err) => {
    logger.error(err)
    })
}

connect()

export default mongoose