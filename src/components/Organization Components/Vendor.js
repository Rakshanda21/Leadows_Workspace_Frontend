import { AddCircle } from "@mui/icons-material";
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    CardHeadingBold,
    PyramidCardParent,
    PyramidCreateButton,
    PyramidTableContainer,
    StyledTableCell,
    StyledTableRow,
} from "../../theme/styleComponent";
import { displayLocalizeText } from "../../utils/LocalizeText";
import Loader from "../Loader";
import NoRecords from "../static/NoRecords";
import { VendorIcon } from "../svgComponent/IconComponent";

export default function Vendor() {
    const state = useSelector(store => store.workspaceStore);
    const [loading, setLoading] = useState(false);

    return (
        <PyramidCardParent>
            <Grid>
                <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <Grid display={"flex"} alignItems={"center"}>
                        <VendorIcon />
                        <CardHeadingBold>&nbsp;&nbsp;{displayLocalizeText("Vendors")}</CardHeadingBold>
                    </Grid>
                    <Grid display={"flex"} gap={2}>
                        <Grid display={"flex"} gap={1}>
                            <PyramidCreateButton onClick={() => onClickOpenAddNewRoleModal()}>
                                <AddCircle /> &nbsp; {displayLocalizeText("Vendors")}
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
                                            <StyledTableCell className="tableHeaderFont">Vendor Name</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    {state.allVendorDetails && state.allVendorDetails.length > 0 ? (
                                        <TableBody>
                                            {state.allVendorDetails.map((row, index) => (
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
                        </PyramidTableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </PyramidCardParent>
    );
}
