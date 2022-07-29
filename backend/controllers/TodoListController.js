import TodoList from "../models/todoListModel.js";
import Todo from "../models/todoModel.js";

export const getSingleTodoList = async (req, res) => {
    const id = req.params.id;
    const todoList = await TodoList.findById(id);
    const todos = await Todo.find().where("_id").in(todoList.data).exec();
    const result = { _id: todoList._id, name: todoList.name, data: todos };
    res.json(result);
};

export const getAllTodoLists = async (req, res) => {
    const todoLists = await TodoList.find({});
    res.json(todoLists);
};

export const createTodoList = async (req, res) => {
    const nameList = req.body.nameList;
    const newTodoList = new TodoList({ name: nameList, data: [] });
    newTodoList.save().then(() => res.send(JSON.stringify(newTodoList)));
};

export const deleteTodoList = async (req, res) => {
    const id = req.params.id;
    const deleteList = await TodoList.findById(id);
    await deleteList.remove().then(() => res.send(JSON.stringify(deleteList)));
};

export const updateTodoList = async (req, res) => {
    const id = req.params.id;
    const nameList = req.body.name;
    await TodoList.findByIdAndUpdate(id, { name: nameList });
    const updatedList = await TodoList.findById(id);
    res.send(JSON.stringify(updatedList));
};
