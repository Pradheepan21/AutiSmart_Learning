const ContactMessage = require("../models/ContactMessage");

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Contact message error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { sendMessage };
