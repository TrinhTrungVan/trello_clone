import React from "react";

import Button from "../../components/Button";

import "./TodoItem.scss";

const TodoItem = (props) => {
    const item = props.item;

    return (
        <div id={item._id} data-index={props.index} className='todoitem_container'>
            <div className='name'>{item.name}</div>
            <Button>
                <i className='bx bx-pencil'></i>
            </Button>
        </div>
    );
};

export default TodoItem;
