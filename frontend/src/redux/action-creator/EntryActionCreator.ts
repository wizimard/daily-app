import { AppDispatch } from "../store";

import { addEntry, removeEntry, setActiveEntry, setEntries, updateEntry } from '../reducers/EntrySlice';
import { systemFetch, systemFetchError, systemFetchSuccess } from '../reducers/SystemSlice';

import { deleteEntryApi, fetchEntriesApi, fetchEntryApi, addEntryApi, updateEntryApi } from '../../api/entryApi';

import { formatDate } from '../../utils/date';

import { IEntry } from '../../models/IEntry';
import { requestStatus } from "../../constants/requestConstants";

export const fetchEntries = (currentCount: number) => async(dispatch: AppDispatch) => {
    dispatch(systemFetch());

    try {
        const data = await fetchEntriesApi();

        if (data.status === requestStatus.OK) {

            dispatch(setEntries(data.entries));
        }

        dispatch(systemFetchSuccess());

    } catch (e) {        
        dispatch(systemFetchError("Error when trying to load entries!"));
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

            const data = await fetchEntryApi(id);            

            if (data.status === requestStatus.OK) {
                dispatch(setActiveEntry(data.entry));            
            }

            dispatch(systemFetchSuccess());

        } catch(e) {            
            dispatch(systemFetchError('Error when trying to load entry!'));
        }
    }
}
export const saveEntry = (entry: IEntry) => async(dispatch: AppDispatch) => {
    dispatch(systemFetch());

    try {
        const entrySave = JSON.parse(JSON.stringify(entry));

        if (!entrySave.title) entrySave.title = formatDate();

        if (entrySave.id === "new") {

            const data = await addEntryApi(entrySave);

            if (data.status === requestStatus.OK) {
                dispatch(addEntry(data.entry));

                dispatch(systemFetchSuccess());

                return data.entry.id;
            }
        }

        const data = await updateEntryApi(entrySave);

        if (data.status === requestStatus.OK) {
            dispatch(updateEntry(data.entry));

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

            await deleteEntryApi(id);

            dispatch(removeEntry(id));

            dispatch(systemFetchSuccess());

            return true;

        } catch (e) {
            dispatch(systemFetchError("Error when trying to delete entry!"));
        }
    }
}