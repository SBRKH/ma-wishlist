import React, {PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: PropsWithChildren<any>) => {
	const { user } = useAuth()!;

	if (!user) {
		return <Navigate to="/" />;
	}

	return (
		children
	);
};