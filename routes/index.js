const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// GET home page
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

// GET new message form
indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "New Message", messages: messages });
});

// Post new message form
indexRouter.post("/new", (req, res) => {
  // console.log(req.body);
  const { messageUser, messageText } = req.body;

  const newMessage = {
    id: Date.now(),
    text: messageText,
    user: messageUser,
    added: new Date(),
  };

  messages.push(newMessage);
  res.redirect("/");
});

// GET individual message detail
indexRouter.get("/message/:id", (req, res) => {
  // console.log(req.body);
  const messageId = Number(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render("message-detail", {
    title: "Message Details",
    message: message,
  });
});

module.exports = indexRouter;
