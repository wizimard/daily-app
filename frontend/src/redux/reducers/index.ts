import { combineReducers } from '@reduxjs/toolkit';

import systemReducer from "./SystemSlice";
import userReducer from "./UserSlice";
import entryReducer from './EntrySlice';
import taskReducer from './TaskSlice';

export const rootReducer = combineReducers({
    system: systemReducer,
    user: userReducer,
    entryReducer,
    task: taskReducer
});