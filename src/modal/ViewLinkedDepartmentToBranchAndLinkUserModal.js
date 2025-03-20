import { Close, InsertLink } from "@mui/icons-material";
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useTheme,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/Layout";
import NoRecords from "../components/static/NoRecords";
import { showSnackbar } from "../store/snackbarSlice";
import {
    PyramidDialogTitle,
    PyramidNavButton,
    PyramidOkButton,
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../theme/styleComponent";
import axiosInstance from "../utils/axiosInstance";
import { displayLocalizeText } from "../utils/LocalizeText";
import LinkUserToDepartmentInBranchModal from "./LinkUserToDepartmentInBranchModal";
import { use } from "react";

export default function ViewLinkedDepartmentToBranchAndLinkUserModal({ open, handleClose, branchDetails }) {
    const state = useSelector(store => store.workspaceStore);
    const [allDepartmentDetails, setAllDepartmentDetails] = useState([]);
    const [linkUserToDepartmentInBranch, setLinkUserToDepartmentInBranch] = useState({
        open: false,
        departmentDetails: {},
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleOnChange = (e, userId) => {
        const checked = e.target.checked;
        setAllDepartmentDetails(prevUsers => prevUsers.map(user => (user.id === userId ? { ...user, isLinked: checked } : user)));
    };

    const getAllLinkedUsersByDepartmentId = async () => {
        try {
            const response = await axiosInstance.get(`/departments-with-branch/get-all-linked-departments-by-branch-id`, {
                params: { branchId: branchDetails.id },
            });
            setAllDepartmentDetails(response.data);
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };
    const handleOnClickLinkUsers = department => {
        setLinkUserToDepartmentInBranch({
            open: true,
            departmentDetails: department,
        });
    };

    const handleCloseLinkUserToDepartmentInBranch = () => {
        setLinkUserToDepartmentInBranch({
            open: false,
            departmentDetails: {},
        });
    };

    const OnClickLinkUsersToDepartment = async () => {
        try {
            await axiosInstance.post(`/departments-with-branch/link-departments-to-branch`, {
                branchId: branchDetails.id,
                linkOrUnlinkDepartmentToBranch: allDepartmentDetails,
            });
            dispatch(
                showSnackbar({
                    open: true,
                    severity: "success",
                    message: "Users Linked Successfully",
                }),
            );
            handleClose();
        } catch (error) {
            handleClose();
            getErrorMessage({ error, dispatch, navigate });
        }
    };

    useEffect(() => {
        async function work() {
            // await getAllUsers();
            await getAllLinkedUsersByDepartmentId();
        }
        work()
            .then(() => {})
            .catch(error => {
                getErrorMessage({ error, dispatch, navigate });
            });
    }, []);

    console.log(linkUserToDepartmentInBranch, "===linkUserToDepartmentInBranch===");
    return (
        <>
            <Dialog open={open} fullWidth PaperProps={{ style: { width: "100%", height: "70%" } }}>
                <PyramidDialogTitle display={"flex"} justifyContent={"space-between"}>
                    <Grid>Departments</Grid>
                    <IconButton variant="secondary" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </PyramidDialogTitle>
                <DialogContent sx={{ overflowY: "hidden" }}>
                    <Grid style={{ width: "100%" }} mt={3}>
                        <Grid style={{ width: "100%" }}>
                            <PyramidTableContainer
                                component={Paper}
                                // className="table-container table-container-css"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    minHeight: "500px",
                                }}
                            >
                                <Table className="center" aria-label="table with sticky header" stickyHeader>
                                    <TableHead className="p-3 mb-2 row">
                                        <TableRow>
                                            <StyledTableCell className="tableHeaderFont"></StyledTableCell>
                                            <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Department Name")}</StyledTableCell>
                                            <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Link Users")}</StyledTableCell>
                                            {/* <StyledTableCell className="tableHeaderFont">{displayLocalizeText("Link Departments")}</StyledTableCell>
                                            <StyledTableCell className="tableHeaderFont">{displayLocalizeText("View Departments")}</StyledTableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    {allDepartmentDetails && allDepartmentDetails.length > 0 ? (
                                        <TableBody>
                                            {allDepartmentDetails.map((department, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell className="tableContentFont">
                                                        <Avatar
                                                            sx={{
                                                                color: theme.typography.primary.black,
                                                                backgroundColor:
                                                                    department.status === "ACTIVE"
                                                                        ? UserProfileColors[department?.branchName[0].toUpperCase()]
                                                                        : theme.palette.primary.inActive,

                                                                border: `1px solid ${theme.palette.primary.borderColor}`,
                                                            }}
                                                        >
                                                            {department.departmentName[0].toUpperCase()}
                                                        </Avatar>
                                                    </StyledTableCell>
                                                    <StyledTableCell className="tableContentFont">
                                                        <Grid>
                                                            <Grid mb={1}>{department.departmentName}</Grid>
                                                        </Grid>
                                                    </StyledTableCell>
                                                    <StyledTableCell>
                                                        <PyramidNavButton>
                                                            <InsertLink
                                                                onClick={() => {
                                                                    handleOnClickLinkUsers(department);
                                                                }}
                                                            />
                                                        </PyramidNavButton>
                                                    </StyledTableCell>
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
                                {/* <Grid container justifyContent='flex-end' sx={{ padding: "8px 16px" }}>
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
                            </Grid> */}
                            </PyramidTableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <PyramidOkButton onClick={OnClickLinkUsersToDepartment}>Save Changes</PyramidOkButton>
                </DialogActions>
            </Dialog>
            {linkUserToDepartmentInBranch.open && (
                <LinkUserToDepartmentInBranchModal
                    open={linkUserToDepartmentInBranch.open}
                    handleClose={handleCloseLinkUserToDepartmentInBranch}
                    departmentDetails={linkUserToDepartmentInBranch.departmentDetails}
                />
            )}
        </>
    );
}
