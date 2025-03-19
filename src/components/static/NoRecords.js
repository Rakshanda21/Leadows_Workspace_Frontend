import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { displayLocalizeText } from "../../utils/LocalizeText";

export default function NoRecords () {
    return (
        <Grid sx={{ width: "100% !important" }} className='no-records'>
            <InboxOutlinedIcon fontSize='large' />
            <Typography variant='h3'>{displayLocalizeText("No records found")}</Typography>
        </Grid>
    );
}
