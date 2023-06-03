const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

router.use(requireAuth);

router.get('/', getTodos);

router.get('/:id', getTodo);

router.post('/', createTodo);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;
