import {Box, Button, Paper, Typography, useTheme} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginPayload} from "../../interface/login.interface";
import {FormTextField} from "../../core/FormTextField";
import {FormTextFieldPassword} from "../../core/FormTextFieldPassword";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useEffect} from "react";
import wallImg from "../../assets/WallLogin.svg"
import wallImg2 from "../../assets/WallLogin2.png"

const schema = yup.object({
	email: yup.string().required("L'email est obligatoire"),
	password: yup.string().required("Le mot de passe est obligatoire"),
}).required();

export const Login = () => {
	const theme = useTheme();
	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		console.log("errors==", errors);
	}, [errors]);

	const onSubmit = (data: LoginPayload) => {
		console.log("data==", data);
	}

	return (
		<Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
			<Paper elevation={3}
						 sx={{height: "75%", width: "75%", backgroundColor: "#fff", borderRadius: 5, display: "flex"}}>
				<Box sx={{
					width: "40%",
					height: "100%",
					padding: 2,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				}}>
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center"
					}}>
						<Typography variant={"caption"}>Ma Wishlist</Typography>
						<Typography variant={"h4"}>Bienvenue</Typography>
					</Box>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box mt={2}>
							<FormTextField name={"email"}
														 label={"Email"}
														 fullWidth={true}
														 control={control}/>
						</Box>
						<Box mt={2}>
							<FormTextFieldPassword name={"password"}
																		 label={"Mot de passe"}
																		 fullWidth={true}
																		 control={control}/>
						</Box>
						<Box mt={2}>
							<Button type={"submit"} variant={"contained"} fullWidth={true}>
								Me connecter
							</Button>
						</Box>
						<Box mt={2}>
							<Button variant={"text"} fullWidth={true}>
								Je n'ai pas de compte
							</Button>
						</Box>
					</form>
				</Box>
				<Box sx={{
					width: "60%",
					height: "100%",
					background: `linear-gradient(38deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
					borderRadius: 5
				}}>
					<Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
						<img
							src={wallImg2}
							alt={'pictogram'}
							width={500}
						/>
						<Typography color={"secondary"} variant={"h5"}>Avoir une liste d'envie n'a jamais été aussi simple...</Typography>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}