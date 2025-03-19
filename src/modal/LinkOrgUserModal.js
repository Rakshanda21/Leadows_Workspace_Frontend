/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton } from "@mui/material";
import * as React from "react";
import { useState } from "react";

import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../store/snackbarSlice";
import { setAllOrgUsers } from "../store/ssoSlice";
import { PyramidOkButton } from "../theme/styleComponent";
import axiosInstance from "../utils/axiosInstance";
import { displayLocalizeText } from "../utils/LocalizeText";
import { logger } from "../utils/logger";
import { errorMessage } from "../utils/getErrorMessage";

export default function LinkOrgUsers ({ setLinkOrgSupport, node, getPyramidData }) {
    const state = useSelector(store => store.workspaceStore);
    const [updateOrgUser, setUpdateOrgUser] = useState(node.org_users ?? {});
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleOnChange = (e, obj) => {
        if (e.target.checked) {
            const userId = obj.id;
            const userEmail = obj.email;
            const newUserObject = { ...updateOrgUser, [userId]: userEmail };
            setUpdateOrgUser(newUserObject);
        } else {
            const newUserObject = {};
            const userId = obj.id;
            Object.keys(updateOrgUser).forEach(key => {
                if (key !== userId) {
                    newUserObject[key] = updateOrgUser[key];
                }
            });
            setUpdateOrgUser(newUserObject);
        }
    };

    const linkOrgUser = async () => {
        const payloadData = {
            unit_id: node.id,
            fieldsToUpdate: {
                org_users: updateOrgUser,
            },
        };
        try {
            await axiosInstance.post(`/pyramid/update-unit`, { ...payloadData });
            await getPyramidData();
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "success",
                    message: "Changes Saved Successfully!",
                }),
            );
            setLinkOrgSupport(false);
        } catch (error) {
            logger.clientLog(error);
            const message = errorMessage(error);
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "error",
                    message: message.errorMessage,
                }),
            );
        }
    };

    const getAllOrganizationUsers = async userId => {
        try {
            const response = await axiosInstance.get(`/users/org`);

            dispatch(setAllOrgUsers(response.data.data));
        } catch (error) {
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "error",
                    message: error.response.data ? error.response.data.reason : error.response.statusText,
                }),
            );
        }
    };

    useEffect(() => {
        async function work () {
            await getAllOrganizationUsers();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: "error",
                        message: error.response?.data ? error.response?.data : error.response?.statusText,
                    }),
                );
            });
    }, []);

    return (
        <Dialog open={true} fullWidth width='100%'>
            <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid sx={{ fontSize: "1.8rem", color: theme.palette.primary.main, fontFamily: `"Poppins", sans-serif !important` }}>
                    Link Org Users to {node.unit_name}
                </Grid>
                <IconButton
                    variant='secondary'
                    onClick={() => {
                        setLinkOrgSupport(false);
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {state.allOrganizationUsers.map((row, index) => (
                    <Grid>
                        <FormControlLabel
                            key={`${index}`}
                            control={<Checkbox />}
                            label={row.email}
                            checked={updateOrgUser[row.id]}
                            onChange={e => {
                                handleOnChange(e, row);
                            }}
                        />
                    </Grid>
                ))}
            </DialogContent>
            <DialogActions>
                <PyramidOkButton onClick={linkOrgUser}>{displayLocalizeText("Save Changes")}</PyramidOkButton>
            </DialogActions>
        </Dialog>
    );
}
