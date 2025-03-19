import { Add } from "@mui/icons-material";
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
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../../theme/styleComponent";
import axiosInstance, { ORGID } from "../../utils/axiosInstance";
import { displayLocalizeText } from "../../utils/LocalizeText";
import { logger } from "../../utils/logger";
import { UserProfileColors } from "../../utils/userProfileColors";
import { DisplayNameForPyramidSubUserRole, DisplayNameForPyramidUserRole } from "../../utils/UserRoles";
import { getErrorMessage } from "../Layout";
import NoRecords from "../static/NoRecords";
import { DepartmentIcon } from "../svgComponent/IconComponent";

export default function Departments () {
    const state = useSelector(store => store.workspaceStore);
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState();
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

    const onClickOpenAddNewDepartmentModal = () => {
        setShowAddNewDepartmentModal(true);
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
                                <Add /> &nbsp; {displayLocalizeText("Departments")}
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
                                        <StyledTableCell className='tableHeaderFont'>Sr.No</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>Name</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {state.allDepartmentDetails && state.allDepartmentDetails.length > 0 ? (
                                    <TableBody>
                                        {state.allDepartmentDetails.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell className='tableContentFont'>{index + 1}</StyledTableCell>

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
                        // createSecondaryERPUser={createSecondaryERPUser}
                    />
                )}
            </Grid>
        </PyramidCardParent>
    );
}
