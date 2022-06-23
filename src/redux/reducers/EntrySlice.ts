import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IEntry } from "../../models/IEntry";
import { formatDate } from "../../utils/date";

interface EntryState {
    entries: IEntry[];
    activeEntry: IEntry | null;
    isLoading: boolean;
    error: string;
    isChangedEntry: boolean;
    isAllFetching: boolean;
}

const initialState: EntryState = {
    entries: [],
    activeEntry: null,
    isLoading: false,
    error: '',
    isChangedEntry: false,
    isAllFetching: false
}

export const entrySlice = createSlice({
    name: 'entry',
    initialState,
    reducers: {
        entriesFetching(state) {
            state.isLoading = true;
        },
        entriesFetchingSuccess(state, action: PayloadAction<IEntry[]>) {
            state.isLoading = false;
            state.error = '';

            if (action.payload && action.payload.length > 0) {
                for (let entry of state.entries) {
                    if (entry.id === action.payload[0].id) {
                        state.isAllFetching = true;
                        return;
                    }
                }
                state.entries = state.entries.concat(action.payload);
                return;
            }
            state.isAllFetching = true;
        },
        entriesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setActiveEntry(state, action: PayloadAction<string>) {
            state.isChangedEntry = false;

            if (action.payload === "new") {
                state.activeEntry = {
                    "id": "new",
                    "date": formatDate((new Date()).toString()),
                    "title": "",
                    "content": "",
                    "images": [],
                    "notes": "",
                };
                return;
            }

            state.activeEntry = JSON.parse(JSON.stringify(
                state.entries.filter(entry => entry.id === action.payload)[0] || null
            ));
        },
        clearActiveEntry(state) {
            state.activeEntry = null;
            state.isChangedEntry = false;
        },
        changeEntryTitle(state, action: PayloadAction<string>) {
            if (state.activeEntry) {
                state.activeEntry.title = action.payload;
                state.isChangedEntry = true;
            }
        },
        changeEntryContent(state, action: PayloadAction<string>) {
            if (state.activeEntry) {
                state.activeEntry.content = action.payload;
                state.isChangedEntry = true;
            }
        },
        changeEntryImages(state, action: PayloadAction<string[]>) {
            if (state.activeEntry) {
                state.activeEntry.images = action.payload;
                state.isChangedEntry = true;
            }
        },
        changeEntryNotes(state, action: PayloadAction<string>) {
            if (state.activeEntry) {
                state.activeEntry.notes = action.payload;
                state.isChangedEntry = true;
            }
        },
        saveEntry(state, action: PayloadAction<IEntry>) {
            const entries = state.entries;

            for (let i = 0; i < entries.length; i++) {
                if (entries[i].id === action.payload.id) entries[i] = action.payload;
            }

            state.entries = entries;
            
            state.isChangedEntry = false;
        },
        addEntry(state, action: PayloadAction<IEntry>) {
            state.entries = [action.payload, ...state.entries];

            state.isChangedEntry = false;
        },
        deleteEntry(state, action: PayloadAction<string>) {
            state.activeEntry = null;

            state.entries = state.entries.filter(entry => entry.id !== action.payload);

            state.isChangedEntry = false;
        }
    }
});

export const { setActiveEntry,
               clearActiveEntry,
               changeEntryContent,
               changeEntryImages,
               changeEntryNotes,
               changeEntryTitle } = entrySlice.actions;

export default entrySlice.reducer;