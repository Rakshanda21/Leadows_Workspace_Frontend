import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React from "react";

const Root = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    min-height: 100%;
`;

function Loader({ size = 40 }) {
    return (
        <Root>
            <CircularProgress color="secondary" size={size} />
        </Root>
    );
}

export default Loader;
