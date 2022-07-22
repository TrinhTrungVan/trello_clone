import React from "react";

import TodoItem from "../../components/TodoItem";

import "./TodoList.scss";

const TodoList = () => {
    return (
        <div className='todolist_container'>
            <div className='header'>
                <div className='name'>TodoList</div>
                <i className='bx bx-dots-horizontal-rounded'></i>
            </div>
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
        </div>
    );
};

export default TodoList;
