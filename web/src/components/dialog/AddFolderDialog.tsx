import React, {useState} from "react";
import {
	Dialog,
	DialogActions,
	Button,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Slide,
	TextField
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import {WishesRepository} from "../../api/repository/WishesRepository";

interface Props {
	open: boolean,
	onClose: () => void,
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const AddFolderDialog = (props: Props) => {
	const {open, onClose} = props;
	const [folderName, setFolderName] = useState<string>("");

	function handeOnSave() {
		WishesRepository.addFolder(folderName).then(resp => {
			console.log("resp==", resp);
		});
	}

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFolderName(e.target.value);
	}

	return (
		<Dialog open={open} onClose={onClose} TransitionComponent={Transition} fullWidth={true} maxWidth={"sm"}>
			<DialogTitle sx={{m: 0, p: 2}}>
				Ajouter un dossier
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme: any) => theme.palette.grey[500],
					}}
				>
					<CloseIcon/>
				</IconButton>
			</DialogTitle>

			<DialogContent>
				<DialogContentText>
					Merci de préciser le nom de votre nouvelle liste.
				</DialogContentText>
				<TextField autoFocus margin={"dense"} name={"name"} label={"Nom"}
									 onChange={handleOnChange} value={folderName}
									 fullWidth variant={"outlined"} size={"small"} sx={{marginTop: 2}}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Annuler</Button>
				<Button onClick={handeOnSave}>Enregistrer</Button>
			</DialogActions>
		</Dialog>
	)
}