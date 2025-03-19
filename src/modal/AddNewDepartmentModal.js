import { Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PyramidCancelButton, PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";
import { ownerAddUserRoles, subRolesForUsers } from "../utils/roles";
import { showSnackbar } from "../store/snackbarSlice";

export default function AddNewDepartmentModal ({ open, handleClose, createSecondaryERPUser }) {
    const state = useSelector(store => store.workspaceStore);

    const [departmentDetails, setCreateDepartmentDetails] = useState({
        branchName: "",
        location: "",
    });

    const handleDetails = event => {
        const { name, value } = event.target;

        let selectedValue = value;
        switch (name) {
            case "userRole":
                selectedValue = ownerAddUserRoles[value];
                break;
            case "userSubRole":
                selectedValue = subRolesForUsers[value];
                break;
            default:
                break;
        }
        let objectToChange = {};

        objectToChange = { ...departmentDetails, [name]: selectedValue };

        setCreateDepartmentDetails(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (departmentDetails.departmentName === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Branch Name" }));
            return;
        }
        // if (departmentDetails.location === "") {
        //     dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Location" }));
        //     return;
        // }

        setCreateDepartmentDetails({ ...departmentDetails, createdBy: state.userDetails.email });
        await createSecondaryERPUser({ ...departmentDetails, createdBy: state.userDetails.email });
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <PyramidDialogTitle>{displayLocalizeText("Add New Department")}</PyramidDialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Department Name' name='branchName' type='text' onChange={handleDetails}></TextField>
                </Grid>
                {/* <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Location' name='location' type='text' onChange={handleDetails}></TextField>
                </Grid> */}
            </DialogContent>

            <DialogActions>
                <PyramidCancelButton onClick={handleClose}>{displayLocalizeText("Cancel")}</PyramidCancelButton>
                <PyramidCreateButton onClick={onClickSubmitDetails}>{displayLocalizeText("Add")}</PyramidCreateButton>
            </DialogActions>
        </Dialog>
    );
}
