const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.get("/api/performance/:item", (req, res) => {
  const item = req.params.item;
  const validItems = ["assets", "liabilities", "profitability"];

  if (!validItems.includes(item)) {
    return res.status(400).json({ error: "Invalid item type" });
  }

  const sql = `SELECT * FROM ${item}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/performance/:item", (req, res) => {
  const item = req.params.item;
  const validItems = ["assets", "liabilities", "profitability"];

  if (!validItems.includes(item)) {
    return res.status(400).json({ error: "Invalid item type" });
  }

  const { month, amount, target } = req.body;
  const sql = `INSERT INTO ${item} (month, amount, target) VALUES (?, ?, ?)`;
  const params = [month, amount, target];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Data added successfully",
      data: { id: this.lastID, month, amount, target },
    });
  });
});

app.delete("/api/performance/:item/:id", (req, res) => {
  const item = req.params.item;
  const id = req.params.id;
  const validItems = ["assets", "liabilities", "profitability"];

  if (!validItems.includes(item)) {
    return res.status(400).json({ error: "Invalid item type" });
  }

  const sql = `DELETE FROM ${item} WHERE id = ?`;

  db.run(sql, id, function (err) {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Data deleted successfully", changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

