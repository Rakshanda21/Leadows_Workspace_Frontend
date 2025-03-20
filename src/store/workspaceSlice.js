import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: "workspaceSlice",
    initialState: {
        userDetails: {},
        allUsersDetails: [],
        allOrgUsersDetails: [],
        allOrgRolesDetails: [],
        allCustomerDetails: [],
        allVendorDetails: [],
        allAssetDetails: [],
        allInventoryDetails: [],
    },
    reducers: {
        setLoginData: (state, action) => {
            state.userDetails = action.payload;
        },

        setAllUsersDetails: (state, action) => {
            state.allUsersDetails = action.payload;
        },

        setAllOrgUsersDetails: (state, action) => {
            state.allOrgUsersDetails = action.payload;
        },

        setAllBranchDetails: (state, action) => {
            state.allBranchDetails = action.payload;
        },

        setAllDepartmentDetails: (state, action) => {
            state.allDepartmentDetails = action.payload;
        },
        setAllRoleDetails: (state, action) => {
            state.allOrgRolesDetails = action.payload;
        },
        setAllCustomerDetails: (state, action) => {
            state.allCustomerDetails = action.payload;
        },
        setAllVendorDetails: (state, action) => {
            state.allVendorDetails = action.payload;
        },
        setAllAssetDetails: (state, action) => {
            state.allAssetDetails = action.payload;
        },
        setAllInventoryDetails: (state, action) => {
            state.allInventoryDetails = action.payload;
        },
    },
});
export const { setLoginData, setAllUsersDetails, setAllOrgUsersDetails, setAllBranchDetails, setAllDepartmentDetails, setAllRoleDetails ,setAllCustomerDetails,setAllVendorDetails,setAllInventoryDetails} =
    Slice.actions;
