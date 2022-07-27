import express from "express";
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "../controllers/TodoController.js";

const todoRouter = express.Router();

todoRouter.delete("/:id", deleteTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.post("/create", createTodo);
todoRouter.get("/", getAllTodos);

export default todoRouter;
