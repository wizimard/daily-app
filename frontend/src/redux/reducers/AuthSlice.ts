import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../models/IUser";

interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    user: IUser;
};
const initialState:AuthState = {
    isAuth: false,
    isLoading: true,
    user: {
        id: '',
        email: '',
        username: '',
        isConfirm: false
    }
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading(state) {
            state.isAuth = false;
            state.isLoading = true;
        },
        stopLoading(state) {
            state.isLoading = false;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.isAuth = true;
            state.user = {
                ...action.payload
            }
            state.isLoading = false;
        },
        clearUser(state) {
            state.isAuth = false;
            state.user = initialState.user;
        }
    }
});

export const { startLoading, stopLoading, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;