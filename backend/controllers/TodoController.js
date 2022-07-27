import Todo from "../models/todoModel.js";

export const getAllTodos = async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
};

export const createTodo = async (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save().then(() => res.send(JSON.stringify(newTodo)));
};

export const deleteTodo = async (req, res) => {
    const id = req.params.id;
    const deleteItem = await Todo.findById(id);
    await deleteItem.remove().then(() => res.send(JSON.stringify(deleteItem)));
};

export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const updateItem = new Todo(req.body);
    await Todo.findByIdAndUpdate(id, updateItem).then(() => res.send(JSON.stringify(updateItem)));
};
