import React from "react";

import { useAppSelector } from "../../hooks/redux";

import TaskToDo from "./TaskToDo";
import TaskToDoAdd from "./TaskToDoAdd";

const TaskToDos:React.FC = () => {

    const todos = useAppSelector(state => state.task.activeTask?.todos) ?? [];

    return (
        <>
        {todos.map((todo, index) => (
            <TaskToDo key={index} {...todo} />
        ))}
        <TaskToDoAdd />
        </>
    );
}

export default TaskToDos;