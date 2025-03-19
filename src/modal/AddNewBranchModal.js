import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PyramidCancelButton, PyramidCreateButton, PyramidDialogTitle } from "../theme/styleComponent";
import { displayLocalizeText } from "../utils/LocalizeText";
import { ownerAddUserRoles, subRolesForUsers } from "../utils/roles";
import { useEffect } from "react";
import { getErrorMessage } from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axiosInstance, { ORGID } from "../utils/axiosInstance";
import { setAllOrgUsersDetails } from "../store/workspaceSlice";
import { showSnackbar } from "../store/snackbarSlice";

export default function AddNewBranchModal ({ open, handleClose, createBranch }) {
    const state = useSelector(store => store.workspaceStore);
    const [createBranchDetails, setCreateBranchDetails] = useState({
        orgId:ORGID,
        branchName: "",
        location: "",
        users: [],
    });
    const [linkUsersToBranch, setLinkUsersToBranch] = useState([]);
    const [linkUsersToBranchPayload, setLinkUsersToBranchPayload] = useState([]);
    // const [allUsersDetails, setAllUsersDetails] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        objectToChange = { ...createBranchDetails, [name]: selectedValue };

        setCreateBranchDetails(objectToChange);
    };

    let newUserObject = [];
    let newUserObjectPayload = [];

    const onChangeSelectUser = (e, user) => {
        newUserObject = [...linkUsersToBranch];
        newUserObjectPayload = [...linkUsersToBranchPayload];
        const userId = user.id;
        const email = user.email;

    //     let payload = {
    //         userId,
    //         // email,
    //    };

        if (e.target.checked) {
            newUserObject.push(email);
            newUserObjectPayload.push(userId);
        } else {
            newUserObject = newUserObject.filter(user => user !== email);
            newUserObjectPayload = newUserObjectPayload.filter(userObj => userObj !== payload);
        }

        setLinkUsersToBranch(newUserObject);
        setLinkUsersToBranchPayload(newUserObjectPayload);
    };

    const getAllOrgUsers = async () => {
        try {
            const response = await axiosInstance.get(`/users/get-all-org-users`, { params: { orgId: ORGID } });
            dispatch(setAllOrgUsersDetails(response.data.users));
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const onClickSubmitDetails = async () => {
        if (createBranchDetails.branchName === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Branch Name" }));
            return;
        }

        if (createBranchDetails.location === "") {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please Enter Location" }));
            return;
        }

        if (linkUsersToBranch.length <= 0) {
            dispatch(showSnackbar({ open: true, severity: "error", message: "Please select at least one user" }));
            return;
        }

        setCreateBranchDetails({ ...createBranchDetails, createdBy: state.userDetails.email });

        const branchDetails = {
            ...createBranchDetails,
            users: linkUsersToBranchPayload,
        };

        createBranch(branchDetails);
    };

    useEffect(() => {
        async function work () {
            await getAllOrgUsers();
        }
        work()
            .then(() => {})
            .catch(error => {
                getErrorMessage({ error, dispatch, navigate });
            });
    }, []);

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <PyramidDialogTitle>{displayLocalizeText("Add New Branch")}</PyramidDialogTitle>
            <DialogContent>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Branch Name' name='branchName' type='text' onChange={handleDetails}></TextField>
                </Grid>
                <Grid mt={2}>
                    <TextField fullWidth size='small' label='Enter Location' name='location' type='text' onChange={handleDetails}></TextField>
                </Grid>

                <FormControl size='small' fullWidth sx={{ marginTop: "15px" }}>
                    <InputLabel id='demo-multiple-name-label'>{displayLocalizeText("Add Users")}</InputLabel>
                    <Select
                        labelId='demo-multiple-name-label'
                        id='demo-multiple-name'
                        multiple
                        value={linkUsersToBranch}
                        onChange={onChangeSelectUser}
                        input={<OutlinedInput label='Add Users' />}
                        renderValue={() => linkUsersToBranch.join(", ")}
                    >
                        {state.allOrgUsersDetails.map(row => (
                            <MenuItem value={row.email}>
                                <Checkbox
                                    checked={linkUsersToBranch.includes(row.email)}
                                    onChange={e => {
                                        onChangeSelectUser(e, row);
                                    }}
                                    inputProps={{ "aria-label": "controlled" }}
                                />

                                {row.email}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <PyramidCancelButton onClick={handleClose}>{displayLocalizeText("Cancel")}</PyramidCancelButton>
                <PyramidCreateButton onClick={onClickSubmitDetails}>{displayLocalizeText("Add")}</PyramidCreateButton>
            </DialogActions>
        </Dialog>
    );
}
