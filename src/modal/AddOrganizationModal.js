import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Alert, Dialog, DialogActions, DialogContent, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useState } from "react";
import { displayLocalizeText } from "../utils/LocalizeText";

export default function AddOrganizationModal({ open, handleClose, onCreateOrganization }) {
    const [showPassword, setShowPassword] = useState(false);

    const [snackBar, setSnackBar] = useState({
        show: false,
        snackBarMessage: "",
    });

    const [createOrgDetails, setCreateOrgDetails] = useState({
        organizationName: "",
        email: "",
        phone: "",
        password: "",
        user_type: "OrgAdmin",
        registry_admin_id: sessionStorage.getItem("email"),
    });

    const handleDetails = event => {
        const { name, value } = event.target;
        let objectToChange = {};

        objectToChange = { ...createOrgDetails, [name]: value };

        setCreateOrgDetails(objectToChange);
    };

    const onClickSubmitDetails = async () => {
        if (createOrgDetails.organizationName === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter Org Name!" });
            return;
        }

        if (createOrgDetails.email === "") {
            setSnackBar({ show: true, snackBarMessage: "Please Enter Email!" });
            return;
        }

        if (createOrgDetails.phone === "") {
            setSnackBar({ show: true, snackBarMessage: "Enter Your Phone Number" });
            return;
        }
        if (createOrgDetails.password === "") {
            setSnackBar({
                show: true,
                snackBarMessage: "Password length must contain 8 character!",
            });
            return;
        }

        await onCreateOrganization(createOrgDetails);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} PaperProps={{ style: { width: "30%" } }}>
            <DialogContent
                variant={5}
                className="text-center font-weight-bold "
                style={{
                    fontSize: "22px",
                    color: "#1e3a8a",
                    fontWeight: "900px",
                }}
            >
                Add Organization
            </DialogContent>

            <DialogContent>
                <Grid mt={1}>
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        label="Enter Organization Name"
                        name="organizationName"
                        onChange={handleDetails}
                    ></TextField>
                </Grid>

                <Grid mt={3}>
                    <TextField fullWidth size="small" label="Enter Email" name="email" type="email" onChange={handleDetails}></TextField>
                </Grid>

                <Grid mt={3}>
                    <TextField
                        fullWidth
                        label="Enter password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        style={{ fontSize: "18px" }}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleDetails}
                    />
                </Grid>

                <Grid mt={3}>
                    <TextField fullWidth size="small" label="Enter phone Number" name="phone" onChange={handleDetails}></TextField>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={onClickSubmitDetails} size="small">
                    {displayLocalizeText("Register")}
                </Button>
                <Button onClick={handleClose} size="small">
                    {displayLocalizeText("Cancel")}
                </Button>
            </DialogActions>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackBar.show}
                autoHideDuration={3000}
                onClose={() => {
                    setSnackBar({ show: false, snackBarMessage: "" });
                }}
            >
                <Alert severity="error">{snackBar.snackBarMessage}</Alert>
            </Snackbar>
        </Dialog>
    );
}
