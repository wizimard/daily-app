import React from "react";

import "./Button.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
    addedClass?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, addedClass }) => {
    return(
        <button className={`btn ${addedClass}`} 
                onClick={onClick}>{ text }</button>
    );
}

export default Button;