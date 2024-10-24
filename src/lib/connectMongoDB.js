// import mongoose from "mongoose";

// export default async function () {
//   try {
//     const DATABASE_URL = process.env.MONGODB_URL;

//     let connect = await mongoose.connect(DATABASE_URL);
//     console.log("Connect");
//     return connect;
//   } catch (error) {
//     return;
//   }
// }
// lib/connectMongoDB.js
import { MongoClient } from "mongodb";

let client;

const connectMongoDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URL);
      await client.connect();
      console.log("Connected to MongoDB.");
    }
    return client.db();
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
