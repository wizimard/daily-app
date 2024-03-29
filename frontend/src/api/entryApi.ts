import { AxiosResponse } from "axios";

import $api, { $apiFile } from ".";

import { IEntry } from "../models/IEntry";

export async function fetchEntriesApi(entriesLength: number): Promise<AxiosResponse<IEntry[]>> {
    return await $api.get(`/entries?page=${Math.ceil(entriesLength / 6)}`);
}
export async function fetchEntryApi(id: string): Promise<AxiosResponse<IEntry>> {
    return await $api.get(`/entries/get/${id}`);
} 

export async function addEntryApi(entry: IEntry): Promise<AxiosResponse<IEntry>> {
    return await $api.post('/entries/add', {
        ...entry,
        date: (new Date(entry.date)).toString()
    })
}
export async function updateEntryApi(entry: IEntry): Promise<AxiosResponse<IEntry>> {
    return await $api.put('/entries/update', {
        ...entry
    });
}
export async function deleteEntryApi(id: string) {
    return await $api.delete(`/entries/delete/${id}`);
}