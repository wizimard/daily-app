import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { TaskActive, TaskList } from "../../components";

import { LayoutPage } from '../../ui';

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTask, fetchTasks } from "../../redux/action-creator/TaskActionCreator";
import { clearActiveTask } from "../../redux/reducers/TaskSlice";

const Task:React.FC = () => {

    const dispatch = useAppDispatch();

    const taskId = useParams().id;

    const tasks = useAppSelector(state => state.task.tasks);

    useEffect(() => {

        dispatch(clearActiveTask());
        dispatch(fetchTasks());
    
    }, [dispatch]);

    useEffect(() => {

        if (taskId) dispatch(fetchTask(taskId));

    }, [dispatch, taskId]);
    
    return (
        <LayoutPage>
            <div className="task page-container">
                <TaskList tasks={tasks} activeItem={taskId || ""} />
                <TaskActive />
            </div>
        </LayoutPage>
    );
}

export default Task;