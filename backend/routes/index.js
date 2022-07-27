import todoRouter from "./todoRouter.js";
import todoListRouter from "./todoListRouter.js";

const route = (app) => {
    app.use("/api/todos", todoRouter);
    app.use("/api/todo_lists", todoListRouter);
};

export default route;
