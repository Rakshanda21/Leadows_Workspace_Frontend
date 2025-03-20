import { Add, AddCircle } from "@mui/icons-material";
import {
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewRoleModal from "../../modal/AddNewRoleModal";
import { setAllRoleDetails } from "../../store/workspaceSlice";
import {
    CardHeadingBold,
    PyramidCardParent,
    PyramidCreateButton,
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../../theme/styleComponent";
import axiosInstance, { ORGID } from "../../utils/axiosInstance";
import { displayLocalizeText } from "../../utils/LocalizeText";
import { logger } from "../../utils/logger";
import { getErrorMessage } from "../Layout";
import NoRecords from "../static/NoRecords";
import { RoleIcon } from "../svgComponent/IconComponent";

export default function Roles() {
    const state = useSelector(store => store.workspaceStore);
    const [showAddNewRoleModal, setShowAddNewRoleModal] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCounts, setTotalCounts] = useState();

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event, rows) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const getAllRoles = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/users/get-all-role`, {
                params: { orgId: ORGID, currentPage: currentPage, pageSize: pageSize },
            });
            dispatch(setAllRoleDetails(response.data.roles));
            setTotalCounts(response.data.totalCount);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const createRoles = async roleDetails => {
        try {
            setLoading(true);
            await axiosInstance.post("/users/create-role", roleDetails);
            setLoading(false);
            await getAllRoles();
            setShowAddNewRoleModal(false);
            dispatch(showSnackbar({ open: true, severity: "success", message: "Role Created Successfully" }));
        } catch (error) {
            setLoading(false);
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const onClickOpenAddNewRoleModal = () => {
        setShowAddNewRoleModal(true);
    };

    useEffect(() => {
        async function work() {
            await getAllRoles();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage(error, dispatch, navigate);
            });
    }, [currentPage, pageSize]);

    return (
        <PyramidCardParent>
            <Grid>
                <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid display={"flex"} alignItems={"center"}>
                        <RoleIcon />
                        <CardHeadingBold>&nbsp;&nbsp;{displayLocalizeText("Roles")}</CardHeadingBold>
                    </Grid>
                    <Grid display={"flex"} gap={2}>
                        <Grid display={"flex"} gap={1}>
                            <PyramidCreateButton onClick={() => onClickOpenAddNewRoleModal()}>
                                <AddCircle /> &nbsp; {displayLocalizeText("Roles")}
                            </PyramidCreateButton>
                        </Grid>
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
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Table className="center" aria-label="table with sticky header" stickyHeader>
                                    <TableHead className="p-3 mb-2 row">
                                        <TableRow>
                                            <StyledTableCell className="tableHeaderFont">Sr.No</StyledTableCell>
                                            <StyledTableCell className="tableHeaderFont">Role Name</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    {state.allOrgRolesDetails && state.allOrgRolesDetails.length > 0 ? (
                                        <TableBody>
                                            {state.allOrgRolesDetails.map((row, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>

                                                    {/* <StyledTableCell className="tableContentFont">
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
                                                </StyledTableCell> */}
                                                    <StyledTableCell>{row.role}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    ) : (
                                        <TableRow sx={{ borderBottom: "none" }}>
                                            <TableCell colSpan={5} sx={{ borderBottom: "none", padding: 0 }}>
                                                <Grid
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        // width: "100%",
                                                    }}
                                                >
                                                    <NoRecords />
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Table>
                            )}
                            <Grid container justifyContent="flex-end" sx={{ padding: "8px 16px" }}>
                                <TableFooter>
                                    <TablePagination
                                        component="div"
                                        count={totalCounts}
                                        page={currentPage}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={pageSize}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                        sx={{ "& p": { marginTop: "auto" } }}
                                    />
                                </TableFooter>
                            </Grid>
                        </PyramidTableContainer>
                    </Grid>
                </Grid>

                {showAddNewRoleModal && (
                    <AddNewRoleModal open={showAddNewRoleModal} handleClose={() => setShowAddNewRoleModal(false)} createRoles={createRoles} />
                )}
            </Grid>
        </PyramidCardParent>
    );
}
