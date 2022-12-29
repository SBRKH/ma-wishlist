import React, {PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser";

export const AuthenticateRoute = ({ children }: PropsWithChildren<any>) => {
	const user = useUser()!;

	console.log("user==", user);

	if (user) {
		return <Navigate to="/home" />;
	}

	return children;
};