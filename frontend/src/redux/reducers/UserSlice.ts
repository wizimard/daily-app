import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../models/IUser";

interface UserState {
    email: string;
    username: string;
    avatar?: string;
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
            state.email = "";
            state.username = "";
            delete state.avatar;
        }
    }
});

export const { userSet, userClear } = userSlice.actions;

export default userSlice.reducer;