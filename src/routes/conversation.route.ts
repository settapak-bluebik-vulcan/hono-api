import { Hono } from "hono";
import * as controller from "../controllers/conversation.controller";
const conversations = new Hono();

conversations.get("/", controller.getAll);
conversations.post("/", controller.create);
conversations.post("/:id/messages", controller.sendMessage);
conversations.patch("/:id", controller.update);

export default conversations;
