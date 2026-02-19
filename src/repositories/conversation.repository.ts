import { ObjectId } from "mongodb";
import { getDB } from "../config/database";
import type { Conversation } from "../types/conversation";

const collection = () => getDB().collection("conversations");

export const insertConversation = async (data: {
  title: string;
}): Promise<Conversation> => {
  const doc = {
    title: data.title,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await collection().insertOne(doc);
  return { _id: result.insertedId, ...doc };
};

export const findConversations = async (
  offset: number,
  limit: number,
): Promise<Conversation[]> => {
  return collection()
    .find()
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .toArray() as Promise<Conversation[]>;
};

export const findById = (id: string): Promise<Conversation | null> => {
  return collection().findOne({
    _id: new ObjectId(id),
  }) as Promise<Conversation | null>;
};

export const updateTitle = async (
  id: string,
  title: string,
): Promise<Conversation | null> => {
  const result = await collection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { title, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return result as Conversation | null;
};

export const countConversations = async (): Promise<number> => {
  return collection().countDocuments();
};
