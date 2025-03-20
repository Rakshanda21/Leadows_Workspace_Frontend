import { Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice";
import { PyramidCancelButton, PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";
import { ORGID } from "../utils/axiosInstance";

export default function AddNewDepartmentModal ({ open, handleClose, createNewDepartment }) {
    const state = useSelector(store => store.workspaceStore);

    const [departmentDetails, setCreateDepartmentDetails] = useState({
        orgId: ORGID,
        departmentName: "",
        // location: "",
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};
        objectToChange = { ...departmentDetails, [name]: value };
        setCreateDepartmentDetails(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (departmentDetails.departmentName === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Branch Name" }));
            return;
        }

        setCreateDepartmentDetails({ ...departmentDetails, createdBy: state.userDetails.email });
        await createNewDepartment({ ...departmentDetails, createdBy: state.userDetails.email });
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <PyramidDialogTitle>{displayLocalizeText("Add New Department")}</PyramidDialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField
                        fullWidth
                        size='small'
                        label='Enter Department Name'
                        name='departmentName'
                        type='text'
                        onChange={handleDetails}
                    ></TextField>
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
