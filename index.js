const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const initializeDatabase = require('./db');



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = initializeDatabase(); //nasa isang file nakaimport


app.get('/provinces', (req, res) => {
  db.all('SELECT * FROM province', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    } else {
      res.send(rows);
    }
  });
});

app.post('/provinces', (req, res) => {
  const { regionId, description } = req.body;
 // console.log ("regionId="+req.body);
  //console.log ("description="+description);
  db.run('INSERT INTO province (regionId, description) VALUES (?, ?)', regionId, description, function(err) {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    } else {
      db.get(`SELECT * FROM province WHERE provinceId = ${this.lastID}`, (err, row) => {
        res.send(row);
      });
    }
  });
});

app.put('/provinces/:id', (req, res) => {  //edit ang isang record
  const { regionId, description } = req.body;
  db.run('UPDATE province SET regionId = ?, description = ? WHERE provinceId = ?', [regionId, description, req.params.id], (err) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    } else {
      db.get(`SELECT * FROM province WHERE provinceId = ${req.params.id}`, (err, row) => {
        res.send(row);
      });
    }
  });
});

app.delete('/provinces/:id', (req, res) => {
  db.run('DELETE FROM province WHERE provinceId = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).send({ error: 'Something went wrong' });
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
