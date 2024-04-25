import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

const fs = require("fs");
fs.readFile("./database/admissions.sql", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  db.exec(data, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("SQL statements executed successfully.");
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
