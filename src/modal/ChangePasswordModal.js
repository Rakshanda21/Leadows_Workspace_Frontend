import {
    Close,
    VisibilityOffOutlined,
    VisibilityOffRounded,
  } from "@mui/icons-material";
  import {
    CircularProgress,
    Dialog,
    DialogContent,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
  } from "@mui/material";
  import * as React from "react";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { showSnackbar } from "../store/snackbarSlice";
  import { PyramidCreateButton } from "../theme/styleComponent";
  import axiosInstance from "../utils/axiosInstance";
  import { getErrorMessage } from "../components/Layout";
  import { useNavigate } from "react-router-dom";
  
  export default function ChangePasswordModal({
    open,
    handleCloseChangePassword,
  }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((store) => store.ssoStore);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleChange = async (event) => {
      switch (event.target.name) {
        case "password":
          setPassword(event.target.value);
          break;
        case "confirmPassword":
          setConfirmPassword(event.target.value);
          break;
        default:
          break;
      }
    };
  
    const handleClickShowNewPassword = () => {
      setShowNewPassword((show) => !show);
    };
  
    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword((show) => !show);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleChangePassword = async () => {
      if (password === "" && confirmPassword === "") {
        setErrorMessage("Please enter password ");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }
      setErrorMessage("");
      setIsLoading(true);
      try {
        const response = await axiosInstance.put(`/users/change-password`, {
          userId: state.userData.id,
          password: password,
        });
        setIsLoading(false);
        handleCloseChangePassword();
        dispatch(
          showSnackbar({
            open: true,
            severity: "success",
            message: "Password changed successfully!",
          })
        );
      } catch (error) {
        setIsLoading(false);
        handleCloseChangePassword();
              getErrorMessage({ error, dispatch, navigate })
        
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={handleCloseChangePassword}
        hideBackdrop
        PaperProps={{
          style: {
            position: "fixed",
            top: 78,
            right: 20,
            margin: 0,
            padding: 0,
            width: "25%",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        }}
        sx={{ overflow: "hidden !important" }}
      >
        <DialogContent>
          <Grid
            alignItems="center"
            display={"flex"}
            justifyContent="space-between"
          ></Grid>
          <Grid display={"flex"} justifyContent={"flex-end"}>
            <IconButton onClick={handleCloseChangePassword}>
              <Close />
            </IconButton>
          </Grid>
          <Grid>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Update Password
            </Typography>
            <Typography component="h2" variant="body1" align="center">
              Enter your new password and confirm it to reset your password
            </Typography>
          </Grid>
          <Grid
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            mt={4}
          >
            <FormControl fullWidth variant="outlined" error={!!errorMessage}>
              <InputLabel htmlFor="password">New Password</InputLabel>
              <OutlinedInput
                type={showNewPassword ? "text" : "password"}
                name="password"
                label="New Password"
                value={password}
                fullWidth
                onChange={handleChange}
                my={3}
                inputProps={{
                  autocomplete: "new-password",
                  form: {
                    autocomplete: "off",
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOffRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth variant="outlined" error={!!errorMessage}>
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <OutlinedInput
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                fullWidth
                onChange={handleChange}
                my={3}
                inputProps={{
                  autocomplete: "new-password",
                  form: {
                    autocomplete: "off",
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOffRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
            </FormControl>
  
            <PyramidCreateButton
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={isLoading ? null : handleChangePassword}
            >
              {isLoading ? <CircularProgress /> : "Change Password"}
            </PyramidCreateButton>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  