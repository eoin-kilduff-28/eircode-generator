const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./eircodes.db');

db.run(`
  CREATE TABLE IF NOT EXISTS saved_eircodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    county TEXT,
    town TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get('/api/check-eircode', (req, res) => {
  const code = req.query.code;
  db.get('SELECT id FROM saved_eircodes WHERE code = ?', [code], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ exists: !!row });
  });
});

app.post('/api/save-eircode', (req, res) => {
  const { eircode, county, town } = req.body;
  
  db.run(
    'INSERT INTO saved_eircodes (code, county, town) VALUES (?, ?, ?)',
    [eircode, county, town],
    function (err) {
      if (err) {
        return res.status(409).json({ error: 'Eircode already exists!' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
