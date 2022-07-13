import axios from "axios";

export async function userSignInApi(email: string, password: string) {

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users?email=${email}&password=${password}`);

    const data = response.data;

    return data;
}
export async function userSignUpApi(email: string, password: string) {

    const check = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users?email=${email}`);

    if (check.data && check.data.length > 0) {
        return {
            status: "error",
            error: "Email is busy!"
        }
    }
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users`, {
        email,
        password,
        username: email
    });

    const data = response.data;

    if (data) {
        return {
            status: "ok",
            data
        }
    }
    return {
        status: "error",
        error: "Authentication error!"
    }
}