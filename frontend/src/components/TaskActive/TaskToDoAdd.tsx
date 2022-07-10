import React from "react";

import { useAppDispatch } from "../../hooks/redux";
import { addTaskToDo } from "../../redux/reducers/TaskSlice";

import AddBlack1xPng from "../../assets/img/add-black1x.png";
import AddBlack2xPng from "../../assets/img/add-black2x.png";

const TaskToDoAdd:React.FC = () => {

    const dispatch = useAppDispatch();

    const handlerAddTodo = () => {
        dispatch(addTaskToDo(null));
    }

    return (
        <div className="todo-add" onClick={handlerAddTodo}>
            <div className="img-container todo-add__img">
                <img src={AddBlack1xPng} 
                    srcSet={`${AddBlack1xPng} 1x, ${AddBlack2xPng} 2x`}
                    alt="" />
            </div>
            <span className="todo-add__text">Add new to-do</span>
        </div>
    );
}

export default TaskToDoAdd;