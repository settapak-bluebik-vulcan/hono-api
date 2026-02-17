import { Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = "aegis";

let db: Db;

export const connectDB = async () => {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log("Connected to MongoDB");
};

export function getDB(): Db {
  if (!db) throw new Error("Database not connected");
  return db;
}
