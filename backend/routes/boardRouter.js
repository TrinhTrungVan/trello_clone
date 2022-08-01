import express from "express";

import { updateDataList, updateBoard } from "../controllers/BoardController.js";

const boardRouter = express.Router();

boardRouter.put("/update_todo_list", updateDataList);
boardRouter.put("/update_board", updateBoard);

export default boardRouter;
