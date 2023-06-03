const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model('ToDo', TodoSchema);
module.exports = TodoModel;
