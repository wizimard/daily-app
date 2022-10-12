import { combineReducers } from '@reduxjs/toolkit';

import systemReducer from "./SystemSlice";
import authReducer from "./AuthSlice";
import entryReducer from './EntrySlice';
import taskReducer from './TaskSlice';

export const rootReducer = combineReducers({
    system: systemReducer,
    auth: authReducer,
    entryReducer,
    task: taskReducer
});