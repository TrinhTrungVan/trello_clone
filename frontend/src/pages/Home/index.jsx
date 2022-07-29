import React, { useState, useEffect } from "react";

import axios from "axios";

import TodoList from "../../components/TodoList";

import "./Home.scss";

const Home = () => {
    const [lists, setLists] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleShowForm = () => {
        setIsAdding(!isAdding);
    };
    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const getAllLists = async () => {
            let response = await axios.get("http://localhost:1904/api/todo_lists");
            setLists(response.data);
        };
        getAllLists();
    }, []);

    const handleAddList = () => {
        const addList = async () => {
            try {
                let response = await axios.post("http://localhost:1904/api/todo_lists/create", { nameList: inputValue });
                const newList = response.data;
                setLists([...lists, newList]);
                setInputValue("");
                setIsAdding(false);
            } catch (error) {
                console.log(error);
            }
        };
        addList();
    };

    const handleEditList = (data) => {
        const editList = async () => {
            try {
                const response = await axios.put(`http://localhost:1904/api/todo_lists/${data._id}`, data);
                const updatedList = response.data;
                const newLists = lists.map((list) => {
                    if (list._id === updatedList._id) {
                        return { ...list, name: updatedList.name };
                    }
                    return list;
                });
                setLists(newLists);
            } catch (error) {
                console.log(error);
            }
        };
        editList();
    };

    const handleDeleteList = (id) => {
        const deleteList = async () => {
            try {
                const response = await axios.delete(`http://localhost:1904/api/todo_lists/${id}`);
                const deleteList = response.data;
                const newLists = lists.filter((list) => list._id !== deleteList._id);
                setLists(newLists);
            } catch (error) {
                console.log(error);
            }
        };
        deleteList();
    };

    let dragId = null;
    let isDragging = false;
    let isCard;
    let topGhost;
    let leftGhost;

    const handleMouseDown = (e) => {
        if (e.target.matches(".name") || e.target.matches(".todoitem_container")) {
            isCard = true;
            isDragging = true;
            const dragEl = e.target.closest(".todoitem_container");
            dragId = dragEl.id;
            const rectDragEl = dragEl.getBoundingClientRect();
            topGhost = e.clientY - rectDragEl.top;
            leftGhost = e.clientX - rectDragEl.left;

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
        }
        if (e.target.matches(".header") || e.target.matches(".header_name")) {
            isCard = false;
            isDragging = true;
            const dragEl = e.target.closest(".todolist_container");
            dragId = dragEl.id;
            const rectDragEl = dragEl.getBoundingClientRect();
            topGhost = e.clientY - rectDragEl.top;
            leftGhost = e.clientX - rectDragEl.left;

            //Create ghost element
            const ghost = dragEl.cloneNode(true);
            ghost.style.display = "none";
            ghost.id = "ghost";

            //Create placeholder element
            const placeholder = document.createElement("div");
            placeholder.id = "placeholder";
            placeholder.style.display = "none";
            placeholder.style.height = rectDragEl.height + "px";
            placeholder.style.minWidth = rectDragEl.width + 5 + "px";
            placeholder.style.marginTop = "12px";

            // Prepend ghost and placeholder
            document.body.prepend(ghost);
            document.body.prepend(placeholder);
        }
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
            ghost.style.top = e.clientY - topGhost + "px";
            ghost.style.left = e.clientX - leftGhost + "px";

            // Insert placeholder
            let target = null;
            if (isCard) {
                target = e.target.closest(".todoitem_container");
            } else {
                target = e.target.closest(".todolist_container");
            }

            // Add dragEl into empty list
            if (isCard) {
                const bodyList = e.target.closest(".todolist_container");
                if (bodyList && !bodyList.querySelector(".content").hasChildNodes() && dragEl) {
                    bodyList.querySelector(".content").prepend(placeholder);
                    bodyList.querySelector(".content").prepend(dragEl);
                }
            }

            if (target) {
                if (isCard) {
                    if (isTop(e.clientY, target)) {
                        target.parentNode.insertBefore(placeholder, target);
                        target.parentNode.insertBefore(dragEl, target);
                    } else {
                        target.parentNode.insertBefore(placeholder, target.nextSibling);
                        target.parentNode.insertBefore(dragEl, target.nextSibling);
                    }
                } else {
                    if (isLeft(e.clientX, target)) {
                        target.parentNode.insertBefore(placeholder, target);
                        target.parentNode.insertBefore(dragEl, target);
                    } else {
                        target.parentNode.insertBefore(placeholder, target.nextSibling);
                        target.parentNode.insertBefore(dragEl, target.nextSibling);
                    }
                }
            }

            // Auto scroll horizontal
            const wrapper = e.target.closest(".wrapper");
            if (ghost.getBoundingClientRect().right >= wrapper.getBoundingClientRect().right) {
                wrapper.scrollBy(20, 0);
            } else if (ghost.getBoundingClientRect().left <= wrapper.getBoundingClientRect().left) {
                wrapper.scrollBy(-20, 0);
            }
        }
    };

    const handleMouseUp = (e) => {
        if (isDragging) {
            const dragEl = document.getElementById(dragId);
            if (dragEl) {
                dragEl.style.display = "flex";
            }
            dragId = null;
            const ghost = document.getElementById("ghost");
            const placeholder = document.getElementById("placeholder");
            ghost.remove();
            placeholder.remove();
        }
        isDragging = false;
        isCard = null;
    };

    const isTop = (clientY, element) => {
        const rect = element.getBoundingClientRect();
        return clientY - rect.height / 2 - rect.top - 2 < 0 ? true : false;
    };
    const isLeft = (clientX, element) => {
        const rect = element.getBoundingClientRect();
        return clientX - rect.width / 2 - rect.left - 2 < 0 ? true : false;
    };

    return (
        <div className='home_container'>
            <div className='wrapper' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                {lists.map((list, index) => (
                    <TodoList key={index} list={list} handleEditList={handleEditList} handleDeleteList={handleDeleteList} />
                ))}
                <div className='addlist_container'>
                    {isAdding ? (
                        <div className='addlist_form'>
                            <input
                                className='addlist_form_input'
                                type='text'
                                value={inputValue}
                                onChange={handleOnChange}
                                placeholder={`Enter list title...`}
                            />
                            <div className='addlist_form_actions'>
                                <button className='add' onClick={handleAddList}>
                                    Add another list
                                </button>
                                <button className='cancel' onClick={handleShowForm}>
                                    <i className='bx bx-x'></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className='addlist_btn' onClick={handleShowForm}>
                            <i className='bx bx-plus'></i>
                            Add list
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
