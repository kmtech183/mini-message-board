const pool = require("./pool");

// Existing function to get all messages
async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC",
  );
  return rows;
}

// Existing function to insert new message
async function insertMessage(username, text) {
  await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
    username,
    text,
  ]);
}

// NEW FUNCTION: Get single message by ID
async function getMessageById(messageId) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    messageId,
  ]);

  // Return the first message (or null if not found)
  return rows[0] || null;
}
module.exports = { getAllMessages, insertMessage, getMessageById };
