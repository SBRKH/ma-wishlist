import React, {useMemo, useState} from "react";
import {Controller} from "react-hook-form";
import {
	IconButton,
	InputAdornment,
	InputBaseProps,
	OutlinedInput,
	Tooltip
} from "@mui/material";
import {Error, Visibility, VisibilityOff} from "@mui/icons-material";

type FormTextFieldProps = InputBaseProps & {
	name: string,
	control: any,
	label: string
}

export const FormTextFieldPassword = (props: FormTextFieldProps) => {
	const {control, name, label, ...rest} = props;
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const error = useMemo(() => control.getFieldState(name).error, [control.getFieldState(name), control, name]);

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Controller
			name={name}
			control={control}
			{...rest}
			render={({field}) => <OutlinedInput placeholder={label}
																						error={error != null}
																						type={showPassword ? 'text' : 'password'}
																						fullWidth={rest.fullWidth}
																						size={"small"}
																						endAdornment={
																							<InputAdornment position="end">
																								<IconButton
																									onClick={handleClickShowPassword}
																									onMouseDown={handleMouseDownPassword}
																									edge="end">
																									{showPassword ? <VisibilityOff/> : <Visibility/>}
																								</IconButton>
																								{
																									error?.message &&
                                                    <Tooltip title={error.message}>
																												<Error color={"error"} sx={{marginLeft: 1}}/>
																										</Tooltip>
																								}
																							</InputAdornment>
																						}
																						{...field} />
			}
		/>
	);
}