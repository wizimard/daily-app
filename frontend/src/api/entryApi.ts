import axios from "axios";
import { requestStatus } from "../constants/requestConstants";

import { IEntry } from "../models/IEntry";

import { formatDate } from "../utils/date";

export async function fetchEntriesApi() {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}entries?_sort=date&_order=desc,asc`);

    const entries = response.data;

    entries.forEach((entry: any) => {
        entry.date = formatDate(entry.date);
    });

    const request = {
        status: requestStatus.OK,
        entries
    };

    return request;
}
export async function fetchEntryApi(id: string) {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}entries/${id}`);

    const entry = response.data;

    entry.date = formatDate(entry.date);

    const request = {
        status: requestStatus.OK,
        entry
    };

    return request;
} 

export async function addEntryApi(entry: IEntry) {
    entry.id = '';

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}entries`, {
        ...entry,
        date: (new Date(entry.date)).toString()
    });

    const addEntry = response.data;

    addEntry.date = formatDate(addEntry.date);

    const request = {
        status: requestStatus.OK,
        entry: addEntry
    };

    return request;
}
export async function updateEntryApi(entry: IEntry) {

    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}entries/${entry.id}`, {
        ...entry,
        date: (new Date(entry.date)).toString()
    });

    const updateEntry = response.data

    updateEntry.date = formatDate(updateEntry.date);

    const request = {
        status: requestStatus.OK,
        entry: updateEntry
    };

    return request;
}
export async function deleteEntryApi(id: string) {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}entries/${id}`);

    const request = {
        status: requestStatus.OK
    };

    return request;
}