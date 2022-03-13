interface UserInfo {
    username: string | null;
    email: string | null;
}

interface MessageState {
    text: string | null;
    success: boolean | null;
}

interface AccountInformationState {
    loggedIn: boolean;
    userInfo: UserInfo;
    loginMessage: MessageState;
    registerMessage: MessageState;
}

export type { AccountInformationState, MessageState, UserInfo };
