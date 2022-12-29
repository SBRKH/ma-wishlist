import React from "react";
import {MainRoutes} from "../core/router/MainRoutes";
import {CssBaseline, Paper} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useUser} from "../hooks/useUser";
import {MainAppBar} from "../core/MainAppBar";

export const Main = () => {
	const user = useUser();
	const theme = createTheme({
		palette: {
			primary: {
				main: "#114447",
				light: "#406f72",
				dark: "#001d20"
			},
			secondary: {
				main: "#faf0e6",
				dark: "#c7beb4",
				light: "#ffffff"
			}
		},
		components: {
			MuiOutlinedInput: {
				styleOverrides: {
					notchedOutline: {
						borderColor: "#406f72",
					}
				}
			},
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none"
					},
				}
			}
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Paper sx={{
				display: 'flex',
				height: '100vh',
				backgroundColor: "#f3f3f3",
				overflow: 'hidden',
				position: 'relative',
			}}>
				{user && <MainAppBar />}
				<MainRoutes/>
			</Paper>
		</ThemeProvider>
	);
}