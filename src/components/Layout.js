import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Avatar, Box, CssBaseline, Grid, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppHeading } from "../theme/styleComponent";
import { navListBasedOnUserType } from "../utils/accessControl";
import { currentDir, displayLocalizeText } from "../utils/LocalizeText";
import { UserProfileColors } from "../utils/userProfileColors";
import Sidebar from "./sidebar/Sidebar";
import SnackbarMessage from "./Snackbar";
import { SecondaryERPIcon } from "./svgComponent/IconComponent";
import { VITE_APP_ORGANIZATION_LOGO_URL, VITE_APP_ORGANIZATION_NAME } from "../utils/axiosInstance";
import ProfileModal from "../modal/ProfileModal";
import { showSnackbar } from "../store/snackbarSlice";

const Root = styled.div`
    display: flex;
    min-height: 100vh;
`;

const AppContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    height: 100vh;
    justify-content: space-between;
`;

export function getErrorMessage ({ error, dispatch, navigate }) {
    let statusCode = 500;
    let errorMessage = error?.message ? error.message : error.response.data;

    if (error.status) {
        statusCode = error.status;
    }

    if (error.response && error.response.status) {
        statusCode = error.response.status;
    }

    if (error.response && error.response.data) {
        if (typeof error.response.data == "string") {
            errorMessage = error.response.data;
        } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.response.statusText) {
            errorMessage = error.response.statusText;
        }
    }

    dispatch(showSnackbar({ open: true, severity: "error", message: errorMessage }));

    if ([401].includes(statusCode)) {
        navigate("/");
    }

    return;
}

export default function Layout ({ children }) {
    const state = useSelector(state => state.workspaceStore);
    const navListBasedOnUserRole = navListBasedOnUserType(state.userDetails);
    const theme = useTheme();
    const [showMenuItemModal, setShowMenuItemModal] = useState(false);

    const handleProfileOnClick = () => {
        setShowMenuItemModal(true);
    };
    const handleProfileClose = () => {
        setShowMenuItemModal(false);
    };

    return (
        <Root className='background-color-class' dir={currentDir}>
            <CssBaseline />

            <Grid container direction={"row"}>
                <Grid height={"100vh"}>
                    <Box position={"relative"} sx={{ height: "100vh" }}>
                        <Sidebar
                            PaperProps={{ style: { width: 100 } }}
                            variant=''
                            open={false}
                            onClose={() => {}}
                            items={navListBasedOnUserRole}
                            isBotsScreen={true}
                        />
                    </Box>
                </Grid>
                <Grid height={"100vh"} flex={1} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} pr={1}>
                    <AppContent>
                        <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Grid item md={8} display={"flex"} alignItems={"center"} gap={1}>
                                <Grid>{<SecondaryERPIcon />}</Grid>
                                <AppHeading sx={{ marginTop: "10px" }}>&nbsp;{displayLocalizeText(VITE_APP_ORGANIZATION_NAME)}</AppHeading>
                            </Grid>

                            <Grid item md={2} pr={1} display={"flex"} justifyContent={"end"}>
                                <Grid display={"flex"} justifyContent={"space-between"}>
                                    {/* <Grid mt={2} mr={2}>
                                        <img src={VITE_APP_ORGANIZATION_LOGO_URL} height={"40px"} alt='' />
                                    </Grid> */}
                                    <Grid>
                                        <IconButton onClick={handleProfileOnClick} sx={{ backgroundColor: theme.typography.primary.light }}>
                                            <Tooltip title={state?.userDetails?.email}>
                                                <Avatar
                                                    sx={{
                                                        color: theme.typography.primary.black,
                                                        backgroundColor:
                                                            UserProfileColors[
                                                                state.userDetails?.email ? state.userDetails.email[0].toUpperCase() : ""
                                                            ],
                                                        border: `1px solid ${theme.palette.primary.borderColor}`,
                                                    }}
                                                >
                                                    {state?.userDetails?.email ? state.userDetails.email[0].toUpperCase() : ""}
                                                </Avatar>
                                            </Tooltip>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid flex={1} pt={1} overflow={"auto"} sx={{ overflowY: "hidden" }}>
                            {children}
                            <Outlet />
                        </Grid>
                    </AppContent>
                </Grid>
            </Grid>
            <SnackbarMessage />
            {showMenuItemModal && <ProfileModal open={showMenuItemModal} handleClose={handleProfileClose} />}
        </Root>
    );
}
