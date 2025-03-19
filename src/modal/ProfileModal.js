import { Avatar, Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CardHeadingBold, PyramidCreateButton, PyramidLoggedInUserInfo } from "../theme/styleComponent";
import axiosInstance from "../utils/axiosInstance";
import { displayLocalizeText } from "../utils/LocalizeText";
import { DisplayNameForPyramidUserRole } from "../utils/UserRoles";
import { UserProfileColors } from "../utils/userProfileColors";

export default function ProfileModal ({ open, handleClose }) {
    const state = useSelector(store => store.workspaceStore);
    const theme = useTheme();
    let userRole = DisplayNameForPyramidUserRole[state.userDetails.userRole];
    const navigate = useNavigate();

    const handleLogOut = async () => {
        window.localStorage.setItem("timerEndTime", "");
        const serverResponse = await axiosInstance.post(`/logout`, { userDetails: state.userDetails });
        if (serverResponse.status === 200) {
            navigate("/");
        }
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            hideBackdrop
            PaperProps={{
                style: {
                    position: "fixed",
                    top: 65,
                    right: 20,
                    margin: 0,
                    padding: 0,
                    width: "25%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
            }}
            sx={{ overflow: "hidden !important" }}
        >
            <DialogContent>
                <Grid container alignItems='center' justifyContent='space-between' pb={2}>
                    <Grid item xs>
                        <Grid container justifyContent='center'>
                            <PyramidLoggedInUserInfo>{state.userDetails?.email}</PyramidLoggedInUserInfo>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid display='flex' flexDirection='column' alignItems='center'>
                    <Avatar
                        sx={{
                            color: theme.typography.primary.black,
                            backgroundColor: UserProfileColors[state.userDetails ? state.userDetails.email[0].toUpperCase() : ""],
                            border: `1px solid ${theme.palette.primary.borderColor}`,
                            width: 60,
                            height: 60,
                        }}
                    >
                        {state.userDetails ? state.userDetails.email[0].toUpperCase() : ""}
                    </Avatar>
                    <CardHeadingBold mt={2}>Hi, {state.userDetails.firstName}</CardHeadingBold>
                    <Grid mt={1}>{displayLocalizeText(userRole)}</Grid>

                    <Grid mt={4}>
                        <PyramidCreateButton onClick={handleLogOut}>Sign Out</PyramidCreateButton>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
