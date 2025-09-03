import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // should come from protectRoute middleware

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
