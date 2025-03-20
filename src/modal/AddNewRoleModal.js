import { Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice";
import { PyramidCancelButton, PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";

export default function AddNewRoleModal ({ open, handleClose, createRoles }) {
    const state = useSelector(store => store.workspaceStore);

    const [roleDetails, setRoleDetails] = useState({
       role:""
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...roleDetails, [name]: value };

        setRoleDetails(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (roleDetails.role === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Role Name" }));
            return;
        }

        // setCreateDepartmentDetails({ ...departmentDetails, createdBy: state.userDetails.email });
        await createRoles({ ...roleDetails });
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <PyramidDialogTitle>{displayLocalizeText("Add New Role")}</PyramidDialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Role Name' name='role' type='text' onChange={handleDetails}></TextField>
                </Grid>
            </DialogContent>

            <DialogActions>
                <PyramidCancelButton onClick={handleClose}>{displayLocalizeText("Cancel")}</PyramidCancelButton>
                <PyramidCreateButton onClick={onClickSubmitDetails}>{displayLocalizeText("Add")}</PyramidCreateButton>
            </DialogActions>
        </Dialog>
    );
}
