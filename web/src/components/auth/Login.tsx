import React from "react";
import {Box, Button, Paper, Typography, useTheme} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginPayload} from "../../interface/auth.interface";
import {FormTextField} from "../../core/FormTextField";
import {FormTextFieldPassword} from "../../core/FormTextFieldPassword";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {authActions} from "../../store/reducer/auth";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {useAlert} from "../../hooks/useAlert";
import {AuthRepository} from "../../api/repository/AuthRepository";

const schema = yup.object({
	email: yup.string().required("L'email est obligatoire"),
	password: yup.string().required("Le mot de passe est obligatoire"),
}).required();

export const Login = () => {
	const alert = useAlert();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const {control, handleSubmit, formState} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema)
	});

	const onSubmit: SubmitHandler<LoginPayload> = (data) => {
		AuthRepository.login(data).then(resp => {
			const {success, payload, message} = resp;

			if (success) {
				const {accessToken, ...user} = payload;
				dispatch(authActions.setToken(accessToken));
				dispatch(authActions.setUser(user));
				navigate("/");
			} else {
				alert.setError(message);
			}
		});
	}

	function handleOnClickSignup() {
		navigate('/signup');
	}

	return (
		<Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
			{alert.component}
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
														 error={Boolean(formState.errors.email)}
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
							<Button variant={"text"} fullWidth={true} onClick={handleOnClickSignup}>
								Je n'ai pas de compte
							</Button>
						</Box>
					</form>
				</Box>
				<Box sx={{
					width: "60%",
					height: "100%",
					background: `linear-gradient(38deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
					borderRadius: 5,
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
						<Box sx={{ width: "30vh", height: "30vh" }}>
							<Box sx={{
								borderRadius: `30% 70% 70% 30% / 30% 30% 70% 70%`,
								width: "100%",
								height: "100%",
								backgroundColor: theme.palette.secondary.main,
								boxShadow: '-10vmin 10vmin #ffffff12'
							}}/>
						</Box>
						<Typography color={"secondary"} variant={"h6"}>Avoir une liste d'envie n'a jamais été aussi
							simple...</Typography>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}