import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeTaskTitle } from "../../redux/reducers/TaskSlice";
import TextareaElement from "../TextareaElement";

const TaskTitle:React.FC = () => {

    const dispatch = useAppDispatch();

    const title = useAppSelector(state => state.task.activeTask?.title) ?? '';

    const handlerOnSave = (value: string) => {
        dispatch(changeTaskTitle(value));
    }

    return (
        <TextareaElement value={title} 
                         handlerOnSave={handlerOnSave}
                         placeholder="Task name" />
    );
}

export default TaskTitle;