import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    data: [{ type: String, ref: "todo_list" }],
});

const Board = mongoose.model("board", boardSchema);

export default Board;
