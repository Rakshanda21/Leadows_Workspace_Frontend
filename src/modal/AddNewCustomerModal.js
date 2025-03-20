import { Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice";
import { PyramidCancelButton, PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";

export default function AddNewCustomerModal ({ open, handleClose, createNewCustomer }) {
    const state = useSelector(store => store.workspaceStore);

    const [customerDetails, setCustomerDetails] = useState({
       customerName:""
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...customerDetails, [name]: value };

        setCustomerDetails(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (customerDetails.customerName === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Role Name" }));
            return;
        }

        await createNewCustomer({ ...customerDetails });
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <PyramidDialogTitle>{displayLocalizeText("Add New Customer")}</PyramidDialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Customer Name' name='role' type='text' onChange={handleDetails}></TextField>
                </Grid>
            </DialogContent>

            <DialogActions>
                <PyramidCancelButton onClick={handleClose}>{displayLocalizeText("Cancel")}</PyramidCancelButton>
                <PyramidCreateButton onClick={onClickSubmitDetails}>{displayLocalizeText("Add")}</PyramidCreateButton>
            </DialogActions>
        </Dialog>
    );
}
