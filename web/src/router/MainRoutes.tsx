import {Route, Routes} from "react-router-dom";
import {Home} from "../components/Home";
import {ProtectedRoute} from "./ProtectedRoute";
import {Login} from "../components/auth/Login";
import {Signup} from "../components/auth/Signup";
import {AuthenticateRoute} from "./AuthenticateRoute";

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path={"/"} element={<AuthenticateRoute><Login/></AuthenticateRoute>}/>
			<Route path={"/signup"} element={<AuthenticateRoute><Signup/></AuthenticateRoute>}/>
			<Route path={"/home"} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
			<Route path="*" element={<>NOT FOUND</>}/>
		</Routes>
	);
}