const messages = require("../models/messages.js");

// GET home page
function getAllMessages(req, res) {
  return res.render("index", {
    title: "Mini Message Board",
    messages: messages,
  });
}

// GET new message form
function getMessageForm(req, res) {
  res.render("form", { title: "Create New Message", messages: messages });
}

function createMessage(req, res) {
  // console.log(req.body);
  const { messageUser, messageText } = req.body;

  if (!messageUser || !messageText) {
    return res
      .status(400)
      .render("error", { message: "Both user and message are required" });
  }

  const newMessage = {
    id: Date.now(),
    text: messageText,
    user: messageUser,
    added: new Date(),
  };

  messages.push(newMessage);
  res.redirect("/");
}

// GET individual message detail
function getMessageDetail(req, res) {
  // console.log(req.body);
  const messageId = Number(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    return res.status(400).render("error", { message: "Message not found" });
  }
  res.render("message-detail", {
    title: "Message Details",
    message: message,
  });
}

module.exports = {
  getAllMessages,
  createMessage,
  getMessageForm,
  getMessageDetail,
};
