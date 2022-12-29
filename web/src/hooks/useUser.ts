import {useAppSelector} from "../store/store";

export const useUser = () => {
	return useAppSelector(state => state.auth.user);
};