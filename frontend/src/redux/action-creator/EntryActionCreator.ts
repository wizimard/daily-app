import { AppDispatch } from "../store";

import { addEntry, removeEntry, setActiveEntry, setEntries, updateEntry } from '../reducers/EntrySlice';
import { systemFetch, systemFetchError, systemFetchSuccess } from '../reducers/SystemSlice';

import { deleteEntryApi, fetchEntriesApi, fetchEntryApi, addEntryApi, updateEntryApi } from '../../api/entryApi';

import { formatDate } from '../../utils/date';

import { IEntry } from '../../models/IEntry';

export const fetchEntries = () => async(dispatch: AppDispatch) => {
    dispatch(systemFetch());

    try {
        const response = await fetchEntriesApi();        

        dispatch(setEntries(response.data));

        dispatch(systemFetchSuccess());

    } catch (e: any) {
        dispatch(systemFetchError(e.response.data.message));
    }
}
export const fetchEntry = (id: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(systemFetch());

        try {
            if (id === 'new') {
                dispatch(setActiveEntry(id));
                dispatch(systemFetchSuccess());
                return;
            }

            const response = await fetchEntryApi(id);

            dispatch(setActiveEntry(response.data));

            dispatch(systemFetchSuccess());

        } catch(e: any) {            
            dispatch(systemFetchError(e.response.data.message));
        }
    }
}
export const saveEntry = (entry: IEntry) => async(dispatch: AppDispatch) => {
    dispatch(systemFetch());

    try {
        const entrySave = JSON.parse(JSON.stringify(entry));

        if (!entrySave.title) entrySave.title = formatDate();

        if (entrySave.id === "new") {

            const response = await addEntryApi(entrySave);            

            dispatch(addEntry(response.data));

            dispatch(systemFetchSuccess());

            return response.data.id;
        }

        const response = await updateEntryApi(entrySave);

        dispatch(updateEntry(response.data));

        dispatch(systemFetchSuccess());

        return response.data.id;

    } catch (e) {
        dispatch(systemFetchError("Error when trying to save entry!"));
    }
}
export const deleteEntry = (id: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(systemFetch());

        try {

            await deleteEntryApi(id);

            dispatch(removeEntry(id));

            dispatch(systemFetchSuccess());

            return true;

        } catch (e) {
            dispatch(systemFetchError("Error when trying to delete entry!"));
        }
    }
}