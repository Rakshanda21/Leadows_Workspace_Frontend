import { Close } from "@mui/icons-material";
import { Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, IconButton } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/Layout";
import { showSnackbar } from "../store/snackbarSlice";
import { PyramidDialogTitle, PyramidOkButton } from "../theme/styleComponent";
import axiosInstance from "../utils/axiosInstance";

export default function LinkUserToDepartmentInBranchModal ({ open, handleClose, departmentDetails ,branchDetails}) {
    const state = useSelector(store => store.workspaceStore);
    const [allUsersDetails, setAllUsersDetails] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e, userId) => {
        const checked = e.target.checked;
        setAllUsersDetails(prevUsers => prevUsers.map(user => (user.id === userId ? { ...user, isLinked: checked } : user)));
    };

    const getAllLinkedUsersByDepartmentId = async () => {
        try {
            const response = await axiosInstance.get(`/users-with-department/get-all-linked-users-to-department-in-branch`, {
                params: { departmentId: departmentDetails.id,branchId:branchDetails.id },
            });
            setAllUsersDetails(response.data);
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const OnClickLinkUsersToDepartmentInBranch = async () => {
        try {
            await axiosInstance.post(`/users-with-department/link-users-to-department-in-branch`, {
                branchId:branchDetails.id,
                departmentId: departmentDetails.id,
                linkOrUnlinkUsersToDepartmentInBranch: allUsersDetails,
            });
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "success",
                    message: "Users Linked Successfully",
                }),
            );
            handleClose();
        } catch (error) {
            handleClose();
            logger.clientLog(error);
            getErrorMessage({ error, dispatch, navigate });
        }
    };

    
    useEffect(() => {
        async function work () {
            // await getAllUsers();
            await getAllLinkedUsersByDepartmentId();
        }
        work()
            .then(() => {})
            .catch(error => {
                getErrorMessage({ error, dispatch, navigate });
            });
    }, []);

    return (
            <Dialog open={open} onClose={handleClose}  PaperProps={{ style: { width: "30%", height: "50%" } }}>
                <PyramidDialogTitle display={"flex"} justifyContent={"space-between"}>
                    <Grid>Link Users to {departmentDetails.departmentName}</Grid>
                    <IconButton variant='secondary' onClick={handleClose}>
                        <Close />
                    </IconButton>
                </PyramidDialogTitle>
                {allUsersDetails.length > 0 && (
                    <DialogContent>
                        {allUsersDetails &&
                            allUsersDetails.length > 0 &&
                            allUsersDetails.map((user, index) => (
                                <Grid key={user.id}>
                                    <FormControlLabel
                                        control={<Checkbox checked={Boolean(user.isLinked)} onChange={e => handleOnChange(e, user.id)} />}
                                        label={user.email}
                                    />
                                </Grid>
                            ))}
                    </DialogContent>
                )}
                <DialogActions>
                    <PyramidOkButton onClick={OnClickLinkUsersToDepartmentInBranch}>Save Changes</PyramidOkButton>
                </DialogActions>
            </Dialog>
    );
}
