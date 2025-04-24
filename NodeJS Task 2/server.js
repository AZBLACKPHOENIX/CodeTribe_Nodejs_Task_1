const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { createuser, adduser, deleteusers, updateUser } = require('./crud-operator');


app.use(express.json());

createuser();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/', (req, res) => {
  const { firstname, surname, age, id } = req.body;
  if (!firstname || !surname || !age || !id) {
    return res.status(400).send('Missing required fields');
  }
  adduser(firstname, surname, age, id, (err, message) => {
    if (err) return res.status(500).send('Server Error');
    if (message === 'User already exists') return res.status(409).send(message);
    res.send(message);
  });
});


app.delete('/', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send("Missing user ID");
  deleteusers(id);
  res.send("User deleted");
});


app.put('/', (req, res) => {
  const { id, ...updatedData } = req.body;
  if (!id) return res.status(400).send("Missing user ID");
  updateUser(id, updatedData, (err, message) => {
    if (err) return res.status(500).send("Server Error");
    res.send(message);
  });
});


app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});