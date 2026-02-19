import { Hono } from "hono";
import * as controller from "../controllers/conversation.controller";
const conversations = new Hono();

conversations.get("/", controller.listConversations);
conversations.post("/", controller.createConversation);
conversations.post("/:id/messages", controller.sendMessage);
conversations.patch("/:id", controller.updateConversation);

export default conversations;
