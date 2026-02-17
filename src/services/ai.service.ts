export const generateReply = (userMessage: string): string => {
  const replies = [
    `That's an interesting point about "${userMessage}". Let me think about that.`,
    `I understand you're asking about "${userMessage}". Here's what I think...`,
    `Great question! "${userMessage}" is something I can help with.`,
  ];
  const index = Math.floor(Math.random() * replies.length);
  return replies[index];
};
