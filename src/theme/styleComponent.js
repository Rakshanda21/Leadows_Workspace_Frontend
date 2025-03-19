import { styled, Typography } from "@mui/material";
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
    textTransform: "none",
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
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "none",
    // "&:hover": { backgroundColor: theme.palette.success.dark, color: theme.typography.success.light },
}));

export const PyramidOkButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    backgroundColor: theme.typography.primary.black,
    color: theme.typography.info.light,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    // "&:hover": { backgroundColor: "#2979ff", color: theme.typography.success.light },
    textTransform: "none",
}));

// export const PyramidCancelButton = styled(MuiButton)(({ theme }) => ({
//     fontSize: theme.typography.h5.fontSize,
//     color: theme.typography.primary.text,
//     borderRadius: theme.components.MuiButton.borderRadius,
//     paddingLeft: theme.components.MuiButton.paddingLeft,
//     paddingRight: theme.components.MuiButton.paddingRight,
//     border: `1px solid ${theme.typography.primary.text}`,
//     "&:hover": { border: `1px solid ${theme.typography.primary.text} ` },
// }));

export const PyramidLoginButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    backgroundColor: theme.typography.primary.black,
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
    textTransform: "none",
}));

export const PyramidTextField = styled(MuiTextField)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.typography.info.light,
    width: "100%",
    marginTop: "5px",
    marginBottom: "16px",
    "& .MuiInputBase-input": {
        padding: "12px",
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

// export const PyramidCreateButton = styled(MuiButton)(({ theme }) => ({
//     fontSize: theme.typography.h5.fontSize,
//     color: theme.typography.primary.black,
//     borderRadius: theme.components.MuiButton.borderRadius,
//     paddingLeft: theme.components.MuiButton.paddingLeft,
//     paddingRight: theme.components.MuiButton.paddingRight,
//     fontWeight: theme.typography.fontWeightBold,
//     border: `1px solid #ddd`,
//     backgroundColor: "#fcfcfc",

//     // "&:hover": { backgroundColor: theme.palette.primary.light, color: theme.typography.primary.light },
// }));

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
    borderRadius: theme.components.MuiCard.borderRadius,
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
    color: theme.typography.primary.dark,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    // display: "flex",
    // justifyContent: "center",
    // marginBottom: "10px",
}));
export const AppCardHeading = styled("div")(({ theme }) => ({
    color: theme.typography.primary.black,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightBold,
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
        fontFamily: "'Inter' sans-serif !important",
    },
    [`&.${tableCellClasses.body}`]: {
        padding: "10px !important",
        fontSize: "0.9rem",
        fontWeight: 500,
        fontFamily: "'Inter' sans-serif !important",
        backgroundColor: "#fff",
    },
    [`&.${tableCellClasses.head.tr}`]: {
        backgroundColor: "#fff",
        // width: "45vw",
        fontFamily: "'Inter' sans-serif !important",
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
    fontSize: theme.typography.h3.fontSize,
    color: theme.typography.primary.dark,
    fontWeight:'bold'
}));

export const PyramidDialogContent = styled(MuiDialogTitle)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Align TextField to the top
    minHeight: "420px", // Enforce minimum content height
    height: "420px", // Adjust height to ensure it fills available space
    maxHeight: "420px",
    overflowY: "auto", // Allow scrolling for longer content
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

export const AppHeading = styled("div")(({ theme }) => ({
    color: theme.typography.primary.dark,
    fontFamily: theme.typography.fontFamily,
    fontSize: "2rem",
    fontWeight: theme.typography.fontWeightBold,
}));

export const OrgName = styled("div")(({ theme }) => ({
    color: theme.typography.primary.text,
    fontFamily: theme.typography.fontFamily,
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
}));

export const PyramidCardParent = styled(MuiCard)(({ theme }) => ({
    width: "100%",
    borderRadius: "0.75rem",
    padding: "20px",
    marginTop: "10px",
    marginBottom: "20px",
    // minHeight: "100px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    border: `1px solid #f9f9f9`,
    boxShadow: "none",
    // boxShadow: `none`,
    overflowY: "hidden",
}));

export const CardHeadingBold = styled("div")(({ theme }) => ({
    color: theme.typography.primary.black,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    display: "flex",
}));

export const PyramidCreateButton = styled(MuiButton)(({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    color: theme.typography.primary.light,
    borderRadius: theme.components.MuiButton.borderRadius,
    paddingLeft: theme.components.MuiButton.paddingLeft,
    paddingRight: theme.components.MuiButton.paddingRight,
    fontWeight: theme.typography.fontWeightBold,
    border: `1px solid #ddd`,
    backgroundColor: theme.typography.primary.black,
    textTransform: "none",

    // "&:hover": { backgroundColor: theme.palette.primary.light, color: theme.typography.primary.light },
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
    textTransform: "none",
}));

export const PyramidEllipsis = styled(Typography)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    font-family: inherit;
    width: 15vw;
`;
export const NoRecordMessage = styled(MuiButton)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems:'center',
    color: theme.typography.primary.mainLight,
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
}));
