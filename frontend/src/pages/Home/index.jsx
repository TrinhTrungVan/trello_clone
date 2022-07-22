import React from "react";

import TodoList from "../../components/TodoList";

import "./Home.scss";

const Home = () => {
    return (
        <div className='home_container'>
            <div className='wrapper'>
                <TodoList />
                <TodoList />
                <TodoList />
                <TodoList />
                <TodoList />
                <TodoList />
                <TodoList />
                <TodoList />
            </div>
        </div>
    );
};

export default Home;
