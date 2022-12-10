import {createContext, PropsWithChildren, useContext, useMemo} from "react";
import {useLocalStorage} from "./useLocalStorage";
import {useNavigate} from "react-router-dom";

interface AuthProps {
	login: (data: any) => void,
	logout: () => void,
	user: any
}

export const AuthContext = createContext<AuthProps|null>(null);

export const AuthProvider = ({children}: PropsWithChildren) => {
	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();

	const login = async (data: any) => {
		setUser(data);
		navigate("/home");
	};

	const logout = () => {
		setUser(null);
		navigate("/", {replace: true});
	};

	const value: AuthProps = useMemo(() => ({user, login, logout}), [user]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};