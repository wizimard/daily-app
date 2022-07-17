import { AxiosResponse } from "axios";

import $api from ".";

import { ITask } from "../models/ITask";

export async function fetchTasksApi(): Promise<AxiosResponse<ITask[]>> {
    return await $api.get('/tasks');
}
export async function fetchTaskApi(id: string): Promise<AxiosResponse<ITask>> {
    return await $api.get(`/task/${id}`);
}
export async function addTaskApi(task: ITask): Promise<AxiosResponse<ITask>> {
    return await $api.post('/tasks/add', {
        ...task
    });
}
export async function updateTaskApi(task: ITask): Promise<AxiosResponse<ITask>> {
    return await $api.put('/tasks/update', {
        ...task
    });
}
export async function deleteTaskApi(id: string) {
    return await $api.delete(`/tasks/${id}`);
}