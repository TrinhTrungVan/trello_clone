import mongoose from "mongoose";

const todoListScheme = new mongoose.Schema({
    name: String,
    data: [
        {
            type: String,
            ref: "todo",
        },
    ],
});

const TodoList = mongoose.model("todo_list", todoListScheme);

export default TodoList;
