import React from 'react';

import DoneSvg from "../../assets/img/done.svg";

import './InputCheckbox.scss';

interface InputCheckboxProps {
    isDone: boolean;
    handlerOnChange: () => void;
}

const InputCheckbox:React.FC<InputCheckboxProps> = ({ isDone, handlerOnChange }) => {
    return (
        <>
            <label className={`input-ckeckbox ${isDone && ' input-ckeckbox-done'}`}>
                {isDone && (
                    <img src={DoneSvg} alt="done" />
                )}
                <input type="checkbox"
                        onChange={handlerOnChange} />
            </label>
        </>
    );
}

export default InputCheckbox;