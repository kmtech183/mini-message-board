const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
// Option 1: Individual properties (good for local dev)
// module.exports = new Pool({
//   host: "localhost",
//   user: "mruna",
//   database: "top_users",
//   password: "",
//   port: 5432,
// });

// module.exports = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// Option 2: Connection string (what hosted services give you)
// module.exports = new Pool({
//   connectionString: "postgresql://mruna:@localhost:5432/top_users"
// });

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  //   ssl: { rejectUnauthorized: false },
});
