import React, { useState, useEffect } from "react";

import axios from "axios";

import TodoItem from "../../components/TodoItem";
import AddItem from "../../components/AddItem";

import "./TodoList.scss";

const TodoList = (props) => {
    const list = props.list;
    const [isAdding, setIsAdding] = useState(false);
    const [nameTodoAdd, setNameTodoAdd] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            let response = await axios.get(`http://localhost:1904/api/todo_lists/${list._id}`);
            setTodos(response.data.data);
        };
        getTodos();
    }, []);

    const handleOnClick = () => {
        if (isAdding && nameTodoAdd !== "") {
            todos.push({ id: todos.length + 1, name: nameTodoAdd });
            setNameTodoAdd("");
        }
        setIsAdding((prev) => !prev);
    };

    const handleCancel = () => {
        setNameTodoAdd("");
        setIsAdding(false);
    };
    const handleChange = (e) => {
        setNameTodoAdd(e.target.value);
    };

    return (
        <div id={list._id} className='todolist_container'>
            <div className='header'>
                <div className='name'>{list.name}</div>
                <i className='bx bx-dots-horizontal-rounded'></i>
            </div>
            <div className='content'>
                {todos.map((todo, index) => (
                    <TodoItem key={index} index={todo.id} item={todo} />
                ))}
            </div>
            <AddItem type='card' />
        </div>
    );
};

export default TodoList;
