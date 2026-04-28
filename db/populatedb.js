#! /usr/bin/env node
const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, text) 
VALUES 
  ('Bryan', 'First message!'),
  ('Odin', 'Hello from Asgard');`;

async function main() {
  console.log("seeding ...");

  // Accept connection string as CLI argument
  const client = new Client({
    connectionString: process.argv[2],
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
