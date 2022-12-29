import axios, {AxiosResponse, } from "axios";
import {refreshBearerToken} from "./repository/AuthRepository";
import {authActions} from "../store/reducer/auth";
import {store} from "../store/store";

export const httpApi = axios.create({
	baseURL: "http://localhost:3001",
	headers: {
		"Content-type": "application/json",
		"Authorization": `Bearer ${store.getState().auth.token!}`
	}
});

httpApi.interceptors.response.use((response: AxiosResponse) => {
	return response.data;
},  async (error) => {
	console.log("error==", error);
	const originalRequest = error.config;
	if (error.response.status === 403 && !originalRequest._retry) {
		originalRequest._retry = true;
		console.log("bam");
		const {payload} = await refreshBearerToken();
		console.log("payload==", payload);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.accessToken;
		store.dispatch(authActions.setToken(payload.accessToken));

		return httpApi(originalRequest);
	}

	return Promise.resolve(error.response.data);
});