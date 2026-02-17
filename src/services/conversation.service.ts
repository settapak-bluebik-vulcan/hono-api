import { NotFoundError } from "../errors/app-error";
import * as conversationRepo from "../repositories/conversation.repository";
import * as messageRepo from "../repositories/message.repository";
import * as validate from "../utils/validateObjectId";
import * as aiService from "./ai.service";

export const createConversation = (title: string) => {
  return conversationRepo.create({ title });
};

export const getConversations = async (offset: number, limit: number) => {
  const [data, total] = await Promise.all([
    conversationRepo.findAll(offset, limit),
    conversationRepo.count(),
  ]);
  return { data, total };
};

export const updateConversation = async (id: string, title: string) => {
  validate.validateObjectId(id);
  const existing = await conversationRepo.findById(id);
  if (!existing) {
    throw new NotFoundError("conversation not found");
  }
  return conversationRepo.updateTitle(id, title);
};

export const sendMessage = async (conversationId: string, content: string) => {
  validate.validateObjectId(conversationId);
  const existing = await conversationRepo.findById(conversationId);
  if (!existing) {
    throw new NotFoundError("conversation not found");
  }

  const userMessage = await messageRepo.create({
    conversationId,
    role: "user",
    content,
  });

  const aiReply = aiService.generateReply(content);

  const aiMessage = await messageRepo.create({
    conversationId,
    role: "assistant",
    content: aiReply,
  });

  return { userMessage, aiMessage };
};
