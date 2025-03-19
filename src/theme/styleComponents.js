import { styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiGrid from "@mui/material/Grid";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTableRow from "@mui/material/TableRow";
import MuiTextField from "@mui/material/TextField";

export const PyramidSignInButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    backgroundColor: theme.typography.primary.text,
    color: theme.typography.info.light,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    boxShadow: "#ccc 0 10px 20px -10px",
    width: "150px",
    "&:hover": { backgroundColor: theme.palette.info.hover, color: theme.typography.info.light },
}));

export const PyramidLoggedInUserInfo = styled("div")(({ theme }) => ({
    color: theme.typography.primary.black,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightBold,
}));

export const PyramidNavButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h6.fontSize,
    backgroundColor: `${theme.typography.primary.light}`,
    textAlign: "center",
    color: theme.typography.primary.black,
    border: `1px solid #ccc`,
    borderRadius: theme.components.MuiButton.borderRadius,
    // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    // "&:hover": { backgroundColor: theme.palette.success.dark, color: theme.typography.success.light },
}));

export const PyramidOkButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.typography.primary.black,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    fontWeight: theme.typography.fontWeightBold,
    border: `1px solid #ddd`,
    backgroundColor: "#fcfcfc",
}));

export const PyramidCancelButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.typography.primary.black,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    fontWeight: theme.typography.fontWeightBold,
    border: `1px solid #ddd`,
    // backgroundColor: "#fcfcfc",
}));

export const PyramidLoginButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    backgroundColor: theme.typography.primary.text,
    color: theme.typography.info.light,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    width: "100%",
    "&:hover": { backgroundColor: theme.palette.primary.hover, color: theme.typography.primary.light },
    marginTop: "5px",
    marginBottom: "5px",
    paddingTop: theme.components.MuiButton.paddingTop,
    paddingBottom: theme.components.MuiButton.paddingBottom,
    boxShadow: "#ccc 0 10px 20px -10px",
}));

export const PyramidTextField = styled(MuiTextField)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.typography.info.light,
    width: "100%",
    marginTop: "5px",
    marginBottom: "16px",
    "& .MuiInputBase-input": {
        padding: "15px",
    },

    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: `${theme.typography.primary.text}`,
        },
    },
    "& .MuiInputLabel-outlined": { "&.Mui-focused": { color: `${theme.typography.primary.text}` } },
}));

export const PyramidBrandName = styled("div")(({ theme }) => ({
    color: theme.typography.primary.main,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    padding: "5px",
}));

export const PyramidCreateButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.typography.primary.black,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    fontWeight: theme.typography.fontWeightBold,
    border: `1px solid #ddd`,
    backgroundColor: "#fcfcfc",

    // "&:hover": { backgroundColor: theme.palette.primary.light, color: theme.typography.primary.light },
}));

export const SectionHeading = styled("div")(({ theme }) => ({
    color: theme.typography.primary.black,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
}));

export const PyramidPage = styled(MuiGrid)(({ theme }) => ({
    padding: "5px",
}));

export const PyramidCard = styled(MuiCard)(({ theme }) => ({
    width: "100%",
    borderRadius: theme.components.MuiButton.borderRadius,
    padding: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    // minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    border: `1px solid #ccc`,
    // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",

    boxShadow: `none`,
}));

export const CardHeading = styled("div")(({ theme }) => ({
    color: theme.typography.primary.text,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    // display: "flex",
    // justifyContent: "center",
    // marginBottom: "10px",
}));
export const AppCardHeading = styled("div")(({ theme }) => ({
    color: theme.typography.primary.black,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
}));

export const MetaDataText = styled("div")(({ theme }) => ({
    color: theme.typography.primary.mainLight,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
}));

export const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: "1rem",
        fontWeight: 600,
        backgroundColor: "#fff",
        color: theme.typography.primary.black,
        padding: "10px !important",
        // width: "100vw",
        fontFamily: "'Poppins' sans-serif !important",
    },
    [`&.${tableCellClasses.body}`]: {
        padding: "10px !important",
        fontSize: "0.9rem",
        fontWeight: 500,
        fontFamily: "'Poppins' sans-serif !important",
        backgroundColor: "#fff",
    },
    [`&.${tableCellClasses.head.tr}`]: {
        backgroundColor: "#fff",
        // width: "45vw",
        fontFamily: "'Poppins' sans-serif !important",
    },
}));

export const StyledTableRow = styled(MuiTableRow)(({ theme }) => ({
    // "&:nth-of-type(even)": {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export const PyramidChip = styled(MuiChip)(({ theme }) => ({
    fontSize: "12px",
    blockSize: "28px",
    background: "#fff",
}));

export const PyramidDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
    fontSize: theme.typography.h1.fontSize,
    color: theme.typography.primary.dark,
}));

export const PyramidTableContainer = styled(MuiTableContainer)(({ theme }) => ({
    boxShadow: "none",
    // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
}));

export const PyramidCardGrid = styled(MuiGrid)(({ theme }) => ({
    color: theme.typography.primary.black,
    textAlign: "center",
    minHeight: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
