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

export default function ViewLinkedDepartmentToBranchModal ({ open, handleClose, branchDetails }) {
    const state = useSelector(store => store.workspaceStore);
    const [allDepartmentDetails, setAllDepartmentDetails] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e, userId) => {
        const checked = e.target.checked;
        setAllDepartmentDetails(prevUsers => prevUsers.map(user => (user.id === userId ? { ...user, isLinked: checked } : user)));
    };

    const getAllLinkedUsersByDepartmentId = async () => {
        try {
            const response = await axiosInstance.get(`/departments-with-branch/get-all-linked-departments-by-branch-id`, {
                params: { branchId: branchDetails.id },
            });
            setAllDepartmentDetails(response.data);
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const OnClickLinkUsersToDepartment = async () => {
        try {
            await axiosInstance.post(`/departments-with-branch/link-departments-to-branch`, {
                branchId: branchDetails.id,
                linkOrUnlinkDepartmentToBranch: allDepartmentDetails,
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
        <>
            <Dialog open={open} fullWidth width='100%'>
                <PyramidDialogTitle display={"flex"} justifyContent={"space-between"}>
                    <Grid>Link Department to {branchDetails.branchName}</Grid>
                    <IconButton variant='secondary' onClick={handleClose}>
                        <Close />
                    </IconButton>
                </PyramidDialogTitle>
                {allDepartmentDetails.length > 0 && (
                    <DialogContent>
                        {allDepartmentDetails &&
                            allDepartmentDetails.length > 0 &&
                            allDepartmentDetails.map((department, index) => (
                                <Grid key={department.id}>
                                    <FormControlLabel
                                        control={<Checkbox checked={Boolean(department.isLinked)} onChange={e => handleOnChange(e, department.id)} />}
                                        label={department.departmentName}
                                    />
                                </Grid>
                            ))}
                    </DialogContent>
                )}
                <DialogActions>
                    <PyramidOkButton onClick={OnClickLinkUsersToDepartment}>Save Changes</PyramidOkButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
