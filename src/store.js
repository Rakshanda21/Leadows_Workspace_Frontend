import { configureStore } from "@reduxjs/toolkit";
import { Slice } from "./store/workspaceSlice";
import { snackbarSlice } from "./store/snackbarSlice";

export const store = configureStore({
    reducer: {
        workspaceStore: Slice.reducer,
        snackbarStore: snackbarSlice.reducer,
    },
});
