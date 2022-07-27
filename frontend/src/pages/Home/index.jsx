import React, { useState, useEffect } from "react";

import axios from "axios";

import TodoList from "../../components/TodoList";
import AddItem from "../../components/AddItem";

import "./Home.scss";

const Home = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const getAllLists = async () => {
            let response = await axios.get("http://localhost:1904/api/todo_lists");
            setLists(response.data);
        };
        getAllLists();
    }, []);

    let dragId = null;
    const handleMouseDown = (e) => {
        const dragEl = e.target.closest(".todoitem_container");
        dragId = dragEl.id;
        const rectDragEl = dragEl.getBoundingClientRect();

        //Create ghost element
        const ghost = dragEl.cloneNode(true);
        ghost.style.display = "none";
        ghost.id = "ghost";

        //Create placeholder element
        const placeholder = document.createElement("div");
        placeholder.id = "placeholder";
        placeholder.style.display = "none";
        placeholder.style.height = rectDragEl.height + "px";
        placeholder.style.width = rectDragEl.width + "px";

        // Prepend ghost and placeholder
        document.body.prepend(ghost);
        document.body.prepend(placeholder);
    };

    const handleMouseMove = (e) => {
        const dragEl = document.getElementById(dragId);
        const ghost = document.getElementById("ghost");
        const placeholder = document.getElementById("placeholder");
        if (dragEl) {
            dragEl.style.display = "none";
        }
        if (ghost && placeholder) {
            // Display ghost and placeholder
            ghost.style.display = "flex";
            placeholder.style.display = "block";

            //Move ghost with mouse
            const rectGhost = ghost.getBoundingClientRect();
            ghost.style.top = e.clientY - rectGhost.height / 2 + "px";
            ghost.style.left = e.clientX - rectGhost.width / 2 + "px";

            // Insert placeholder
            const target = e.target.closest(".todoitem_container");
            if (target) {
                if (isTop(e.clientY, target)) {
                    target.parentNode.insertBefore(placeholder, target);
                    target.parentNode.insertBefore(dragEl, target);
                } else {
                    target.parentNode.insertBefore(placeholder, target.nextSibling);
                    target.parentNode.insertBefore(dragEl, target.nextSibling);
                }
            }
        }
    };

    const handleMouseUp = (e) => {
        const dragEl = document.getElementById(dragId);
        dragEl.style.display = "flex";
        dragId = null;
        const ghost = document.getElementById("ghost");
        const placeholder = document.getElementById("placeholder");
        ghost.remove();
        placeholder.remove();
    };

    const isTop = (clientY, element) => {
        const rect = element.getBoundingClientRect();
        return clientY - rect.height / 2 - rect.top - 2 < 0 ? true : false;
    };

    return (
        <div className='home_container'>
            <div className='wrapper' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                {lists.map((list, index) => (
                    <TodoList key={index} list={list} />
                ))}
                <div className='add_list'>
                    <AddItem type='list' />
                </div>
            </div>
        </div>
    );
};

export default Home;
