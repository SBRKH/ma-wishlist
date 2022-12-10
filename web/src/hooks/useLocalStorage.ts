import { useState } from "react";

type LocalStorageValue = string | unknown

export const useLocalStorage = (keyName: string, defaultValue: LocalStorageValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.localStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value);
			} else {
				if (typeof defaultValue === "string") {
					window.localStorage.setItem(keyName, defaultValue);
				} else {
					window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
				}
				return defaultValue;
			}
		} catch (err) {
			return defaultValue;
		}
	});
	const setValue = (newValue: LocalStorageValue) => {
		try {
			window.localStorage.setItem(keyName, typeof newValue === "string" ? newValue : JSON.stringify(newValue));
		} catch (err) {}
		setStoredValue(newValue);
	};
	return [storedValue, setValue];
};