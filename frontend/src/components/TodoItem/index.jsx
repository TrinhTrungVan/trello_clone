import React from "react";

import Button from "../../components/Button";

import "./TodoItem.scss";

const TodoItem = () => {
    return (
        <div className='todoitem_container'>
            <div className='name'>TrinhTrungVanTrinhTrungVanTrinhTrungVanTrinhTrungVanTrinhTrungVan</div>
            <div className='actions'>
                <Button>
                    <i className='bx bx-pencil'></i>
                </Button>
                <Button>
                    <i className='bx bx-x'></i>
                </Button>
            </div>
        </div>
    );
};

export default TodoItem;
