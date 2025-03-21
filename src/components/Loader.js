import styled from "@emotion/styled";
import React from "react";
import { HashLoader, PropagateLoader, RingLoader } from "react-spinners";

const Root = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    min-height: 100%;
`;

function Loader({ size = 40 }) {
    return (
        <Root>
            <RingLoader size={size} />
        </Root>
    );
}

export default Loader;
