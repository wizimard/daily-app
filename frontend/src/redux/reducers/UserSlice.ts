import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../models/IUser";

interface UserState {
    email: string;
    username: string;
};
const initialState:UserState = {
    email: "",
    username: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userSet(state, action: PayloadAction<IUser>) {
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        userClear(state) {
            state = initialState;
        }
    }
});

export const { userSet, userClear } = userSlice.actions;

export default userSlice.reducer;