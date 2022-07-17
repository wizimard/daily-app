import { AppDispatch } from "../store";

import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { addTask, setActiveTask, taskFetchingSucces, taskSlice, updateTask } from "../reducers/TaskSlice";

import { addTaskApi, deleteTaskApi, fetchTaskApi, fetchTasksApi, updateTaskApi } from "../../api/taskApi";

import { ITask } from "../../models/ITask";

export const fetchTasks = () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());
            
            const response = await fetchTasksApi();

            dispatch(taskFetchingSucces(response.data));

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

            const response = await fetchTaskApi(id);            

            dispatch(setActiveTask(response.data));

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
            return false;
        }

        try {

            const saveTask = {
                ...task
            }

            if (saveTask.id === "new") {

                const response = await addTaskApi(saveTask);
                
                dispatch(addTask(response.data));
                dispatch(systemFetchSuccess());
                return response.data.id;

            }
            const response = await updateTaskApi(saveTask);

            dispatch(updateTask(response.data));
            dispatch(systemFetchSuccess());
            return response.data.id;

        } catch (e) {
            dispatch(systemFetchError("Error when trying to save task!"))
        }
    }
}
export const deleteTask = (id: string) => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());

            await deleteTaskApi(id);

            dispatch(taskSlice.actions.deleteTask(id));
    
            dispatch(taskSlice.actions.clearActiveTask());

            dispatch(systemFetchSuccess());

            return true;
        } catch (e) {
            dispatch(systemFetchError("Error when trying to delete task!"));
        }
    }
}