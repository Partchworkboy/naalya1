const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'naalya.db';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    const createTableQueries = [
      `CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT,
        amount INTEGER,
        target INTEGER
      )`,
      `CREATE TABLE IF NOT EXISTS liabilities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT,
        amount INTEGER,
        target INTEGER
      )`,
      `CREATE TABLE IF NOT EXISTS profitability (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT,
        amount INTEGER,
        target INTEGER
      )`,
    ];

    createTableQueries.forEach(query => {
      db.run(query, (err) => {
        if (err) {
          console.log('Table already exists.');
        } else {
          console.log('Table created.');
        }
      });
    });
  }
});

module.exports = db;
