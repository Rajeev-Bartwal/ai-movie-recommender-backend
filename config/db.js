const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./movies.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_input TEXT,
      recommended_movies TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

});

module.exports = db;