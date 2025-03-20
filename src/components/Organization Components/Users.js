import { Add, AddCircle } from "@mui/icons-material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Avatar, Grid, IconButton, Paper, Table, TableBody, TableFooter, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewUserModal from "../../modal/AddNewUserModal";
import UserConfirmationDeleteModal from "../../modal/UserDeleteConfirmationModel";
import { showSnackbar } from "../../store/snackbarSlice";
import { setAllUsersDetails } from "../../store/workspaceSlice";
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
import { displayLocalizeText } from "../../utils/LocalizeText";
import { logger } from "../../utils/logger";
import { UserProfileColors } from "../../utils/userProfileColors";
import { DisplayNameForPyramidSubUserRole, DisplayNameForPyramidUserRole, LeadowsUserRoles } from "../../utils/UserRoles";
import { getErrorMessage } from "../Layout";
import { SideBarUserIcons } from "../svgComponent/IconComponent";
import UserConfirmationRestoreModal from "../../modal/UserRestoreConfirmationModel";

export default function MyUsers() {
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
    const [openDeleteModal, setOpenDeleteModal] = useState({
        open: false,
        user: "",
    });
    const [value, setValue] = useState("MY_USERS");
    const [restoreUserModal, setRestoreUserModal] = useState({
        open: false,
        user: "",
    });
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
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
            const response = await axiosInstance.get(`/users/get-all`, {
                params: {
                    orgId: ORGID,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    searchByName: searchByName,
                    userRole: userRole,
                    userSubRole: userSubRole,
                    status: status,
                },
            });
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

    const handleOnClickAddTechSupportUser = () => {
        setOpenTechSupportUserModal(true);
    };

    const handleOnClickDelete = user => {
        setOpenDeleteModal({
            open: true,
            user: user,
        });
    };
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal({
            open: false,
            user: "",
        });
    };
    const deleteUser = async user => {
        try {
            await axiosInstance.put(`/users/deactive-org-user-by-id`, {
                userId: user.id,
            });
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "success",
                    message: "User Deleted SuccessFully",
                }),
            );
            handleCloseDeleteModal();
            await getAllUsers();
        } catch (error) {
            logger.clientLog(error);
            getErrorMessage({ error, dispatch, navigate });

            handleCloseDeleteModal();
        }
    };

    const handleOnClickRestore = row => {
        setRestoreUserModal({
            open: true,
            user: row,
        });
    };
    const handleCloseRestoreModal = row => {
        setRestoreUserModal({
            open: false,
            user: "",
        });
    };

    const restoreUser = async user => {
        try {
            await axiosInstance.put(`/users/reactivate-org-user`, { userId: user.id });
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "success",
                    message: "User Restored Successfully",
                }),
            );
            handleCloseRestoreModal();
            await getAllUsers();
        } catch (error) {
            logger.clientLog(error);
            getErrorMessage({ error, dispatch, navigate });

            handleCloseRestoreModal();
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event, rows) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(0);
    };

    useEffect(() => {
        async function work() {
            await getAllUsers();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage(error, dispatch, navigate);
            });
    }, [currentPage, pageSize, triggerFetch]);

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
                                    <AddCircle /> &nbsp; {displayLocalizeText("New User")}
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
                            className="table-container table-container-css"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "300px",
                            }}
                        >
                            <Table className="center" aria-label="table with sticky header" stickyHeader>
                                <TableHead className="p-3 mb-2 row">
                                    <TableRow>
                                        <StyledTableCell className="tableHeaderFont"></StyledTableCell>
                                        <StyledTableCell className="tableHeaderFont">Name</StyledTableCell>
                                        <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Username")}</StyledTableCell>
                                        <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Phone Number")}</StyledTableCell>
                                        <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Role")}</StyledTableCell>
                                        {/* <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Sub Role")}</StyledTableCell> */}
                                        <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Designation")}</StyledTableCell>
                                        <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Active")}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.allUsersDetails.length > 0 &&
                                        state.allUsersDetails.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell className="tableContentFont">
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
                                                <StyledTableCell className="tableContentFont">
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
                                                <StyledTableCell className="tableContentFont">{row.phone}</StyledTableCell>
                                                <StyledTableCell className="tableContentFont">
                                                    {displayLocalizeText(DisplayNameForPyramidUserRole[row.userRole])}
                                                </StyledTableCell>
                                                <StyledTableCell className="tableContentFont">
                                                    {row.designation}
                                                </StyledTableCell>
                                                {row.status === "ACTIVE" ? (
                                                    <StyledTableCell className="tableContentFont">
                                                        {state.userDetails?.userRole === LeadowsUserRoles.ORG_OWNER
                                                            ? row.userRole !== LeadowsUserRoles.ORG_OWNER && (
                                                                  <IconButton
                                                                      onClick={() => handleOnClickDelete(row)}
                                                                  >
                                                                      <ToggleOnIcon
                                                                          fontSize="large"
                                                                          sx={{
                                                                              color: theme.typography.primary.black,
                                                                          }}
                                                                      />
                                                                  </IconButton>
                                                              )
                                                            : row.userRole !== LeadowsUserRoles.ORG_OWNER &&
                                                              row.userRole !== LeadowsUserRoles.ORG_ADMIN && (
                                                                  <IconButton
                                                                      onClick={() => handleOnClickDelete(row)}
                                                                  >
                                                                      <ToggleOnIcon
                                                                          fontSize="large"
                                                                          sx={{
                                                                              color: theme.typography.primary.black,
                                                                          }}
                                                                      />
                                                                  </IconButton>
                                                              )}
                                                    </StyledTableCell>
                                                ) : (
                                                    <StyledTableCell className="tableContentFont">
                                                        {row.userRole !== LeadowsUserRoles.ORG_OWNER && (
                                                            <IconButton
                                                                style={{ color: theme.palette.primary.main }}
                                                                onClick={() => {
                                                                    handleOnClickRestore(row);
                                                                }}
                                                            >
                                                                <ToggleOffIcon fontSize="large" sx={{ color: theme.palette.primary.inActive }} />
                                                            </IconButton>
                                                        )}
                                                    </StyledTableCell>
                                                )}
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <Grid container justifyContent="flex-end" sx={{ padding: "8px 16px" }}>
                                <TableFooter>
                                    <TablePagination
                                        component="div"
                                        count={totalCount}
                                        page={currentPage}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={pageSize}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        rowsPerPageOptions={[1, 5, 10, 15, 20, 25]}
                                        sx={{ "& p": { marginTop: "auto" } }}
                                    />
                                </TableFooter>
                            </Grid>
                        </PyramidTableContainer>
                    </Grid>

                    {/* {value === "TECH_SUPPORT_USER" && <TechSupportUserComponent techSupportUsers={techSupportUsers} />} */}
                </Grid>

                {openUserModal && (
                    <AddNewUserModal
                        open={openUserModal}
                        handleClose={() => setOpenUserModal(false)}
                        createOrganizationUser={createOrganizationUser}
                    />
                )}
                {openDeleteModal.open && (
                    <UserConfirmationDeleteModal
                        open={openDeleteModal.open}
                        user={openDeleteModal.user}
                        handleClose={handleCloseDeleteModal}
                        deleteUser={deleteUser}
                    />
                )}

                {restoreUserModal.open && (
                    <UserConfirmationRestoreModal
                        open={restoreUserModal.open}
                        handleClose={handleCloseRestoreModal}
                        user={restoreUserModal.user}
                        restoreUser={restoreUser}
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
