import { AppDispatch } from "../store";

import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { setActiveTask, taskFetchingSucces, taskSlice } from "../reducers/TaskSlice";

import { addTaskApi, deleteTaskApi, fetchTaskApi, fetchTasksApi, updateTaskApi } from "../../api/taskApi";

import { getTaskStatus } from "../../utils/task";

import { ITask } from "../../models/ITask";
import { requestStatus } from "../../constants/requestConstants";

export const fetchTasks = () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());
            
            const data = await fetchTasksApi();

            if (data.status === requestStatus.OK) {

                dispatch(taskFetchingSucces(data.tasks));
            }

            dispatch(systemFetchSuccess());

        } catch (e) {
            dispatch(systemFetchError("Error when trying to load tasks!"));
        }
    }
};
export const fetchTask = (id: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(systemFetch());

        try {

            if (id === 'new') {
                dispatch(setActiveTask(id));
                dispatch(systemFetchSuccess());
                return;
            }

            const data = await fetchTaskApi(id);            

            if (data.status === requestStatus.OK) {
                dispatch(setActiveTask(data.task));
            }
            dispatch(systemFetchSuccess());

        } catch(e) {
            dispatch(systemFetchError('Error when trying to load the task!'));
        }
    }
}
export const saveTask = (task: ITask) => {
    return async(dispatch: AppDispatch) => {
        dispatch(systemFetch());

        if (!task.todos || !task.todos.length) {
            dispatch(systemFetchError('No data!'));
            return;
        }

        try {

            const saveTask = {
                ...task,
                status: getTaskStatus(
                    task.date_start,
                    task.date_end,
                    task.todos
                )
            }

            if (saveTask.id === "new") {

                const data = await addTaskApi(saveTask);

                if (data.status === requestStatus.OK) {
                    dispatch(taskSlice.actions.addTask(data.task));
                    dispatch(systemFetchSuccess());
                    return data.task.id;
                }

            } else {
                const data = await updateTaskApi(saveTask);

                if (data) {
                    dispatch(taskSlice.actions.saveTask(saveTask));
                    dispatch(systemFetchSuccess());
                    return saveTask.id;
                }
            }
            dispatch(systemFetchError("Error!"));

        } catch (e) {
            dispatch(systemFetchError("Error when trying to save task!"))
        }
    }
}
export const deleteTask = (id: string) => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());

            const data = await deleteTaskApi(id);

            if (data.status === requestStatus.OK) {

                dispatch(taskSlice.actions.deleteTask(id));
    
                dispatch(taskSlice.actions.clearActiveTask());
            }

            dispatch(systemFetchSuccess());

            return true;
        } catch (e) {
            dispatch(systemFetchError("Error when trying to delete task!"));
        }
    }
}