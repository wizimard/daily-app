import axios from "axios";

import { requestStatus } from "../constants/requestConstants";

import { ITask } from "../models/ITask";

import { formatDate } from "../utils/date";
import { getTaskStatus } from "../utils/task";

export async function fetchTasksApi() {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}task?_sort=date_start&_order=asc,desc`);

    const tasks = response.data;

    tasks.forEach((task: ITask) => {
        task.status = getTaskStatus(task.date_start, task.date_end, task.todos);

        task.date_start = formatDate(task.date_start);
        task.date_end = formatDate(task.date_end);
    });

    const request = {
        status: requestStatus.OK,
        tasks
    };

    return request;
}
export async function fetchTaskApi(id: string) {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}task/${id}`);

    const task = response.data;

    task.status = getTaskStatus(task.date_start, task.date_end, task.todos);
    task.date_start = formatDate(task.date_start);
    task.date_end = formatDate(task.date_end);    

    const request = {
        status: requestStatus.OK,
        task
    };

    return request;
}
export async function addTaskApi(task: ITask) {
    task.id = "";

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}task`, {
        ...task
    });

    const addTask = response.data;

    const request = {
        status: requestStatus.OK,
        task: addTask
    }

    return request;
}
export async function updateTaskApi(task: ITask) {

    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}task/${task.id}`, {
        ...task
    });

    const updateTask = response.data;

    const request = {
        status: requestStatus.OK,
        task: updateTask
    }

    return request;
}
export async function deleteTaskApi(id: string) {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}task/${id}`);

    const request = {
        status: requestStatus.OK
    }

    return request;
}