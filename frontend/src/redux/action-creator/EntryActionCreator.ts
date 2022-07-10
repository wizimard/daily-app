import axios from 'axios';

import { AppDispatch } from "../store";

import { entrySlice } from '../reducers/EntrySlice';
import { systemFetch, systemFetchError, systemFetchSuccess } from '../reducers/SystemSlice';

import { formatDate } from '../../utils/date';

import { IEntry } from '../../models/IEntry';

export const fetchEntries = (currentCount: number) => async(dispatch: AppDispatch) => {
    dispatch(systemFetch());

    try {
        const response = await axios.get(`http://localhost:3004/entries?_page=${currentCount / 5 + 1}&_limit=5`);
        const entries = response.data;

        entries.forEach((entry: any) => {
            entry.date = formatDate(entry.date);
            entry.notes = entry.notes.join(', ');
        });

        dispatch(entrySlice.actions.entriesFetchingSuccess(entries));

        dispatch(systemFetchSuccess());

    } catch (e) {
        dispatch(systemFetchError("Error when trying to load entries!"));
    }
}
export const saveEntry = (entry: IEntry) => async(dispatch: AppDispatch) => {
    dispatch(systemFetch());

    try {
        const entrySave = JSON.parse(JSON.stringify(entry));

        if (entrySave.id === "new") {

            delete entrySave.id;

            const response = axios.post(`${process.env.REACT_APP_BACKEND_URL}entries`, {
                ...entrySave
            });

            const data = (await response).data;

            if (data) {
                dispatch(entrySlice.actions.addEntry(data));

                dispatch(systemFetchSuccess());

                return data.id;
            }
        }

        const response = axios.put(`${process.env.REACT_APP_BACKEND_URL}entries/${entrySave.id}`, {
            ...entrySave
        });

        const data = (await response).data

        if (data) {
            dispatch(entrySlice.actions.saveEntry(entrySave));

            dispatch(systemFetchSuccess());

            return entrySave.id;
        }

    } catch (e) {
        dispatch(systemFetchError("Error when trying to save entry!"));
    }
}
export const deleteEntry = (id: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(systemFetch());

        try {

            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}entries/${id}`);

            dispatch(entrySlice.actions.deleteEntry(id));

            dispatch(systemFetchSuccess());

            return true;

        } catch (e) {
            dispatch(systemFetchError("Error when trying to delete entry!"));
        }
    }
}