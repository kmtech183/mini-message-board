const { Router } = require("express");
const indexRouter = Router();
const messages = require("../models/messages.js");
const messageController = require("../controllers/messageController.js");

// GET home page
indexRouter.get("/", messageController.getAllMessages);

// GET new message form
indexRouter.get("/new", messageController.getMessageForm);

// Post new message form
indexRouter.post("/new", messageController.createMessage);

// GET individual message detail
indexRouter.get("/message/:id", messageController.getMessageDetail);

module.exports = indexRouter;
