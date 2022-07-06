import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TaskItems } from "../../components";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTasks } from "../../redux/action-creator/TaskActionCreator";
import { setActiveTask } from "../../redux/reducers/TaskSlice";

import "./Task.scss";

const Task:React.FC = () => {

    const dispatch = useAppDispatch();

    const taskId = useParams().id;

    const tasks = useAppSelector(state => state.task.tasks);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        (async() => {
            await dispatch(fetchTasks());
            await setIsLoaded(true);
        })();
    
    }, [dispatch]);

    useEffect(() => {

        if (taskId && isLoaded) dispatch(setActiveTask(taskId));

    }, [dispatch, taskId, isLoaded]);
    
    return (
        <div className="task page-container">
            <TaskItems tasks={tasks} activeItem={taskId || ""} />
        </div>
    );
}

export default Task;