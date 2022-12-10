import React, {useMemo} from "react";
import {Controller} from "react-hook-form";
import {FormHelperText, OutlinedInput, TextField, TextFieldProps} from "@mui/material";

type FormTextFieldProps = TextFieldProps & {
	name: string,
	control: any,
	label: string
}

export const FormTextField = (props: FormTextFieldProps) => {
	const {control, name, label, ...rest} = props;
	const error = useMemo(() => control.getFieldState(name).error,[control.getFieldState(name)]);

	return (
		<Controller
			name={name}
			control={control}
			{...rest}
			render={({field}) => <>
				<OutlinedInput fullWidth={rest.fullWidth}
																					placeholder={label}
																					error={error != null}
																					size={"small"}
																					{...field} />
				<FormHelperText error={error != null}>{error?.message ?? ""}</FormHelperText>
				</>
				}
		/>
	);
}