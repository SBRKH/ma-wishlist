import React, {PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import {useUser} from "../../hooks/useUser";

export const ProtectedRoute = ({ children }: PropsWithChildren<any>) => {
	const user = useUser();

	if (!user) {
		return <Navigate to="/" />;
	}

	return (
		children
	);
};