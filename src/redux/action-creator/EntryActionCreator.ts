import axios from 'axios';

import { AppDispatch } from "../store";
import { entrySlice } from '../reducers/EntrySlice';

import { formatDate } from '../../utils/date';
import { generateId } from '../../utils/id';

import { IEntry } from '../../models/IEntry';

export const fetchEntries = (currentCount: number) => async(dispatch: AppDispatch) => {
    try {
        dispatch(entrySlice.actions.entriesFetching());
        const response = await axios.get(`http://localhost:3004/entries?_page=${currentCount / 5 + 1}&_limit=5`);
        const entries = response.data;

        entries.forEach((entry: any) => {
            entry.date = formatDate(entry.date);
            entry.notes = entry.notes.join(', ');
        });

        dispatch(entrySlice.actions.entriesFetchingSuccess(entries));
    } catch (e) {
        dispatch(entrySlice.actions.entriesFetchingError(JSON.stringify(e)));
    }
}
export const saveEntry = (entry: IEntry) => async(dispatch: AppDispatch) => {
    try {
        const entrySave = JSON.parse(JSON.stringify(entry));
        // POST query to back

        if (entrySave.id === "new") {
            entrySave.id = generateId();

            dispatch(entrySlice.actions.addEntry(entrySave));

            return;
        }

        dispatch(entrySlice.actions.saveEntry(entrySave));

    } catch (e) {
        console.log(e);
    }
}
export const deleteEntry = (id: string) => async(dispatch: AppDispatch) => {
    try {

        dispatch(entrySlice.actions.deleteEntry(id));

    } catch (e) {
        
        console.log(e);
        
    }
}