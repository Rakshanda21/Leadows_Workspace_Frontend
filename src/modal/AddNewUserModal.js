import { Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice";
import { PyramidCancelButton, PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";
import { ownerAddUserRoles } from "../utils/roles";

export default function AddNewUserModal ({ open, handleClose, createOrganizationUser }) {
    const state = useSelector(store => store.workspaceStore);
    const dispatch = useDispatch();

    const [createUserDetails, setCreateUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userRole: "",
        userSubRole: null,
        phone: "",
        designation: "",
        createdBy: "",
    });

    const handleDetails = event => {
        const { name, value } = event.target;

        let selectedValue = value;
        switch (name) {
            case "userRole":
                selectedValue = ownerAddUserRoles[value];
                break;
            // case "userSubRole":
            //     selectedValue = subRolesForUsers[value];
            //     break;
            default:
                break;
        }
        let objectToChange = {};

        objectToChange = { ...createUserDetails, [name]: selectedValue };

        setCreateUserDetails(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (createUserDetails.firstName === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter First Name" }));
            return;
        }
        if (createUserDetails.lastName === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Last Name" }));
            return;
        }
        if (createUserDetails.email === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Email" }));
            return;
        }
        if (createUserDetails.phone === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Phone Number" }));
            return;
        }

        if (createUserDetails.userRole === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter User Role" }));
            return;
        }

        // if (createUserDetails.userRole === "SECONDARY_ERP_USER" && (createUserDetails.userSubRole == null || createUserDetails.userSubRole == "")) {
        //     dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Sub Role" }));
        //     return;
        // }
        setCreateUserDetails({ ...createUserDetails, createdBy: state.userDetails.email });
        await createOrganizationUser({ ...createUserDetails, createdBy: state.userDetails.email });
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <PyramidDialogTitle>{displayLocalizeText("Add New User")}</PyramidDialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter First Name' name='firstName' type='text' onChange={handleDetails}></TextField>
                </Grid>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Last Name' name='lastName' type='text' onChange={handleDetails}></TextField>
                </Grid>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Email' name='email' type='email' onChange={handleDetails}></TextField>
                </Grid>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Phone Number' name='phone' type='text' onChange={handleDetails}></TextField>
                </Grid>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Designation' name='designation' type='text' onChange={handleDetails}></TextField>
                </Grid>

                <Grid mt={2}>
                    <InputLabel
                        className='billing-form'
                        style={{
                            marginRight: "20px",
                        }}
                    >
                        {displayLocalizeText("Roles :")}&nbsp;&nbsp;
                    </InputLabel>
                    <FormControl size='small' fullWidth>
                        <Select
                            id='userRole'
                            name='userRole'
                            labelId='demo-simple-select-label'
                            onChange={e => {
                                handleDetails(e);
                            }}
                        >
                            {ownerAddUserRoles.map((item, key) => (
                                <MenuItem key={key} value={key} sx={{ display: "grid", placeItems: "center", fontSize: "0.8rem" }}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* {createUser.userRole !== "SECONDARY_ERP_ADMIN" && (
                    <Grid mt={2}>
                        <InputLabel
                            className='billing-form'
                            style={{
                                marginRight: "20px",
                            }}
                        >
                            {displayLocalizeText("Sub Role :")}&nbsp;&nbsp;
                        </InputLabel>
                        <FormControl size='small' fullWidth>
                            <Select id='userSubRole' name='userSubRole' labelId='demo-simple-select-label' onChange={e => handleDetails(e)}>
                                {subRolesForUsers.map((item, key) => (
                                    <MenuItem key={key} value={key} sx={{ display: "grid", placeItems: "center", fontSize: "0.8rem" }}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )} */}
            </DialogContent>

            <DialogActions>
                <PyramidCancelButton onClick={handleClose}>{displayLocalizeText("Cancel")}</PyramidCancelButton>
                <PyramidCreateButton onClick={onClickSubmitDetails}>{displayLocalizeText("Add")}</PyramidCreateButton>
            </DialogActions>
        </Dialog>
    );
}
