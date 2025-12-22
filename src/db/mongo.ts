import { MongoClient } from "mongodb";

export const mongo = new MongoClient(process.env.MONGO_URL!);
export const mongoDb = mongo.db();
