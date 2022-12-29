import React, {useState} from "react";
import {Box, Typography, Button} from "@mui/material";
import {useQuery} from "react-query";
import {WishesRepository} from "../api/repository/WishesRepository";
import {WishesFoldersInterface} from "../interface/wishes.interface";
import {AddFolderDialog} from "./dialog/AddFolderDialog";

interface Props {
	payload: WishesFoldersInterface
}

const WishesFolders = (props: Props) => {
	const {payload: {folders}} = props;
	const [addFolder, setAddFolder] = useState<boolean>(false);

	function handleOnClickAdd() {
		setAddFolder(true);
	}

	function handleOnClickClose() {
		setAddFolder(false);
	}

	return (
		<Box>
			{
				folders.length === 0 ?
					<Button variant={"text"} color={"primary"} onClick={handleOnClickAdd}>Ajouter mon premier dossier</Button> :
					<Typography>{folders.length}</Typography>
			}

			<AddFolderDialog open={addFolder} onClose={handleOnClickClose} />
		</Box>
	);
}

export const Home = () => {
	const {data, isLoading} = useQuery(["wishesFolders"], () =>
		WishesRepository.getFolders()
	);

	return (
		<Box>
			<Typography variant={"h4"} color={"primary"}>Mes listes</Typography>
			{
				!isLoading && <WishesFolders payload={data!.payload}/>
			}
		</Box>
	);
}