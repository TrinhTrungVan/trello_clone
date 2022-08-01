import TodoList from "../models/todoListModel.js";
import Board from "../models/boardModel.js";

export const getSingleTodoList = async (req, res) => {
    const id = req.params.id;
    await TodoList.findById(id)
        .populate("data")
        .then((data) => res.send(data));
};

export const getAllTodoLists = async (req, res) => {
    await Board.find({})
        .limit(1)
        .populate("data")
        .then((data) => res.json(data[0].data));
};

export const createTodoList = async (req, res) => {
    const nameList = req.body.nameList;
    const newTodoList = new TodoList({ name: nameList, data: [] });
    const board = await Board.find({});
    const list = board[0];
    await Board.findByIdAndUpdate({ _id: list._id }, { $push: { data: newTodoList._id.toString() } });
    newTodoList.save().then(() => res.send(JSON.stringify(newTodoList)));
};

export const deleteTodoList = async (req, res) => {
    const id = req.params.id;
    const deleteList = await TodoList.findById(id);
    const board = await Board.find({});
    const list = board[0];
    await Board.findByIdAndUpdate({ _id: list._id }, { $pull: { data: id } });
    await deleteList.remove().then(() => res.send(JSON.stringify(deleteList)));
};

export const updateTodoList = async (req, res) => {
    const id = req.params.id;
    const nameList = req.body.name;
    await TodoList.findByIdAndUpdate(id, { name: nameList });
    const updatedList = await TodoList.findById(id);
    res.send(JSON.stringify(updatedList));
};
