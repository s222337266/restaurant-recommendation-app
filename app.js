// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cuisine TEXT, location TEXT, rating INTEGER)');
});

// Routes
app.post('/restaurants', (req, res) => {
    const { name, cuisine, location, rating } = req.body;
    db.run('INSERT INTO restaurants (name, cuisine, location, rating) VALUES (?, ?, ?, ?)', [name, cuisine, location, rating], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send({ id: this.lastID, ...req.body });
        }
    });
});

app.get('/restaurants', (req, res) => {
    db.all('SELECT * FROM restaurants', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(rows);
        }
    });
});

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM restaurants WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (row) {
            res.send(row);
        } else {
            res.status(404).send({ message: 'Restaurant not found' });
        }
    });
});

app.put('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    const { name, cuisine, location, rating } = req.body;
    db.run('UPDATE restaurants SET name = ?, cuisine = ?, location = ?, rating = ? WHERE id = ?', [name, cuisine, location, rating, id], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else if (this.changes === 0) {
            res.status(404).send({ message: 'Restaurant not found' });
        } else {
            res.send({ id, ...req.body });
        }
    });
});

app.delete('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM restaurants WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else if (this.changes === 0) {
            res.status(404).send({ message: 'Restaurant not found' });
        } else {
            res.send({ message: 'Restaurant deleted' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;