import { ObjectId } from "mongodb";
import { getDB } from "../config/database";
import type { Message, CreateMessageInput } from "../types/conversation";

const collection = () => getDB().collection("messages");

export const insertMessage = async (data: CreateMessageInput): Promise<Message> => {
  const doc = {
    conversationId: new ObjectId(data.conversationId),
    role: data.role,
    content: data.content,
    createdAt: new Date(),
  };
  const result = await collection().insertOne(doc);
  return { _id: result.insertedId, ...doc };
};
