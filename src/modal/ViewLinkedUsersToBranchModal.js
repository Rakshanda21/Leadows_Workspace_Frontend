import { Close } from "@mui/icons-material";
import { Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, IconButton } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/Layout";
import { PyramidDialogTitle, PyramidOkButton } from "../theme/styleComponent";
import axiosInstance from "../utils/axiosInstance";

export default function ViewLinkedUsersToBranchModal ({ open, handleClose, branchDetails }) {
    const state = useSelector(store => store.ssoStore);

    const [updateLinkUser, setUpdateLinkUser] = useState([]);
    const [previousLinkedUser, setPreviousLinkedUser] = useState([]);
    const [LinkedUsersToBranchDetails, setLinkedUsersToBranchDetails] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e, user) => {
        const userId = user.id;
        const email = user.email;
        const users = {
            userId,
            email,
            extras: {},
        };
        let newUserObject = [...updateLinkUser];
        let linkedUsers = [...previousLinkedUser];
        let usersToLink = [];
        if (e.target.checked) {
            newUserObject.push(users);
        } else {
            newUserObject = newUserObject.filter(user => user.userId !== userId);
            linkedUsers = linkedUsers.filter(user => user !== userId);
            usersToLink = [...newUserObject, linkedUsers];
        }
        setUpdateLinkUser(newUserObject);
        setPreviousLinkedUser(linkedUsers);
    };

    const getUsersByUnitId = async () => {
        try {
            const response = await axiosInstance.get(`/unit-with-user/get-all-users-by-unit-id`, { params: { unitId: branchDetails.id } });
            const updatedArray = response.data.map(user => {
                return user.userId;
            });
            setPreviousLinkedUser(updatedArray);
            setUpdateLinkUser(response.data);
        } catch (error) {
            logger.clientLog(error);
        }
    };

    const isChecked = id => {
        let userIds = updateLinkUser.map(user => {
            return user.userId;
        });

        return userIds.includes(id);
    };

    const getAllLinkedUsersByBranchId = async () => {
        try {
            const response = await axiosInstance.get(`/users/get-all-linked-users-to-branch`, { params: { branchId: branchDetails.id } });
            setLinkedUsersToBranchDetails(response.data);
            const updatedArray = response.data.map(user => {
              return user.userId
            })
            setPreviousLinkedUser(updatedArray)
            setUpdateLinkUser(response.data)
        } catch (error) {
            getErrorMessage({ error, dispatch, navigate });
        }
    };

    useEffect(() => {
        async function work () {
            await getAllLinkedUsersByBranchId();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage({ error, dispatch, navigate });
            });
    }, []);

    return (
        <>
            <Dialog open={open} fullWidth width='100%'>
                <PyramidDialogTitle display={"flex"} justifyContent={"space-between"}>
                    <Grid>Link Users to {branchDetails.branchName}</Grid>
                    <IconButton variant='secondary' onClick={handleClose}>
                        <Close />
                    </IconButton>
                </PyramidDialogTitle>
                {LinkedUsersToBranchDetails.length > 0 && (
                    <DialogContent>
                        {LinkedUsersToBranchDetails &&
                            LinkedUsersToBranchDetails.length > 0 &&
                            LinkedUsersToBranchDetails.map((user, index) => (
                                <Grid key={user.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isChecked(user.id) || previousLinkedUser.includes(user.id)}
                                                onChange={e => handleOnChange(e, user)}
                                            />
                                        }
                                        label={user.email}
                                    />
                                </Grid>
                            ))}
                    </DialogContent>
                )}
                <DialogActions>
                    <PyramidOkButton>Save Changes</PyramidOkButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
