const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const todosRoutes = require('./routes/todos');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const connectToDB = () =>
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server started listening on port ${PORT}...`);
      });
    })
    .catch((err) => console.log(err));

connectToDB();
