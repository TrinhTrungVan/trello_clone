import React from "react";

import "./Button.scss";

const Box = (props) => {
    return <button className='button_container'>{props.children}</button>;
};

export default Box;
