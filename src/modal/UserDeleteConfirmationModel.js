import { Dialog, DialogActions } from "@mui/material";
import * as React from "react";
import { PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";

export default function UserConfirmationDeleteModal({ open, handleClose, deleteUser, user }) {
    return (
        <Dialog open={open}>
            <PyramidDialogTitle>{displayLocalizeText("Are you sure you want to Deactivate User?")}</PyramidDialogTitle>

            <DialogActions>
                <PyramidCreateButton onClick={handleClose}>Cancel</PyramidCreateButton>
                <PyramidCreateButton onClick={() => deleteUser(user)}>Deactivate</PyramidCreateButton>
            </DialogActions>
        </Dialog>
    );
}
