const TodoModel = require('../models/todo');
const mongoose = require('mongoose');

//GET TODOS
const getTodos = async (req, res) => {
  const user_id = req.user._id;
  const todos = await TodoModel.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(todos);
};

//GET A TODO
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Todo Not Found' });
  }
  const todo = await TodoModel.findById(id);

  if (!todo) {
    res.status(404).json({ error: 'Todo Not Found' });
  }

  res.status(200).json(todo);
};

//CREATE A TODO
const createTodo = async (req, res) => {
  const { todo } = req.body;
  const user_id = req.user._id;
  try {
    const todoItem = await TodoModel.create({ todo, user_id });
    res.status(200).json(todoItem);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

//UPDATE A TODO
const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Todo Not Found' });
  }

  const todo = await TodoModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { returnOriginal: false }
  );

  if (!todo) {
    res.status(404).json({ error: 'Todo Not Found' });
  }

  res.status(200).json(todo);
};

//DELETE A TODO
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'Todo Not Found' });
  }

  const todo = await TodoModel.findOneAndDelete({ _id: id });

  if (!todo) {
    res.status(404).json({ error: 'Todo Not Found' });
  }

  res.json(todo);
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
