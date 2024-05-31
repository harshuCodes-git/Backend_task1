const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error", err.stack);
  }
};

module.exports = { pool, connectDB };
