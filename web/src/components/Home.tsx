import React from "react";
import {Box, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {WishesRepository} from "../api/repository/WishesRepository";

export const Home = () => {
	const { data } = useQuery(["wishesFolders"], () =>
		WishesRepository.getFolders()
	);

	return (
		<Box>
				<Typography variant={"h4"} color={"primary"}>Mes listes</Typography>
			{
				(data && data.payload) && <Typography>{data.payload.folders.length}</Typography>
			}
		</Box>
	);
}