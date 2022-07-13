import React, { useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch } from "../../hooks/redux";
import { addTaskToDo } from "../../redux/reducers/TaskSlice";

const TaskToDoAdd:React.FC = () => {

    const dispatch = useAppDispatch();

    const { theme } = useContext(ThemeContext);

    const handlerAddTodo = () => {
        dispatch(addTaskToDo(null));
    }

    return (
        <div className="todo-add" onClick={handlerAddTodo}>
            <div className="img-container todo-add__img">
                <img src={theme.img.add.x1} 
                    srcSet={`${theme.img.add.x1} 1x, ${theme.img.add.x2} 2x`}
                    alt="" />
            </div>
            <span className="todo-add__text">Add new to-do</span>
        </div>
    );
}

export default TaskToDoAdd;