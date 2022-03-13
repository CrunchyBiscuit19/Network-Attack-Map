// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountInformationState, MessageState, UserInfo } from "../types/state/AccountInformationState";

// Tracks account information, if logged in.
const initialAccountInformationState: AccountInformationState = {
    loggedIn: false,
    userInfo: {
        username: null,
        email: null,
    },
    loginMessage: {
        text: null,
        success: null,
    },
    registerMessage: {
        text: null,
        success: null,
    },
};

// Creates corresponding actions and reducers to modify the state.
const accountInformationSlice = createSlice({
    name: "accountInformation",
    initialState: initialAccountInformationState,
    reducers: {
        setLoggedIn: (accountInformationState, isLoggedIn: PayloadAction<boolean>): void => {
            accountInformationState.loggedIn = isLoggedIn.payload;
        },
        setUserInfo: (accountInformationState, newUserInfo: PayloadAction<UserInfo>): void => {
            accountInformationState.userInfo = {
                username: newUserInfo.payload.username,
                email: newUserInfo.payload.email,
            };
        },
        setLoginMessage: (accountInformationState, newLoginMessage: PayloadAction<MessageState>): void => {
            accountInformationState.loginMessage = newLoginMessage.payload;
        },
        setRegisterMessage: (accountInformationState, newRegisterMessage: PayloadAction<MessageState>): void => {
            accountInformationState.registerMessage = newRegisterMessage.payload;
        },
    },
});

const accountInformationActions = accountInformationSlice.actions;
const accountInformationReducer = accountInformationSlice.reducer;

export { accountInformationActions, accountInformationReducer };
