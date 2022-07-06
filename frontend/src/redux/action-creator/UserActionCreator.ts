import axios from "axios";
import { systemFetch, systemFetchError, systemFetchSuccess } from "../reducers/SystemSlice";
import { userSet } from "../reducers/UserSlice";

import { AppDispatch } from "../store";

export const userSignIn = (email: string, password: string) => {
    return async(dispatch: AppDispatch) => {

        dispatch(systemFetch());

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users?email=${email}&password=${password}`);

        const data = response.data;

        if (data && data.length > 0) {
            dispatch(systemFetchSuccess());
            dispatch(userSet(data[0]));
        } else {
            dispatch(systemFetchError("Login or password is incorrect!"));
        }
    }
}