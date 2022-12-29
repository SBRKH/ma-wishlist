import {httpApi} from "../httpApi";
import {LoginPayload, SignupPayload} from "../../interface/auth.interface";

export class AuthRepository {
	static login = (payload: LoginPayload) => {
		return httpApi.put(`/auth/login`, payload);
	}

	static signup = (payload: SignupPayload) => {
		return httpApi.post(`/auth/signup`, payload);
	}
}

export function refreshBearerToken() {
	return httpApi.put(`/auth/me/token/refresh`);
}
