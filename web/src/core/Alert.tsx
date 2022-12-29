import React from "react";
import MuiAlert, {AlertProps as MuiAlertProps} from '@mui/material/Alert';
import {IconButton, Portal, Snackbar, SnackbarOrigin} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface AlertProps extends MuiAlertProps {
	open: boolean,
	position?: SnackbarOrigin;
	time: number,
	onClose: (event: Event | React.SyntheticEvent<any, any>) => void,
	message: string,
}

export const Alert = (props: AlertProps) => {
	const {open, position = {vertical: "top", horizontal: "center"}, time, severity, onClose, message, ...rest} = props;
	return (
		<Portal>
			<Snackbar open={open} anchorOrigin={position} autoHideDuration={time} onClose={onClose}>
				<MuiAlert elevation={6} variant="filled" severity={severity} {...rest} action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={onClose}>
						<CloseIcon fontSize="inherit"/>
					</IconButton>}>
					{message}
				</MuiAlert>
			</Snackbar>
		</Portal>
	)
}