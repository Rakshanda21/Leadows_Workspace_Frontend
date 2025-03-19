import { CircularProgress } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setLoginData } from "../../store/workspaceSlice";
import { defaultRouteBasedOnUserType, isAccessible } from "../../utils/accessControl";
import axiosInstance from "../../utils/axiosInstance";
import { logger } from "../../utils/logger";
import { getErrorMessage } from "../Layout";

// For routes that can only be accessed by authenticated team members
function AuthGuard ({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const location = useLocation();

    const servePage = async () => {
        const defaultErrorRoute = "/";
        const defaultHomeRoute = "/my-users";
        try {
            const serverResponse = await axiosInstance.get(`authenticate`);

            if (serverResponse.status === 200) {
                dispatch(setLoginData(serverResponse.data.loggedInUser));
                if (isAccessible(location.pathname, serverResponse.data.loggedInUser)) {
                    if (location.pathname === "/" || location.pathname === "") {
                        const defaultRoute = defaultRouteBasedOnUserType(serverResponse.data.loggedInUser, defaultErrorRoute, defaultHomeRoute);
                        navigate(defaultRoute);
                    }
                } else {
                    navigate("/unauthorized");
                }
            } else {
                navigate(defaultErrorRoute);
            }
        } catch (error) {
            navigate(defaultErrorRoute);
            logger.clientLog(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        async function work () {
            await servePage();
        }
        work()
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage({ error, dispatch, navigate });
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <React.Fragment>
                <CircularProgress />
            </React.Fragment>
        );
    }

    return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
