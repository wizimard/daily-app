import { AppDispatch } from "../store";

import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { startLoading, stopLoading, setUser, clearUser } from "../reducers/AuthSlice";

import { checkAuthApi, userSignInApi, userSignOutApi, userSignUpApi } from "../../api/authApi";

export const userSignIn = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        try {
            const response = await userSignInApi(email, password);
            
            localStorage.setItem('token', response.data.accessToken);

            dispatch(setUser(response.data.user));

            dispatch(systemFetchSuccess());

        } catch(e: any) {
            console.log(e.response);
            dispatch(systemFetchError(e.response.data.message));
        }
    }
}
export const userSignUp = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        try {
    
            const response = await userSignUpApi(email, password);
            
            localStorage.setItem('token', response.data.accessToken);

            dispatch(setUser(response.data.user));

            dispatch(systemFetchSuccess());

        } catch (e: any) {
            console.log(e.response);
            dispatch(systemFetchError(e.response.data.message));
        }
    }
}
export const userSignOut = () => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        await userSignOutApi();

        localStorage.removeItem('token');

        dispatch(clearUser()); 

        dispatch(systemFetchSuccess());       
    }
}
export const userCheckAuth = () => {
    return async(dispatch: AppDispatch) => {
        dispatch(startLoading());

        try{
            const response = await checkAuthApi();

            localStorage.setItem('token', response.data.accessToken);

            dispatch(setUser(response.data.user));

        } catch(e: any) {
            console.log(e.response.data.message);
            dispatch(stopLoading());
        }
    }
}