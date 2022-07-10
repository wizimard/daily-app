import axios from "axios";

import { AppDispatch } from "../store";

import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { taskFetchingSucces, taskSlice } from "../reducers/TaskSlice";

import { formatDate } from "../../utils/date";
import { getTaskStatus } from "../../utils/task";

import { ITask } from "../../models/ITask";

export const fetchTasks = () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());
            
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}task`);

            const data = (await response).data;

            if (data) {

                data.forEach((item: ITask) => {
                    item.status = getTaskStatus(item.date_start, item.date_end, item.todos);

                    item.date_start = formatDate(item.date_start);
                    item.date_end = formatDate(item.date_end);

                    item.comments.forEach(comment => {
                        comment.date = formatDate(comment.date);
                    })
                });

                dispatch(taskFetchingSucces(data));

                dispatch(systemFetchSuccess());
            }

        } catch (e) {
            dispatch(systemFetchError("Error when trying to load tasks!"));
        }
    }
};
export const saveTask = (task: ITask) => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());

            const saveTask = {
                ...task,
                status: getTaskStatus(
                    task.date_start,
                    task.date_end,
                    task.todos
                )
            }

            if (saveTask.id === "new") {
                saveTask.id = "";

                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}task`, {
                    ...saveTask
                });

                const data = (await response).data;

                if (data) {
                    console.log(data);
                    
                    dispatch(taskSlice.actions.addTask(data));
                    dispatch(systemFetchSuccess());
                    return data.id;
                }

            } else {
                const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}task/${saveTask.id}`, {
                    ...saveTask
                });

                const data = response.data;

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

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}task/${id}`);

            dispatch(taskSlice.actions.deleteTask(id));

            dispatch(taskSlice.actions.clearActiveTask());

            dispatch(systemFetchSuccess());

            return true;
        } catch (e) {
            dispatch(systemFetchError("Error when trying to delete task!"));
        }
    }
}