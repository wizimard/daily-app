import { combineReducers } from '@reduxjs/toolkit';

import entryReducer from './EntrySlice';

export const rootReducer = combineReducers({
    entryReducer
});