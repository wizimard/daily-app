import axios, { AxiosResponse } from "axios";

import $api from ".";
import { IUser } from "../models/IUser";

import { AuthResponse } from "../models/Response/AuthResponse";

export async function userSignInApi(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/login', { email, password, username: email });
}
export async function userSignUpApi(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/register', { email, password, username: email });
}
export async function userSignOutApi(): Promise<AxiosResponse<void>> {
    return await $api.post('/logout');
}
export async function getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await $api.get<IUser[]>('/users');
}
export async function checkAuthApi() {
    return await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, {
        withCredentials: true
    });
}