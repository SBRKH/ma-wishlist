import React, {useState} from "react";
import {AlertColor} from "@mui/material";
import {Alert} from "../core/Alert";

interface AlertProps {
	open: boolean;
	message: string;
	time: number;
	severity: AlertColor
}

const TIME_DEFAULT = 10000;
const initialState = (): AlertProps => ({open: false, message: "", severity: "error", time: TIME_DEFAULT});

export function useAlert() {
	const [options, setOptions] = useState<AlertProps>(initialState());

	const setError = (message: string, time = TIME_DEFAULT) => {
		setOptions({open: true, message, severity: "error", time});
	}

	const setSuccess = (message: string, time = TIME_DEFAULT) => {
		setOptions({open: true, message, severity: "success", time});
	}

	const setWarning = (message: string, time = TIME_DEFAULT) => {
		setOptions({open: true, message, severity: "warning", time});
	}

	const setInfo = (message: string, time = TIME_DEFAULT) => {
		setOptions({open: true, message, severity: "info", time});
	}

	function handleClose() {
		setOptions(prevOption => ({...prevOption, open: false}));
	}

	return {
		component: <Alert open={options.open}
											severity={options.severity}
											message={options.message}
											onClose={handleClose}
											time={options.time}/>,
		setError,
		setInfo,
		setSuccess,
		setWarning
	};
}