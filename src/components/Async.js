import { Grid } from "@mui/material";
import * as React from "react";
import Loader from "./Loader";

const sleep = m => new Promise(r => setTimeout(r, m));

export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null,
            };
        }

        async componentDidMount() {
            await sleep(import.meta.env.MODE === "development" ? 150 : 0);

            const { default: component } = await importComponent();

            this.setState({
                component: component,
            });
        }

        render() {
            const C = this.state.component;

            return C ? (
                <C {...this.props} />
            ) : (
                <React.Fragment>
                    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100vw"}>
                        <Loader />
                    </Grid>
                </React.Fragment>
            );
        }
    }

    return AsyncComponent;
}
