// src/controllers/conversation.controller.ts

import { Context } from "hono";
import {
  CreateConversationDto,
  SendMessageDto,
  UpdateConversationDto,
} from "../dtos/conversation.dto";
import { BadRequestError, NotFoundError } from "../errors/app-error";
import * as conversationService from "../services/conversation.service";

export const create = async (c: Context) => {
  const body = await c.req.json<CreateConversationDto>();

  if (!body.title) {
    throw new BadRequestError("title is required");
  }

  const conversation = await conversationService.createConversation(body.title);
  return c.json({ success: true, data: conversation }, 201);
};

export const getAll = async (c: Context) => {
  const offset = Number(c.req.query("offset") || "0");
  const limit = Number(c.req.query("limit") || "20");
  const { data, total } = await conversationService.getConversations(
    offset,
    limit,
  );

  return c.json({ success: true, data, pagination: { offset, limit, total } });
};

export const update = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json<UpdateConversationDto>();

  if (!body.title) {
    throw new BadRequestError("title is required");
  }

  const conversation = await conversationService.updateConversation(
    id,
    body.title,
  );

  return c.json({ success: true, data: conversation });
};

export const sendMessage = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json<SendMessageDto>();

  if (!body.content) {
    throw new BadRequestError("content is required");
  }

  const result = await conversationService.sendMessage(id, body.content);
  return c.json({ success: true, data: result }, 201);
};
