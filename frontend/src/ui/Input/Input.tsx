import React, { useState } from "react";

import './Input.scss';

interface InputProps {
    id?: string;
    addClass?: string
    type: string;
    initialValue: string;
    placeholder: string;
    onSave: (value: string) => void;
}

const Input:React.FC<InputProps> = ({ id, 
        addClass='', 
        type = 'text', 
        initialValue = '', 
        placeholder = '', 
        onSave }) => {

    const [value, setValue] = useState(initialValue);

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const handlerOnBlur = () => {
        onSave(value);
    }

    return (
        <input id={id}
               className={`input ${addClass}`}
               type={type}
               value={value}
               placeholder={placeholder}
               onChange={handlerOnChange}
               onBlur={handlerOnBlur} />
    )
}

export default Input;