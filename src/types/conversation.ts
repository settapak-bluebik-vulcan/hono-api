import { ObjectId } from "mongodb";

// Document ที่เก็บใน MongoDB
export interface Conversation {
  _id: ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: ObjectId;
  conversationId: ObjectId;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

// Parameter type สำหรับ message.repository.create()
export interface CreateMessageInput {
  conversationId: string;
  role: "user" | "assistant";
  content: string;
}
