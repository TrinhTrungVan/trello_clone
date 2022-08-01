import TodoList from "../models/todoListModel.js";
import Board from "../models/boardModel.js";

// Update data of list when move todo
export const updateDataList = async (req, res) => {
    const { fromList, targetList } = req.body;
    await TodoList.findByIdAndUpdate(fromList._id, { data: fromList.data });
    await TodoList.findByIdAndUpdate(targetList._id, { data: targetList.data });
};

export const updateBoard = async (req, res) => {
    await Board.find({}).limit(1).updateOne({}, { data: req.body });
};
