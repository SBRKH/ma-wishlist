import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {ElevationScroll} from "./ElevationScroll";
import {useUser} from "../hooks/useUser";
import {useNavigate} from "react-router-dom";

export const MainAppBar = () => {
	const user = useUser();
	const navigate = useNavigate();

	function handleOnClickList() {
		navigate('/home');
	}

	function handleOnClickProfile() {
		navigate('/profile');
	}

	return (
		<ElevationScroll>
			<AppBar color={"primary"}>
				<Toolbar>
					<Typography variant="h6" component="div">
						Ma wishlist
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box>
						<Button variant={"text"} color={"secondary"} onClick={handleOnClickList}>
							Mes listes
						</Button>
						<Button variant={"text"} color={"secondary"} onClick={handleOnClickProfile}>
							{user.firstname}
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	)
}