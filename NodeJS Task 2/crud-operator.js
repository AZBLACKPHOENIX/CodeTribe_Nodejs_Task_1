const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'user_db.json');

exports.createuser = () => {
  const initialData = { users: [] };
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    console.log("Database created");
  } else {
    console.log("Database already exists");
  }
};

exports.adduser = (name, surname, age, id, callback) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return callback(err);

    const jsonData = JSON.parse(data);
    const exists = jsonData.users.some(user => user.id === id);

    if (exists) return callback(null, "User already exists");

    jsonData.users.push({ name, surname, age, id });

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), err => {
      if (err) return callback(err);
      callback(null, "User added");
    });
  });
};

exports.deleteusers = (id) => {
  const data = fs.readFileSync(dbPath);
  const jsonData = JSON.parse(data);
  jsonData.users = jsonData.users.filter(user => user.id !== id);
  fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2));
  console.log("User deleted");
};

exports.updateUser = (id, updatedData, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return callback(err);

    let jsonData = JSON.parse(data);
    const index = jsonData.users.findIndex(user => user.id === id);

    if (index === -1) return callback(null, "User not found");

    jsonData.users[index] = { ...jsonData.users[index], ...updatedData };

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), err => {
      if (err) return callback(err);
      callback(null, "User updated");
    });
  });
};
