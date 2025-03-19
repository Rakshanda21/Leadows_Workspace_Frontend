import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoginData } from "../../store/workspaceSlice";
import { CardHeading, PyramidCreateButton, PyramidPage, PyramidTextField } from "../../theme/styleComponent";
import axiosInstance, { VITE_APP_ORGANIZATION_LOGO_URL } from "../../utils/axiosInstance";
import { logger } from "../../utils/logger";
import { DisplayNameForPyramidUserRole, PyramidUserRole } from "../../utils/UserRoles";
import { getErrorMessage } from "../Layout";

export default function LoginProcessingPage () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(store => store.workspaceStore);

    const verifyUserByAuthCode = async (authCode, domain) => {
        try {
            const response = await axiosInstance.get("/registry-user/validate-user-by-auth-code", {
                params: { authCode, domain },
                withCredentials: true,
            });

            dispatch(setLoginData(response.data.user));
            // dispatch(setToken(response.data.token));
        } catch (error) {
            logger.clientLog(error);
            getErrorMessage({ error, dispatch, navigate });
            navigate("/login");
        }
    };

    const handleProceedClick = async () => {
        switch (state.userDetails.userRole) {
            case PyramidUserRole.ORG_OWNER:
                navigate("/users");
                break;
            case PyramidUserRole.ORG_ADMIN:
                navigate("/billing-units");
                break;
            case PyramidUserRole.ORG_USER:
                // const unitsOfUser = await axiosInstance.get(`/user/get-units-of-user`, {
                //   params: { userId: state.userDetails.id },
                // });
                navigate("/unit-login");
                // if (unitsOfUser.data.isAssignToConsumerUnit) {
                //   navigate("/unit-login");
                //   break;
                // }
                // if (unitsOfUser.data.isAssignToMonitoringUnit) {
                //   navigate("/monitoring-unit-login");
                //   break;
                // }
                break;
            default:
                navigate("/login");
                break;
        }
    };

    useEffect(() => {
        async function work () {
            // dispatch(
            //     setRegistryDetails({
            //         registryName: VITE_APP_ORGANIZATION_NAME,
            //         registryLogo: VITE_APP_ORGANIZATION_LOGO_URL,
            //     }),
            // );
            const queryParams = new URLSearchParams(window.location.search);
            const authCode = queryParams.get("authCode");
            const domain = queryParams.get("domain");
            if (authCode) {
                await verifyUserByAuthCode(authCode, domain);
            }
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage({ error, dispatch, navigate });
            });
    }, []);
    return (
        <PyramidPage>
            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={5}>
                <Grid item md={0.4} mt={2}>
                    <img src={VITE_APP_ORGANIZATION_LOGO_URL} width={"100%"} className='mainpage-logo-img' alt='' />
                </Grid>

                <CardHeading>
                    Welcome&nbsp;
                    <span style={{ fontWeight: 600 }}>{state.userDetails.email} &nbsp;</span>
                    {/* <span>{displayLocalizeText("IsLoggedInSuccessfullyAs")}&nbsp;</span> */}
                    <span style={{ fontWeight: 600 }}> [{DisplayNameForPyramidUserRole[state.userDetails.userRole]}]</span>
                </CardHeading>
                <Grid>
                    <PyramidTextField placeholder='Enter OTP'></PyramidTextField>
                </Grid>
                <Grid>
                    <PyramidCreateButton onClick={handleProceedClick}>Proceed &nbsp;</PyramidCreateButton>
                </Grid>
            </Grid>
        </PyramidPage>
    );
}
