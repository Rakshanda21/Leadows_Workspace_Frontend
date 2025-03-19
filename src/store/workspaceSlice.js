import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
    name: "workspaceSlice",
    initialState: {
        userDetails: {},
        allUsersDetails: [],
        allOrgUsersDetails: [],
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
    },
});
export const { setLoginData, setAllUsersDetails, setAllOrgUsersDetails, setAllBranchDetails, setAllDepartmentDetails } = Slice.actions;
