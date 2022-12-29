import {httpApi} from "../httpApi";
import {WishesFoldersInterface} from "../../interface/wishes.interface";

export class WishesRepository {
	static getFolders = () => {
		return httpApi.get<WishesFoldersInterface>(`/wishes/folders`);
	}

	static addFolder = (name: string) => {
		return httpApi.post<boolean>(`/wishes/folders?name=${name}`);
	}
}