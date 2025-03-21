import { Add } from "@mui/icons-material";
import { Avatar, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewBranchModal from "../../modal/AddNewBranchModal";
import { setAllBranchDetails } from "../../store/workspaceSlice";
import {
    CardHeadingBold,
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
import { BranchesIcon } from "../svgComponent/IconComponent";
import ViewLinkedUsersToBranchModal from "../../modal/ViewLinkedUsersToBranchModal";

export default function Branches () {
    const state = useSelector(store => store.workspaceStore);
    const [showAddNewBranchModal, setShowAddNewBranchModal] = useState();
    const [showOpenViewLinkedUsersModal, setShowOpenViewLinkedUsersModal] = useState({
        open: false,
        branchDetails: "",
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

    const getAllBranches = async () => {
        try {
            const response = await axiosInstance.get(`/branches/get-all`, { params: { orgId: ORGID } });
            dispatch(setAllBranchDetails(response.data.branches));
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const onClickOpenAddNewBranchModal = () => {
        setShowAddNewBranchModal(true);
    };

    const onClickCreateBranch = async branchDetails => {
        try {
            await axiosInstance.post("/branches/create-branch", branchDetails);
            await getAllBranches();
            setShowAddNewBranchModal(false);
            dispatch(showSnackbar({ open: true, severity: "success", message: "Branch Created Successfully" }));
        } catch (error) {
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const handleOnClickUsers = row => {
        setShowOpenViewLinkedUsersModal({ open: true, branchDetails: row });
    };

    const handleCloseViewLinkedUsersToBranchModal = () => {
        setShowOpenViewLinkedUsersModal({ open: false, branchDetails: "" });
    };

    useEffect(() => {
        async function work () {
            await getAllBranches();
        }
        work()
            .then(() => {})
            .catch(error => {
                logger.clientLog(error);
                getErrorMessage(error, dispatch, navigate);
            });
    }, []);

    console.log(showOpenViewLinkedUsersModal, "showOpenViewLinkedUsersModal");

    return (
        <PyramidCardParent>
            <Grid>
                <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid display={"flex"} alignItems={"center"}>
                        <BranchesIcon />
                        <CardHeadingBold>&nbsp;&nbsp;{displayLocalizeText("Branches")}</CardHeadingBold>
                    </Grid>
                    <Grid display={"flex"} gap={2}>
                        <Grid display={"flex"} gap={1}>
                            {/* <Grid>
                                    <PyramidCreateButton onClick={() => handleOnClickFilter()}>
                                        <FilterAltIcon /> &nbsp;{displayLocalizeText("Filter")}
                                    </PyramidCreateButton>
                                </Grid> */}
                            <PyramidCreateButton onClick={() => onClickOpenAddNewBranchModal()}>
                                <Add /> &nbsp; {displayLocalizeText("Branch")}
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
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Branch Name")}</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Location")}</StyledTableCell>
                                        <StyledTableCell className='tableHeaderFont'>{displayLocalizeText("Linked Users")}</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {state.allBranchDetails && state.allBranchDetails.length > 0 ? (
                                    <TableBody>
                                        {state.allBranchDetails.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                {/* <StyledTableCell className='tableContentFont'>{index + 1}</StyledTableCell> */}

                                                <StyledTableCell className='tableContentFont'>
                                                    <Avatar
                                                        sx={{
                                                            color: theme.typography.primary.black,
                                                            backgroundColor:
                                                                row.status === "ACTIVE"
                                                                    ? UserProfileColors[row?.branchName[0].toUpperCase()]
                                                                    : theme.palette.primary.inActive,

                                                            border: `1px solid ${theme.palette.primary.borderColor}`,
                                                        }}
                                                    >
                                                        {row.branchName[0].toUpperCase()}
                                                    </Avatar>
                                                </StyledTableCell>
                                                <StyledTableCell>{row.branchName}</StyledTableCell>
                                                {/* <StyledTableCell className='tableContentFont'>
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
                                                </StyledTableCell> */}
                                                <StyledTableCell className='tableContentFont'>{row.location}</StyledTableCell>

                                                <StyledTableCell className='tableContentFont'>
                                                    <PyramidNavButton
                                                        onClick={() => {
                                                            handleOnClickUsers(row);
                                                        }}
                                                    >
                                                        Users
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

                {showAddNewBranchModal && (
                    <AddNewBranchModal
                        open={showAddNewBranchModal}
                        handleClose={() => setShowAddNewBranchModal(false)}
                        createBranch={onClickCreateBranch}
                    />
                )}

                {showOpenViewLinkedUsersModal.open && (
                    <ViewLinkedUsersToBranchModal
                        open={showOpenViewLinkedUsersModal.open}
                        handleClose={handleCloseViewLinkedUsersToBranchModal}
                        branchDetails={showOpenViewLinkedUsersModal.branchDetails}
                    />
                )}
            </Grid>
        </PyramidCardParent>
    );
}
