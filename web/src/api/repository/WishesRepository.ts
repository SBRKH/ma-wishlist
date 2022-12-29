import {httpApi} from "../httpApi";
import {WishesFolders} from "../../interface/wishes.interface";

export class WishesRepository {
	static getFolders = () => {
		return httpApi.get<WishesFolders>(`wishes/folders`);
	}
}