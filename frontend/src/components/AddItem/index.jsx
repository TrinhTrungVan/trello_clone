import React, { useState } from "react";

import "./AddItem.scss";

const AddItem = (props) => {
    const type = props.type;
    const [isAdding, setisAdding] = useState(false);

    const handleOnClick = () => {
        setisAdding(!isAdding);
    };

    return (
        <div className='additem_container'>
            {isAdding ? (
                <div className='additem_form'>
                    <input className='additem_form_input' type='text' placeholder={`Enter the title for this ${type}...`} />
                    <div className='additem_form_actions'>
                        <button className='add'>{`Add ${type}`}</button>
                        <button className='cancel' onClick={handleOnClick}>
                            <i className='bx bx-x'></i>
                        </button>
                    </div>
                </div>
            ) : (
                <button className='additem_btn' onClick={handleOnClick}>
                    <i className='bx bx-plus'></i>
                    {`Add a ${type}`}
                </button>
            )}
        </div>
    );
};

export default AddItem;
