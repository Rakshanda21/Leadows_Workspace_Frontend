import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayLocalizeText } from "../../utils/LocalizeText";
import { showSnackbar } from "../../store/snackbarSlice";
import SnackbarMessage from "../Snackbar";

export default function NetworkError () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickRetry = () => {
        if (navigator.onLine) {
            navigate("/my-apps");
        } else {
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "error",
                    message: "Please Connect to the Internet",
                }),
            );
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center" }}>
                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={5}>
                    <Typography variant='h4'>{displayLocalizeText("Please Connect to the internet")}</Typography>

                    <Grid>
                        <Button variant='contained' onClick={onClickRetry}>
                            {displayLocalizeText("Retry")}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <SnackbarMessage />
        </React.Fragment>
    );
}
