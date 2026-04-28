const db = require("../db/queries.js");
const { body, validationResult, matchedData } = require("express-validator");

// Custom error messages
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";
const emailErr = "must be a valid email address.";
const ageErr = "must be a number between 18 and 120.";
const bioErr = "must be at most 200 characters.";

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("User name is required.")
    .isAlpha()
    .withMessage(`User name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthErr}`),
  body("text")
    .optional({ values: "falsy" })
    .isLength({ max: 200 })
    .withMessage(`messageText ${bioErr}`),
];

// GET home page
async function getAllMessages(req, res) {
  try {
    const messages = await db.getAllMessages();

    return res.render("index", {
      title: "Mini Message Board",
      messages: messages,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("DB Error");
  }
}

// GET new message form
async function getMessageForm(req, res) {
  const messages = await db.getAllMessages();
  res.render("form", { title: "Create New Message", messages: messages });
}

async function createMessage(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Create New Message",
        errors: errors.array(),
      });
    }

    const { username, text } = matchedData(req);

    // If later using DB → await here
    // usersStorage.addUser({ username });
    await db.insertMessage(username, text);

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
}

// GET individual message detail
// IMPORTANT: Make this function ASYNC
async function getMessageDetail(req, res) {
  try {
    const messageId = Number(req.params.id);

    // Validate ID is a number
    if (isNaN(messageId)) {
      return res.status(400).render("error", {
        message: "Invalid message ID format",
      });
    }

    // Query database for the message
    const message = await db.getMessageById(messageId);

    // Check if message exists
    if (!message) {
      return res.status(404).render("error", {
        message: `Message with ID ${messageId} not found`,
      });
    }

    // Render the message detail view
    res.render("message-detail", {
      title: "Message Details",
      message: message,
    });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).render("error", {
      message: "Database error - could not retrieve message",
    });
  }
}

module.exports = {
  getAllMessages,
  createMessage,
  getMessageForm,
  getMessageDetail,
  validateUser,
};
