import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IEntry } from "../../models/IEntry";

interface EntryState {
    entries: IEntry[];
    activeEntry: IEntry | null;
    isChangedEntry: boolean;
    isAllFetching: boolean;
}

const initialState: EntryState = {
    entries: [],
    activeEntry: null,
    isChangedEntry: false,
    isAllFetching: false
}

export const entrySlice = createSlice({
    name: 'entry',
    initialState,
    reducers: {
        setEntries(state, action: PayloadAction<IEntry[]>) {
            if (!action.payload || action.payload.length === 0) {
                state.isAllFetching = true;
                return;
            }
            state.entries = state.entries.concat(action.payload);
        },
        clearEntries(state) {
            state.entries = [];
            state.isAllFetching = false;
        },
        setActiveEntry(state, action: PayloadAction<IEntry | string>) {
            state.isChangedEntry = false;            

            if (action.payload === "new") {
                state.activeEntry = {
                    "id": "new",
                    "date": (new Date()).toString(),
                    "title": '',
                    "content": "",
                    "images": [],
                    "notes": "",
                };
                return;
            }

            if (typeof action.payload === 'string') return;

            state.activeEntry = JSON.parse(JSON.stringify({
                ...action.payload,
                date: new Date(action.payload.date)
            }));
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
        changeEntryNotes(state, action: PayloadAction<string>) {
            if (state.activeEntry) {
                state.activeEntry.notes = action.payload;
                state.isChangedEntry = true;
            }
        },
        addEntryImages(state, action: PayloadAction<string[]>) {
            if (state.activeEntry) {
                state.activeEntry.images = state.activeEntry.images.concat(action.payload);
                state.isChangedEntry = true;
            }
        },
        deleteEntryImage(state, action: PayloadAction<string>) {
            if (state.activeEntry) {
                state.activeEntry.images = state.activeEntry.images.filter(image => image !== action.payload);
                state.isChangedEntry = true;
            }
        },
        updateEntry(state, action: PayloadAction<IEntry>) {
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
        removeEntry(state, action: PayloadAction<string>) {
            state.activeEntry = null;

            state.entries = state.entries.filter(entry => entry.id !== action.payload);

            state.isChangedEntry = false;
        }
    }
});

export const { setEntries,
               clearEntries,
               setActiveEntry,
               clearActiveEntry,
               changeEntryContent,
               addEntryImages,
               deleteEntryImage,
               changeEntryNotes,
               changeEntryTitle,
               addEntry,
               updateEntry,
               removeEntry } = entrySlice.actions;

export default entrySlice.reducer;