const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const todosRoutes = require('./routes/todos');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRoutes);
app.use('/api/user', userRoutes);

const MONGO_URI = process.env.MONGO_URI;

const connectToDB = () =>
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      app.listen(4000, () => {
        console.log('Server started listening on port 4000...');
      });
    })
    .catch((err) => console.log(err));

connectToDB();
