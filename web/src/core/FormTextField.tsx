import React, { useMemo} from "react";
import {Control, Controller, UseControllerProps} from "react-hook-form";
import {InputBaseProps, OutlinedInput, Tooltip} from "@mui/material";
import {Error} from "@mui/icons-material";

type FormTextFieldProps = InputBaseProps & Omit<UseControllerProps, 'control'> & {
	name: string,
	label: string,
	control: Control<any>,
}

export const FormTextField = (props: FormTextFieldProps) => {
	const {control, name, label, rules, ...rest} = props;
	const error = useMemo(() => control.getFieldState(name).error, [control.getFieldState(name), control, name]);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			{...rest}
			render={({field}) => <OutlinedInput fullWidth={rest.fullWidth}
																					placeholder={label}
																					error={Boolean(error)}
																					size={"small"}
																					endAdornment={error?.message ?
																						<Tooltip title={error.message}><Error
																							color={"error"}/></Tooltip> : rest.endAdornment}
																					{...field} />
			}
		/>
	);
}