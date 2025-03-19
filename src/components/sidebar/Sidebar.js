import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Drawer as MuiDrawer, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { VITE_APP_ORGANIZATION_LOGO_URL } from "../../utils/axiosInstance";
import { displayLocalizeText } from "../../utils/LocalizeText";

const Drawer = styled(MuiDrawer)`
    border-right: 0;
    > div {
        border-right: 0;
    }
`;

const Sidebar = ({ items, isBotsScreen, ...rest }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentPath = pathname;
    const theme = useTheme();

    let currentLocation = window.location.href;
    currentLocation = currentLocation.replace("http://", "");
    currentLocation = currentLocation.replace("https://", "");

    const currentRoute = `/${currentLocation.split("/")[1]}`;

    return (
        <Drawer
            variant='permanent'
            sx={{
                width: "16vw",
                height: "100%",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    position: "relative",
                    width: "16vw",
                    boxSizing: "border-box",
                    background: theme.palette.primary.sideBar,
                },
                background: theme.palette.primary.sideBar,
                backgroundColor: theme.palette.primary.sideBar,
            }}
            direction={"column"}
        >
            <Grid className='sidebar-logo-and-heading-css' sx={{ display: "grid", placeItems: "center" }} paddingX={2} gap={2}>
                <Grid sx={{ display: "grid", placeItems: "center" }}>
                    <Grid>
                        <img src={VITE_APP_ORGANIZATION_LOGO_URL} className="sidebar-logo-img" alt="" />
                    </Grid>
                    {/* <Grid className="sidebar-heading" color={"black"} mt={2} fontWeight={600}>
                        {VITE_APP_SECONDARY_ERP_NAME}
                    </Grid> */}
                </Grid>
            </Grid>
            <Divider orientation='horizontal' variant='middle' sx={{ backgroundColor: `${theme.typography.primary.light}`, marginY: "12px" }} />

            <Grid flex={1} overflow={"auto"}>
                <List className='mt-1' sx={{ padding: "4px" }}>
                    {items.map((item, index) => {
                        return (
                            <>
                                {item.defaultRoute && (
                                    <Card
                                        className='mb-2'
                                        style={{
                                            boxShadow: "none",
                                            backgroundColor:
                                                item.route === currentRoute
                                                    ? `${theme.typography.primary.selectedBackgroundColor}`
                                                    : `${theme.palette.primary.sideBar}`,
                                            color:
                                                item.route === currentPath
                                                    ? `${theme.typography.primary.black}`
                                                    : `${theme.typography.primary.black}`,
                                        }}
                                        key={index}
                                    >
                                        <ListItem
                                            className='mt-2 mb-2'
                                            // selected={item.route === currentPath}
                                            key={item.name}
                                            disablePadding
                                            onClick={() => {
                                                navigate(`${item.route}`);
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    color:
                                                        item.route === currentPath
                                                            ? `${theme.typography.primary.text}`
                                                            : `${theme.typography.primary.black}`,
                                                    ":hover": {
                                                        backgroundColor: "transparent",
                                                        color: `${theme.typography.primary.text}`,
                                                    },
                                                }}
                                            >
                                                <>
                                                    {item.isContainPublicPath ? <img src={item.icon} height={"20px"} alt='' /> : <item.icon />}
                                                    <ListItemText
                                                        className='ml-2'
                                                        primary={
                                                            <Typography
                                                                sx={{
                                                                    fontFamily: `"Inter", sans-serif !important`,
                                                                    color:
                                                                        item.route === currentRoute
                                                                            ? `${theme.typography.primary.iconColor}`
                                                                            : `${theme.typography.primary.dark}`,
                                                                    fontSize: "18px",
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {displayLocalizeText(item.name)}
                                                            </Typography>
                                                        }
                                                    />
                                                </>
                                                {/* )} */}
                                            </ListItemButton>
                                        </ListItem>
                                    </Card>
                                )}
                            </>
                        );
                    })}
                </List>
            </Grid>
            {/* <Grid><SidebarProfile /></Grid> */}
        </Drawer>
    );
};

export default Sidebar;
