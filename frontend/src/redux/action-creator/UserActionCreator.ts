import axios from "axios";

import { AppDispatch } from "../store";

import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { userSet } from "../reducers/UserSlice";

export const userSignIn = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users?email=${email}&password=${password}`);

            const data = response.data;
    
            if (data && data.length > 0) {
                dispatch(systemFetchSuccess());

                dispatch(userSet(data[0]));

                return;
            }
            dispatch(systemFetchError("Login or password is incorrect!"));

        } catch(e) {
            dispatch(systemFetchError("Error!"));
        }
    }
}
export const userSignUp = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        try {
            const check = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users?email=${email}`);

            const checkData = check.data;
    
            if (checkData && checkData.length > 0) {
                dispatch(systemFetchError("Email is busy!"));
                return;
            }
    
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users`, {
                email,
                password,
                username: email
            });
    
            const data = response.data;
    
            if (data) {
                dispatch(systemFetchSuccess());

                dispatch(userSet(data));

                return;
            }
            dispatch(systemFetchError("Authentication error!"));

        } catch (e) {
            dispatch(systemFetchError("Error!"));
        }
    }
}