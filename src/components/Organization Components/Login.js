import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Grid, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../store/snackbarSlice";
import axiosInstance, { ORGID, VITE_APP_ORGANIZATION_LOGO_URL, VITE_APP_ORGANIZATION_NAME } from "../../utils/axiosInstance";
import SnackbarMessage from "../Snackbar";
import { setLoginData } from "../../store/workspaceSlice";
import { getErrorMessage } from "../Layout";

export default function LogIn () {
    const [showPassword, setShowPassword] = useState();
    const [userLoginCredentials, setUserLoginCredentials] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeLoginDetails = event => {
        const { name, value } = event.target;
        setUserLoginCredentials({ ...userLoginCredentials, [name]: value });
    };

    const handleOnClickLogIn = async () => {
        try {
            const response = await axiosInstance.post("/login", {
                email: userLoginCredentials.email,
                password: userLoginCredentials.password,
                orgId: ORGID,
            });
            dispatch(setLoginData(response.data));
            navigate(`/validate`);
        } catch (error) {
            getErrorMessage({ error, dispatch, navigate });
        }
    };

    const inputStyle = {
        // color: "#fff !important",
        // input: {
        //     "input:-webkit-autofill:active ": {},
        //     "-webkit-box-shadow": "0 0 0 30px #152336 inset !important",
        //     "-webkit-text-fill-color": `${theme.typography.primary.light}`,
        // },
        // "& .MuiOutlinedInput-root": {
        //     "&>fieldset": {
        //         borderColor: `${theme.typography.primary.light}`,
        //     },
        //     "&:hover fieldset": {
        //         borderColor: `${theme.typography.primary.light}`,
        //     },
        //     "&:focus-within fieldset": {
        //         borderColor: `${theme.typography.primary.light}`,
        //         // backgroundColor: `${theme.palette.primary.main}`,
        //     },
        // },
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setUserLoginCredentials({ ...userLoginCredentials, [name]: value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <>
            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh" }}>
                <Grid className='login-page-logo-heading' item>
                    <img className='login-page-logo' src={VITE_APP_ORGANIZATION_LOGO_URL} />
                    <Grid mt={2}>{VITE_APP_ORGANIZATION_NAME}</Grid>
                </Grid>
                <Grid>
                    <Card sx={{ padding: "20px" }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            onChange={handleChangeLoginDetails}
                            value={userLoginCredentials.email}
                            sx={inputStyle}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type={showPassword ? "text" : "password"}
                            id='password'
                            autoComplete='current-password'
                            onChange={handleChangeLoginDetails}
                            value={userLoginCredentials.password}
                            sx={inputStyle}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            // className='login-page-icon-button'
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                            size='large'
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                autoComplete: "new-password",
                                form: {
                                    autoComplete: "off",
                                },
                            }}
                        />
                        <Grid mt={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Button fullWidth variant='contained' onClick={handleOnClickLogIn}>
                                Log In
                            </Button>
                        </Grid>
                        {showSnackbar && <SnackbarMessage open={showSnackbar.open} severity={showSnackbar.severity} message={showSnackbar.message} />}
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
