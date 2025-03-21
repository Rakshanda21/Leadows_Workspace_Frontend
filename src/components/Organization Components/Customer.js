import { AddCircle } from "@mui/icons-material";
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewCustomerModal from "../../modal/AddNewCustomerModal";
import {
    CardHeadingBold,
    PyramidCardParent,
    PyramidCreateButton,
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../../theme/styleComponent";
import { displayLocalizeText } from "../../utils/LocalizeText";
import { logger } from "../../utils/logger";
import { getErrorMessage } from "../Layout";
import Loader from "../Loader";
import NoRecords from "../static/NoRecords";
import { CustomerIcon } from "../svgComponent/IconComponent";

export default function Roles() {
    const state = useSelector(store => store.workspaceStore);
    const [showAddNewCustomerModal, setShowAddNewCustomerModal] = useState();
    const [loading, setLoading] = useState(false);
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

    const getAllCustomers = async () => {
        try {
            setLoading(true);
            // const response = await axiosInstance.get(`/users/get-all-role`, { params: { orgId: ORGID } });
            // dispatch(setShowAddNewCustomerModal(response.data.roles));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const createNewCustomer = async CustomElementRegistryDetails => {
        try {
            setLoading(true);
            // await axiosInstance.post("/users/create-role", CustomElementRegistryDetails);
            setLoading(false);
            await getAllCustomers();
            setShowAddNewCustomerModal(false);
            dispatch(showSnackbar({ open: true, severity: "success", message: "Role Created Successfully" }));
        } catch (error) {
            setLoading(false);
            getErrorMessage(error, dispatch, navigate);
        }
    };

    const onClickOpenAddNewRoleModal = () => {
        setShowAddNewCustomerModal(true);
    };

    useEffect(() => {
        async function work() {
            await getAllCustomers();
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
                        <CustomerIcon />
                        <CardHeadingBold>&nbsp;&nbsp;{displayLocalizeText("Customers")}</CardHeadingBold>
                    </Grid>
                    <Grid display={"flex"} gap={2}>
                        <Grid display={"flex"} gap={1}>
                            <PyramidCreateButton onClick={() => onClickOpenAddNewRoleModal()}>
                                <AddCircle /> &nbsp; {displayLocalizeText("Customers")}
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
                                <Loader />
                            ) : (
                                <Table className="center" aria-label="table with sticky header" stickyHeader>
                                    <TableHead className="p-3 mb-2 row">
                                        <TableRow>
                                            <StyledTableCell className="tableHeaderFont">Sr.No</StyledTableCell>
                                            <StyledTableCell className="tableHeaderFont">Customer Name</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    {state.allCustomerDetails && state.allCustomerDetails.length > 0 ? (
                                        <TableBody>
                                            {state.allCustomerDetails.map((row, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell className="tableContentFont">{index + 1}</StyledTableCell>
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

                {showAddNewCustomerModal && (
                    <AddNewCustomerModal
                        open={showAddNewCustomerModal}
                        handleClose={() => setShowAddNewCustomerModal(false)}
                        createNewCustomer={createNewCustomer}
                    />
                )}
            </Grid>
        </PyramidCardParent>
    );
}
