// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterfaceState } from "../types/state/UserInterfaceState";

// Colors to use for the theme.
const PRIMARY_COLOR: string = "#009688"; // Teal
const SECONDARY_COLOR: string = "#1A8060"; // Darker Teal

export { PRIMARY_COLOR, SECONDARY_COLOR };

// Tracks the User Interface's settings.
const initialUserInterfaceState: UserInterfaceState = {
    themeOptions: {
        darkMode: true,
        primaryColor: PRIMARY_COLOR,
        secondaryColor: SECONDARY_COLOR,
    },
    drawerOptions: {
        open: true,
    },
    accountDialogOptions: {
        open: false,
        tab: null,
    },
};

// Creates corresponding actions and reducers to modify the state.
const userInterfaceSlice = createSlice({
    name: "userInterface",
    initialState: initialUserInterfaceState,
    reducers: {
        toggleDarkMode: (userInterfaceState): void => {
            userInterfaceState.themeOptions.darkMode = !userInterfaceState.themeOptions.darkMode;
        },
        toggleDrawerOpen: (userInterfaceState): void => {
            userInterfaceState.drawerOptions.open = !userInterfaceState.drawerOptions.open;
        },
        toggleAccountDialogOpen: (userInterfaceState): void => {
            userInterfaceState.accountDialogOptions.open = !userInterfaceState.accountDialogOptions.open;
        },
        setAccountDialogTab: (userInterfaceState, newAccountDialogTab: PayloadAction<string>): void => {
            userInterfaceState.accountDialogOptions.tab = newAccountDialogTab.payload;
        },
    },
});

const userInterfaceActions = userInterfaceSlice.actions;
const userInterfaceReducer = userInterfaceSlice.reducer;

export { userInterfaceActions, userInterfaceReducer };
