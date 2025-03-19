import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Avatar, Grid, IconButton, Paper, Table, TableBody, TableFooter, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewUserModal from "../../modal/AddNewUserModal";
import { showSnackbar } from "../../store/snackbarSlice";
import {
    CardHeadingBold,
    MetaDataText,
    PyramidCardParent,
    PyramidCreateButton,
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../../theme/styleComponent";
import axiosInstance, { ORGID } from "../../utils/axiosInstance";
import { errorMessage } from "../../utils/getErrorMessage";
import { displayLocalizeText } from "../../utils/LocalizeText";
import { logger } from "../../utils/logger";
import { UserProfileColors } from "../../utils/userProfileColors";
import { DisplayNameForPyramidSubUserRole, DisplayNameForPyramidUserRole, PyramidUserRole } from "../../utils/UserRoles";
import { getErrorMessage } from "../Layout";
import { setAllUsersDetails } from "../../store/workspaceSlice";
import { SideBarUserIcons } from "../svgComponent/IconComponent";

export default function MyUsers () {
    const state = useSelector(store => store.workspaceStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [openUserModal, setOpenUserModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchByName, setSearchByName] = useState("");
    const [userRole, setUserRole] = useState([]);
    const [userSubRole, setUserSubRole] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [status, setStatus] = useState(["ACTIVE", "INACTIVE"]);
    const [openTechSupportUserModal, setOpenTechSupportUserModal] = useState(false);
    const [techSupportUsers, setTechSupportUsers] = useState([]);

    const [userToDelete, setUserToDelete] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [value, setValue] = useState("MY_USERS");
    const [restoreModal, setRestoreModal] = useState({
        open: false,
        data: "",
    });
    const [openEditUserModal, setOpenEditUserModal] = useState({
        open: false,
        data: "",
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalCount, setTotalCount] = useState();

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(`/users/get-all`, { params: { orgId: ORGID } });
            dispatch(setAllUsersDetails(response.data.users));
            setTotalCount(response.data.totalCount);
            setShowFilterModal(false);
            setTriggerFetch(false);
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const createOrganizationUser = async userDetails => {
        try {
            await axiosInstance.post("/users/create-org-user", userDetails);
            await getAllUsers();
            setOpenUserModal(false);
            dispatch(showSnackbar({ open: true, severity: "success", message: "User Created Successfully" }));
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const handleOnClickAddUser = () => {
        setOpenUserModal(true);
    };

    const handleOnClickFilter = () => {
        setShowFilterModal(true);
    };

    const onCloseFilterModal = async () => {
        setUserSubRole([]);
        setSearchByName("");
        setUserRole([]);
        setStatus(["ACTIVE", "INACTIVE"]);
        setTriggerFetch(true);
        setShowFilterModal(false);
        await getAllUsers();
    };

    const handleOnClickAddTechSupportUser = () => {
        setOpenTechSupportUserModal(true);
    };

    const handleOnClickDelete = user => {
        setUserToDelete(user);
        setOpenDeleteModal(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event, rows) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const deleteUser = async () => {
        try {
            if (userToDelete) {
                await axiosInstance.put(`/user/delete-secondary-user-by-id`, {
                    userId: userToDelete.id,
                });
                getAllUsers();
                setUserToDelete(null);
                setOpenDeleteModal(false);
            }
            setUserToDelete();
        } catch (error) {
            // logger.clientLog(error);
            const message = errorMessage(error);
            if (message.statusCode === 401) {
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: "error",
                        message: "Please Login Again",
                    }),
                );
                navigate("/");
            } else {
                dispatch(
                    showSnackbar({
                        open: true,
                        severity: "error",
                        message: message.errorMessage,
                    }),
                );
            }
        }
    };

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const handleOnClickRestore = user => {
        setRestoreModal({ open: true, data: user });
    };

    const restoreUser = async () => {
        try {
            if (restoreModal.data) {
                await axiosInstance.put(`/user/reactivate`, {
                    userId: restoreModal.data.id,
                });
                await getAllUsers();
                setRestoreModal({ open: false, data: "" });
            }
            setRestoreModal({ open: false, data: "" });
        } catch (error) {
            setRestoreModal({ open: false, data: "" });
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const handleCloseRestoreModal = () => {
        setRestoreModal({ open: false, data: "" });
    };

    const handleOnClickEditUser = user => {
        setOpenEditUserModal({ open: true, data: user });
    };

    const handleCloseEditUserModal = () => {
        setOpenEditUserModal({ open: false, data: "" });
    };

    const editOrganizationUser = async updateOrgUserDetails => {
        try {
            await axiosInstance.put("/user/update", updateOrgUserDetails, {
                params: {
                    userId: openEditUserModal.data.id,
                },
            });
            await getAllUsers();
            setOpenEditUserModal({ open: false, data: "" });
            dispatch(showSnackbar({ open: true, severity: "success", message: "User Updated Successfully" }));
        } catch (error) {
            logger.clientLog(error);
            getErrorMessage(error, dispatch, navigate);
        }
    };

    useEffect(() => {
        async function work () {
            await getAllUsers();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage(error, dispatch, navigate);
            });
    }, [page, rowsPerPage, triggerFetch]);

    return (
        <PyramidCardParent>
            <Grid>
                <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid display={"flex"} alignItems={"center"}>
                        <SideBarUserIcons />
                        <CardHeadingBold>&nbsp;&nbsp;{displayLocalizeText("Users")}</CardHeadingBold>
                    </Grid>
                    <Grid display={"flex"} gap={2}>
                        {value === "MY_USERS" && (
                            <Grid display={"flex"} gap={1}>
                                {/* <Grid>
                                    <PyramidCreateButton onClick={() => handleOnClickFilter()}>
                                        <FilterAltIcon /> &nbsp;{displayLocalizeText("Filter")}
                                    </PyramidCreateButton>
                                </Grid> */}
                                <PyramidCreateButton onClick={() => handleOnClickAddUser()}>
                                    <Add /> &nbsp; {displayLocalizeText("New User")}
                                </PyramidCreateButton>
                            </Grid>
                        )}
                        {value === "TECH_SUPPORT_USER" && (
                            <PyramidCreateButton onClick={() => handleOnClickAddTechSupportUser()}>
                                <Add /> &nbsp; {displayLocalizeText("External User")} &nbsp;
                            </PyramidCreateButton>
                        )}
                    </Grid>
                </Grid>

                <Grid style={{ width: "100%" }} mt={3}>
                    <Grid style={{ width: "100%" }}>
                        <PyramidTableContainer
                            component={Paper}
                            className='table-container table-container-css'
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "300px",
                            }}
                        >
                            <Table className='center' aria-label='table with sticky header' stickyHeader>
                                <TableHead className='p-3 mb-2 row'>
                                    <TableRow>
                                        <StyledTableCell className='tableHeaderFont'></StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>Name</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Username")}</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Phone Number")}</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Role")}</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Sub Role")}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.allUsersDetails.length > 0 &&
                                        state.allUsersDetails.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell className='tableContentFont'>
                                                    <Avatar
                                                        sx={{
                                                            color: theme.typography.primary.black,
                                                            backgroundColor:
                                                                row.status === "ACTIVE"
                                                                    ? UserProfileColors[row.firstName[0].toUpperCase()]
                                                                    : theme.palette.primary.inActive,

                                                            border: `1px solid ${theme.palette.primary.borderColor}`,
                                                        }}
                                                    >
                                                        {row.firstName[0].toUpperCase()}
                                                    </Avatar>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {row.firstName} {row.lastName}
                                                </StyledTableCell>
                                                <StyledTableCell className='tableContentFont'>
                                                    <Grid>
                                                        <Grid mb={1}>{row.email}</Grid>
                                                        <MetaDataText>
                                                            {row.status === "INACTIVE" ? (
                                                                <>Deactivated by: {row.deactivatedBy}</>
                                                            ) : (
                                                                <>Created by: {row.createdBy}</>
                                                            )}
                                                        </MetaDataText>
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell className='tableContentFont'>{row.phone}</StyledTableCell>
                                                <StyledTableCell className='tableContentFont'>
                                                    {displayLocalizeText(DisplayNameForPyramidUserRole[row.userRole])}
                                                </StyledTableCell>
                                                <StyledTableCell className='tableContentFont'>
                                                    {displayLocalizeText(DisplayNameForPyramidSubUserRole[row.userSubRole])}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <Grid container justifyContent='flex-end' sx={{ padding: "8px 16px" }}>
                                <TableFooter>
                                    <TablePagination
                                        component='div'
                                        count={totalCount}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                        sx={{ "& p": { marginTop: "auto" } }}
                                    />
                                </TableFooter>
                            </Grid>
                        </PyramidTableContainer>
                    </Grid>

                    {/* {value === "TECH_SUPPORT_USER" && <TechSupportUserComponent techSupportUsers={techSupportUsers} />} */}
                </Grid>

                {/* {userToDelete && (
                    <UserConfirmationDeleteModal open={openDeleteModal} handleClose={() => setOpenDeleteModal(false)} deleteUser={deleteUser} />
                )} */}
                {/* 
                {restoreModal.open && (
                    <UserConfirmationRestoreModal open={restoreModal.open} handleClose={handleCloseRestoreModal} restoreUser={restoreUser} />
                )} */}

                {openUserModal && (
                    <AddNewUserModal
                        open={openUserModal}
                        handleClose={() => setOpenUserModal(false)}
                        createOrganizationUser={createOrganizationUser}
                    />
                )}

                {/* {openEditUserModal.open && (
                    <EditUserModal
                        open={openEditUserModal.open}
                        handleClose={handleCloseEditUserModal}
                        editOrganizationUser={editOrganizationUser}
                        userDetails={openEditUserModal.data}
                    />
                )} */}

                {/* {showFilterModal && (
                    <UserFilterModal
                        open={showFilterModal}
                        handleClose={onCloseFilterModal}
                        getUsers={getAllSecondaryERPUsers}
                        setSearchByName={setSearchByName}
                        setUserRole={setUserRole}
                        setUserSubRole={setUserSubRole}
                        userSubRole={userSubRole}
                        userRole={userRole}
                        searchByName={searchByName}
                        status={status}
                        setStatus={setStatus}
                    />
                )} */}
            </Grid>
        </PyramidCardParent>
    );
}
