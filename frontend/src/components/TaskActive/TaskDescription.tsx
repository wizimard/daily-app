import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeTaskDescription } from "../../redux/reducers/TaskSlice";
import TextareaElement from "../TextareaElement";

const TaskDescription:React.FC = () => {

    const dispatch = useAppDispatch();

    const description = useAppSelector(state => state.task.activeTask?.description) ?? '';

    function handlerOnSave(value: string) {
        dispatch(changeTaskDescription(value));
    }
    return (
        <TextareaElement value={description}
                         handlerOnSave={handlerOnSave}
                         placeholder="Task description" />
    );
}

export default TaskDescription;