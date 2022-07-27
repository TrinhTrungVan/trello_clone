import mongoose from "mongoose";

const todoListScheme = new mongoose.Schema({
    data: Array,
    name: String,
});

const TodoList = mongoose.model("todo_list", todoListScheme);

export default TodoList;
