import axios from "axios";

import { systemFetch, systemFetchSuccess } from "../reducers/SystemSlice";
import { taskFetchingSucces } from "../reducers/TaskSlice";
import { AppDispatch } from "../store";

import { formatDate } from "../../utils/date";
import { ITask } from "../../models/ITask";
import { getTaskStatus } from "../../utils/task";

export const fetchTasks = () => {
    return async(dispatch: AppDispatch) => {
        try {
            dispatch(systemFetch());
            
            const response = axios.get(`${process.env.REACT_APP_BACKEND_URL}task`);

            const data = (await response).data;

            if (data) {

                data.forEach((item: ITask) => {
                    item.status = getTaskStatus(item.date_start, item.date_end, item.tasks);

                    item.date_start = formatDate(item.date_start);
                    item.date_end = formatDate(item.date_end);
                });

                console.log(data);

                dispatch(taskFetchingSucces(data));

                dispatch(systemFetchSuccess());
            }

        } catch (e) {
            console.log(e);
        }
    }
};