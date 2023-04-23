const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {
  const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the SQLite database.');
      db.run(`
        CREATE TABLE IF NOT EXISTS province (
          provinceId INTEGER PRIMARY KEY AUTOINCREMENT,
          regionId INTEGER,
          description TEXT
        )
      `);
    }
  });

  return db;
}

module.exports = initializeDatabase;
