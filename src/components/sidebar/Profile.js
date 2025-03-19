import { useTheme } from "@emotion/react";
import { Logout, Person } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { displayLocalizeText } from "../../utils/LocalizeText";

export default function SidebarProfile () {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = anchorEl;
    const navigate = useNavigate();
    const theme = useTheme();
    const state = useSelector(store => store.workspaceStore);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        const serverResponse = await axiosInstance.post(`/logout`, { userDetails: state.userDetails });
        if (serverResponse.status === 200) {
            // window.location.href = `${REACT_APP_SSO_SERVER_URL}/login`;
            navigate("/");
        }
    };

    return (
        <Grid
            height={"70px"}
            sx={{
                paddingX: "2px",
                backgroundColor: theme.palette.primary.sideBar,
                borderRadius: "5px",
            }}
        >
            <Grid className='sidebar-grid' gap={2}>
                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
                    <Grid className='ml-2 sidebar-user-logo' paddingX={2}>
                        <Person sx={{ color: "black" }} />
                    </Grid>
                    <Grid style={{ color: "black" }}>{displayLocalizeText("User")}</Grid>
                </Grid>
                <Grid justifySelf={"flex-end"}>
                    <MoreVertIcon
                        id='basic-button'
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        color='inherit'
                        sx={{ cursor: "pointer" }}
                    />
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleLogOut} style={{ color: theme.palette.primary.main }}>
                            <Logout style={{ color: "red" }} fontSize='small' />
                            &nbsp;&nbsp; {displayLocalizeText("Log out")}
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Grid>
    );
}
