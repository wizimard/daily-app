import { AppDispatch } from "../store";

import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { userClear, userSet } from "../reducers/UserSlice";

import { userSignInApi, userSignUpApi } from "../../api/userApi";

export const userSignIn = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        try {
            const data = await userSignInApi(email, password);
    
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
    
            const data = await userSignUpApi(email, password);
    
            if (data.status === "ok") {
                dispatch(systemFetchSuccess());

                dispatch(userSet(data.data));
            }
            if (data.status === "error") {
                dispatch(systemFetchError(data.error ?? ''));
            }

        } catch (e) {
            dispatch(systemFetchError("Error!"));
        }
    }
}
export const userLogout = () => {
    return async(dispatch: AppDispatch) => {
        dispatch(userClear);        
    }
}