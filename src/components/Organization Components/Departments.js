import { Add, AddCircle } from "@mui/icons-material";
import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewDepartmentModal from "../../modal/AddNewDepartmentModal";
import { setAllDepartmentDetails } from "../../store/workspaceSlice";
import {
    CardHeadingBold,
    MetaDataText,
    PyramidCardParent,
    PyramidCreateButton,
    PyramidNavButton,
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../../theme/styleComponent";
import axiosInstance, { ORGID } from "../../utils/axiosInstance";
import { displayLocalizeText } from "../../utils/LocalizeText";
import { logger } from "../../utils/logger";
import { UserProfileColors } from "../../utils/userProfileColors";
import { getErrorMessage } from "../Layout";
import NoRecords from "../static/NoRecords";
import { DepartmentIcon } from "../svgComponent/IconComponent";
import ViewLinkedUsersToDepartmentModal from "../../modal/ViewLinkedUsersToDepartmentModal";

export default function Departments () {
    const state = useSelector(store => store.workspaceStore);
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState();
    const [showOpenViewLinkedUsersToDepartmentModal, setShowOpenViewLinkedUsersDepartmentModal] = useState({
        open: false,
        departmentDetails: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        //fractionalSecondDigits: 0,
    });

    const getAllDepartments = async () => {
        try {
            const response = await axiosInstance.get(`/departments/get-all`, { params: { orgId: ORGID } });
            dispatch(setAllDepartmentDetails(response.data.departments));
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const handleOnClickUsers = row => {
        setShowOpenViewLinkedUsersDepartmentModal({ open: true, departmentDetails: row });
    };

    const handleCloseViewLinkedUsersToBranchModal = () => {
        setShowOpenViewLinkedUsersDepartmentModal({ open: false, departmentDetails: "" });
    };

    const onClickOpenAddNewDepartmentModal = () => {
        setShowAddNewDepartmentModal(true);
    };

    const onClickCreateNewDepartment = async departmentDetails => {
        try {
            await axiosInstance.post("/departments/create-department", departmentDetails);
            await getAllDepartments();
            setShowAddNewDepartmentModal(false);
            dispatch(showSnackbar({ open: true, severity: "success", message: "Department Added Successfully" }));
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    useEffect(() => {
        async function work () {
            await getAllDepartments();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage(error, dispatch, navigate);
            });
    }, []);

    return (
        <PyramidCardParent>
            <Grid>
                <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid display={"flex"} alignItems={"center"}>
                        <DepartmentIcon />
                        <CardHeadingBold>&nbsp;&nbsp;{displayLocalizeText("Departments")}</CardHeadingBold>
                    </Grid>
                    <Grid display={"flex"} gap={2}>
                        <Grid display={"flex"} gap={1}>
                            {/* <Grid>
                                    <PyramidCreateButton onClick={() => handleOnClickFilter()}>
                                        <FilterAltIcon /> &nbsp;{displayLocalizeText("Filter")}
                                    </PyramidCreateButton>
                                </Grid> */}
                            <PyramidCreateButton onClick={() => onClickOpenAddNewDepartmentModal()}>
                                <AddCircle /> &nbsp; {displayLocalizeText("Department")}
                            </PyramidCreateButton>
                        </Grid>
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
                                        {/* <StyledTableCell className='tableHeaderFont'>Linked Users</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                {state.allDepartmentDetails && state.allDepartmentDetails.length > 0 ? (
                                    <TableBody>
                                        {state.allDepartmentDetails.map((department, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell className='tableContentFont'>
                                                    <Avatar
                                                        sx={{
                                                            color: theme.typography.primary.black,
                                                            backgroundColor:
                                                                department.status === "ACTIVE"
                                                                    ? UserProfileColors[department.departmentName[0].toUpperCase()]
                                                                    : theme.palette.primary.inActive,

                                                            border: `1px solid ${theme.palette.primary.borderColor}`,
                                                        }}
                                                    >
                                                        {department.departmentName[0].toUpperCase()}
                                                    </Avatar>
                                                </StyledTableCell>
                                                {/* <StyledTableCell>{department.departmentName}</StyledTableCell> */}
                                                <StyledTableCell className='tableContentFont'>
                                                    <Grid>
                                                        <Grid mb={1}>{department.departmentName}</Grid>
                                                        <MetaDataText>
                                                            {department.status === "INACTIVE" ? (
                                                                <>Deactivated by: {department.deactivatedBy}</>
                                                            ) : (
                                                                <>Created by: {department.createdBy}</>
                                                            )}
                                                        </MetaDataText>
                                                    </Grid>
                                                </StyledTableCell>
                                                {/* <StyledTableCell className='tableContentFont'>
                                                    <PyramidNavButton
                                                        onClick={() => {
                                                            handleOnClickUsers(department);
                                                        }}
                                                    >
                                                        Users
                                                    </PyramidNavButton>
                                                </StyledTableCell> */}
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

                {showAddNewDepartmentModal && (
                    <AddNewDepartmentModal
                        open={showAddNewDepartmentModal}
                        handleClose={() => setShowAddNewDepartmentModal(false)}
                        createNewDepartment={onClickCreateNewDepartment}
                    />
                )}

                {showOpenViewLinkedUsersToDepartmentModal.open && (
                    <ViewLinkedUsersToDepartmentModal
                        open={showOpenViewLinkedUsersToDepartmentModal.open}
                        handleClose={handleCloseViewLinkedUsersToBranchModal}
                        departmentDetails={showOpenViewLinkedUsersToDepartmentModal.departmentDetails}
                    />
                )}
            </Grid>
        </PyramidCardParent>
    );
}
