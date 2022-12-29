import React from "react";
import {Box, Button, Grid, Paper, Typography, useTheme} from "@mui/material";
import {useAlert} from "../../hooks/useAlert";
import waves from "../../assets/waves.svg";
import {FormTextField} from "../../core/FormTextField";
import {FormTextFieldPassword} from "../../core/FormTextFieldPassword";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SignupPayload} from "../../interface/auth.interface";
import {AuthRepository} from "../../api/repository/AuthRepository";
import * as yup from "yup";
import {authActions} from "../../store/reducer/auth";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";

const schema = yup.object({
	firstname: yup.string().required("Votre prénom est obligatoire"),
	lastname: yup.string().required("Votre nom est obligatoire"),
	email: yup.string().required("L'email est obligatoire"),
	confirmEmail: yup.string().oneOf([yup.ref('email'), null], "Les emails ne correspondent pas")
		.required("L'email est obligatoire"),
	password: yup.string().required("Le mot de passe est obligatoire"),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Les mots de passe ne correspondent pas")
		.required('Le mot de passe est obligatoire')
}).required();

export const Signup = () => {
	const alert = useAlert();
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {control, handleSubmit, formState} = useForm({
		defaultValues: {
			email: '',
			password: '',
			firstname: '',
			lastname: '',
			checkEmail: '',
			checkPassword: ''
		},
		resolver: yupResolver(schema)
	});

	const onSubmit: SubmitHandler<SignupPayload> = (data) => {
		AuthRepository.signup(data).then(resp => {
			const {success, message} = resp;

			if (success) {
				const loginRequest = {
					email: data.email,
					password: data.password
				}
				AuthRepository.login(loginRequest).then(resp => {
					const {success: successLogin, payload: payloadLogin} = resp;

					if (successLogin) {
						const {accessToken, ...user} = payloadLogin;
						dispatch(authActions.setToken(accessToken));
						dispatch(authActions.setUser(user));
						navigate("/");
					}
				});
			} else {
				alert.setError(message);
			}
		});
	}

	return (
		<Box sx={{width: "100%", height: "100%"}}>
			<Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
				{alert.component}
				<Paper elevation={3}
							 sx={{
								 zIndex: 1,
								 height: "75%", width: "75%", backgroundColor: "#fff", borderRadius: 5, display: "flex",
								 boxShadow: `-1minvh 1minvh ${theme.palette.primary.light}`
							 }}>
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "100%"
					}}>
						<Typography variant={"caption"}>Ma Wishlist</Typography>
						<Typography variant={"h4"}>Inscription</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={2} p={5}>
								<Grid item xs={6}>
									<FormTextField name={"firstname"}
																 label={"Prénom"}
																 error={Boolean(formState.errors.email)}
																 fullWidth={true}
																 control={control}/>
								</Grid>
								<Grid item xs={6}>
									<FormTextField name={"lastname"}
																 label={"Nom"}
																 error={Boolean(formState.errors.email)}
																 fullWidth={true}
																 control={control}/>
								</Grid>
								<Grid item xs={6}>
									<FormTextField name={"email"}
																 label={"Email"}
																 error={Boolean(formState.errors.email)}
																 fullWidth={true}
																 control={control}/>
								</Grid>
								<Grid item xs={6}>
									<FormTextField name={"confirmEmail"}
																 label={"Vérifier votre email"}
																 error={Boolean(formState.errors.email)}
																 fullWidth={true}
																 control={control}/>
								</Grid>
								<Grid item xs={6}>
									<FormTextFieldPassword name={"password"}
																				 label={"Mot de passe"}
																				 fullWidth={true}
																				 control={control}/>
								</Grid>
								<Grid item xs={6}>
									<FormTextFieldPassword name={"confirmPassword"}
																				 label={"Vérifier votre mot de passe"}
																				 fullWidth={true}
																				 control={control}/>
								</Grid>
								<Grid container item xs={12} justifyContent={"center"}>
									<Button type={"submit"} variant={"contained"}>
										M'inscrire
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Paper>
			</Box>
			<img src={waves} style={{position: "absolute", bottom: 0}} alt={"waves"}/>
		</Box>
	);
}