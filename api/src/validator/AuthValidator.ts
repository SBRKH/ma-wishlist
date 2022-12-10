import User from "../database/models/Users";

export const authSignupValidator = ({
	firstname: {
		notEmpty: true,
		errorMessage: "Le prénom est obligatoire"
	},
	lastname: {
		notEmpty: true,
		errorMessage: "Le nom de famille est obligatoire"
	},
	password: {
		isStrongPassword: {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1
		},
		errorMessage: "Le mot de passe doit comporter au moins une lettre majuscule, une minuscule, un chiffre et au moins 8 caractères.",
	},
	email: {
		custom: {
			options: (value: string) => User.find({email: value})
				.then(user => {
					if (user.length > 0) {
						return Promise.reject("L'email est déjà utilisé.");
					}
				})
		}
	}
});

export const authLoginValidator = ({
	password: {
		notEmpty: true,
		errorMessage: "Le mot de passe est obligatoire"
	},
	email: {
		notEmpty: true,
		errorMessage: "L'email est obligatoire",
		custom: {
			options: (value: string) => User.find({email: value})
				.then(user => {
					if (user.length === 0) {
						return Promise.reject("Vérifier vos identifiants.");
					}
				})
		}
	}
});