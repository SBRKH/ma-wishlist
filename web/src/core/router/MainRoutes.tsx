import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "../../components/Home";
import {ProtectedRoute} from "./ProtectedRoute";
import {Login} from "../../components/auth/Login";
import {Signup} from "../../components/auth/Signup";
import {AuthenticateRoute} from "./AuthenticateRoute";
import {Box} from "@mui/material";
import {useUser} from "../../hooks/useUser";

export const MainRoutes = () => {
	const user = useUser();

	return (
		<Box sx={user ? {padding: '10vh 10px'} : {}}>
			<Routes>
				<Route path={"/"} element={<AuthenticateRoute><Login/></AuthenticateRoute>}/>
				<Route path={"/signup"} element={<AuthenticateRoute><Signup/></AuthenticateRoute>}/>
				<Route path={"/home"} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
				<Route path="*" element={<>NOT FOUND</>}/>
			</Routes>
		</Box>
	);
}