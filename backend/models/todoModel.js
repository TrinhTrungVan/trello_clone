import mongoose from "mongoose";

const todoScheme = new mongoose.Schema({
    name: String,
});

const Todo = mongoose.model("todo", todoScheme);

export default Todo;
