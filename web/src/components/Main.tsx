import React from "react";
import {AuthProvider} from "../hooks/useAuth";
import {MainRoutes} from "../router/MainRoutes";
import {Box, CssBaseline, Paper} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

export const Main = () => {
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
			MuiOutlinedInput:{
				styleOverrides:{
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
			<AuthProvider>
				<CssBaseline />
				<Paper sx={{
					display: 'flex',
					height: '100vh',
					backgroundColor: "#f3f3f3",
					overflow: 'hidden',
					position: 'relative',
					}}>
						<MainRoutes />
				</Paper>
			</AuthProvider>
		</ThemeProvider>
	);
}