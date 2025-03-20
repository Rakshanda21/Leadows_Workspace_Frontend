import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import * as React from "react";
import { PyramidCancelButton, PyramidOkButton, SectionHeading } from "../theme/styleComponent";

export default function UserConfirmationRestoreModal({ open, handleClose, restoreUser, user }) {
    return (
        <Dialog open={open}>
            <DialogTitle>
                <SectionHeading>Are you sure you want to Restore?</SectionHeading>
            </DialogTitle>

            <DialogActions>
                <PyramidCancelButton onClick={handleClose}>Cancel</PyramidCancelButton>
                <PyramidOkButton onClick={() => restoreUser(user)}>Restore</PyramidOkButton>
            </DialogActions>
        </Dialog>
    );
}
