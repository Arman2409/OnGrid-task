import mongoose from "mongoose";
import logger from './tools/logger.js';

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

const url = "mongodb+srv://Ghazaryan2409:AR122333@cluster0.jh3pp.mongodb.net/OnGrid";

async function connect(){
  await mongoose.connect(url,options).then((res,err) => {
     if(res){
         logger.info(`Databe connected to ${url}`)
     }
     }).catch((err) => {
    logger.error(err)
    })
}

connect()

export default mongoose