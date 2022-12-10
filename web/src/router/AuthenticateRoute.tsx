import React, {PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export const AuthenticateRoute = ({ children }: PropsWithChildren<any>) => {
	const { user } = useAuth()!;

	console.log("user==", user);

	if (user) {
		return <Navigate to="/home" />;
	}

	return children;
};