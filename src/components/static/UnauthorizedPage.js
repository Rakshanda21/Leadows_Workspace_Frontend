import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { displayLocalizeText } from "../../utils/LocalizeText";
export default function UnauthorizedPage() {
    const navigate = useNavigate();

    const backToHomePage = () => {
        navigate("/");
    };

    return (
        <React.Fragment>
            <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center" }}>
                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={5}>
                    <Typography variant="h4">{displayLocalizeText("This Page is not Accessible")}</Typography>

                    <Grid>
                        <Button variant="contained" onClick={backToHomePage}>
                            {displayLocalizeText("Back to Home Page")}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
