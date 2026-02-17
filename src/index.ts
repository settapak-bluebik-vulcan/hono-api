import { Hono } from "hono";
import { connectDB } from "./config/database";
import { AppError } from "./errors/app-error";
import conversations from "./routes/conversation.route";

const app = new Hono();
connectDB();

// Serve Chat UI
app.get("/", async (c) => {
  const html = await Bun.file("src/views/chat.html").text();
  return c.html(html);
});

app.route("/v1/conversations", conversations);

app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json({ success: false, error: err.message }, err.statusCode);
  }

  if (err instanceof SyntaxError) {
    return c.json({ success: false, error: "Invalid JSON Body" }, 400);
  }
  return c.json({ success: false, error: "Internal server error" }, 500);
});

export default app;
