// React & Defined Components
import React, { ReactElement, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { attackMapActions } from "../../slices/attackMapSlice";
import { attackTableActions } from "../../slices/attackTableSlice";
import { userInterfaceActions } from "../../slices/userInterfaceSlice";
import { accountInformationActions } from "../../slices/accountInformationSlice";
import { MessageState } from "../../types/state/AccountInformationState";
// Axios
import axios from "axios";
// Material UI
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { useHeaderAccountFormsStyles } from "../../styles/header/headerAccountFormsStyles";
// Others
import clsx from "clsx";

interface Props {}
/**
 * A form which allows users to log into the web application.
 * @returns {ReactElement} Component to be included as login form in AccountDialog.
 */
const LoginForm: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useHeaderAccountFormsStyles();

    // The login information entered by the user.
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Determines login POST response details.
    const loginMessage: MessageState = useSelector((state: RootState) => state.accountInformation.loginMessage);

    // Send login details to back-end server when login form is submitted.
    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/auth/login/", {
                email: email,
                password: password,
            })
            .then((res) => {
                if (res.data.message === "Authenticated") {
                    dispatch(accountInformationActions.setLoggedIn(true));
                    // Clear message on successful login.
                    dispatch(
                        accountInformationActions.setLoginMessage({
                            text: null,
                            success: null,
                        })
                    );
                    dispatch(userInterfaceActions.toggleAccountDialogOpen());
                    // Store account information after login
                    dispatch(
                        accountInformationActions.setUserInfo({
                            username: res.data.username,
                            email: res.data.email,
                        })
                    );
                    // Stop existing animation.
                    dispatch(attackMapActions.setAnimationStarted(false));
                    dispatch(attackTableActions.setProcessedLogsDataRows([]));
                }
            })
            .catch((err) => {
                if (err.response !== undefined) {
                    if (err.response.status === 403) {
                        dispatch(
                            accountInformationActions.setLoginMessage({
                                text: "Forbidden",
                                success: false,
                            })
                        );
                    } else {
                        dispatch(
                            accountInformationActions.setLoginMessage({
                                text: err.response.data.message,
                                success: false,
                            })
                        );
                    }
                    return;
                }
                dispatch(
                    accountInformationActions.setLoginMessage({
                        text: err.message,
                        success: false,
                    })
                );
            });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Login</Typography>
            </Grid>
            <Grid item xs={12}>
                <form noValidate onSubmit={handleLoginSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.dialogFormTextField}
                                label="Email Address"
                                autoFocus
                                value={email}
                                onInput={(e: React.FormEvent<HTMLInputElement>): void =>
                                    setEmail((e.target as HTMLInputElement).value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.dialogFormTextField}
                                label="Password"
                                type="password"
                                value={password}
                                onInput={(e: React.FormEvent<HTMLInputElement>): void =>
                                    setPassword((e.target as HTMLInputElement).value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                <Typography variant="body1">Login</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            {/* Message indicating success or failure of login, with explanation message if failure occurs. */}
            <Grid item xs={12}>
                <Typography
                    className={clsx({
                        [classes.hideError]: loginMessage.success === null,
                    })}
                    variant="body2"
                    color={loginMessage.success ? "initial" : "error"}
                >
                    {loginMessage.text}
                </Typography>
            </Grid>
        </Grid>
    );
};

/**
 * A form which allows users to register an account on the web application.
 * @returns {ReactElement} Component to be included as registration form in AccountDialog.
 */
const RegisterForm: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useHeaderAccountFormsStyles();

    // The registration information entered by the user.
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    // Determines registration POST response details.
    const registerMessage: MessageState = useSelector((state: RootState) => state.accountInformation.registerMessage);

    // Send registration details to back-end server when registration form is submitted.
    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Send only if password is confirmed correct.
        if (password === confirmPassword) {
            axios
                .post("http://localhost:8000/api/user/create/", {
                    username: username,
                    email: email,
                    password: password,
                })
                .then((res) => {
                    if (res.data.message === "User Created") {
                        // Redirect to login form and prompt user to login
                        dispatch(userInterfaceActions.setAccountDialogTab("loginForm"));
                        dispatch(
                            accountInformationActions.setLoginMessage({
                                text: "User Created Successfully, Please Login",
                                success: true,
                            })
                        );
                    }
                })
                .catch((err) => {
                    if (err.response !== undefined) {
                        if (err.response.status === 403) {
                            dispatch(
                                accountInformationActions.setRegisterMessage({
                                    text: "You are already logged in.",
                                    success: false,
                                })
                            );
                        } else {
                            dispatch(
                                accountInformationActions.setRegisterMessage({
                                    text: err.response.data.message,
                                    success: false,
                                })
                            );
                        }
                        return;
                    }
                    dispatch(
                        accountInformationActions.setRegisterMessage({
                            text: err.message,
                            success: false,
                        })
                    );
                });
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Register</Typography>
            </Grid>
            <Grid item xs={12}>
                <form noValidate onSubmit={handleRegisterSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.dialogFormTextField}
                                label="Username"
                                autoFocus
                                value={username}
                                onInput={(e: React.FormEvent<HTMLInputElement>): void =>
                                    setUsername((e.target as HTMLInputElement).value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.dialogFormTextField}
                                label="Email Address"
                                value={email}
                                onInput={(e: React.FormEvent<HTMLInputElement>): void =>
                                    setEmail((e.target as HTMLInputElement).value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.dialogFormTextField}
                                label="Password"
                                type="password"
                                value={password}
                                onInput={(e: React.FormEvent<HTMLInputElement>): void =>
                                    setPassword((e.target as HTMLInputElement).value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.dialogFormTextField}
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onInput={(e: React.FormEvent<HTMLInputElement>): void =>
                                    setConfirmPassword((e.target as HTMLInputElement).value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                className={clsx({ [classes.hideError]: password === confirmPassword })}
                                variant="body2"
                                color="error"
                            >
                                The passwords entered are not the same.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                <Typography variant="body1">Register</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            {/* Message indicating success or failure of registration, with explanation if failure occurs. */}
            <Grid item xs={12}>
                <Typography
                    className={clsx({ [classes.hideError]: registerMessage.success === null })}
                    variant="body2"
                    color={registerMessage.success ? "initial" : "error"}
                >
                    {registerMessage.text}
                </Typography>
            </Grid>
        </Grid>
    );
};

/**
 * A list of important information about the user's account.
 * @returns {ReactElement} Component to be included as information in AccountDialog.
 */
const AccountInfo: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();

    const loggedIn: boolean = useSelector((state: RootState): boolean => state.accountInformation.loggedIn);
    const username: string | null = useSelector(
        (state: RootState): string | null => state.accountInformation.userInfo.username
    );
    const email: string | null = useSelector(
        (state: RootState): string | null => state.accountInformation.userInfo.email
    );

    const handleLogout = (): void => {
        axios
            .get("http://localhost:8000/api/auth/logout/")
            .then((res) => {
                dispatch(userInterfaceActions.toggleAccountDialogOpen());
                dispatch(accountInformationActions.setLoggedIn(false));
            })
            .catch((err) => {
                dispatch(userInterfaceActions.toggleAccountDialogOpen());
            });
        dispatch(
            accountInformationActions.setUserInfo({
                username: null,
                email: null,
            })
        );
        // Stop existing animation.
        dispatch(attackMapActions.setAnimationStarted(false));
        dispatch(attackTableActions.setProcessedLogsDataRows([]));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Account Info</Typography>
            </Grid>
            {/* No account information available if user is not logged into an account. */}
            {loggedIn ? (
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">Username: {username}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Email Address: {email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/* To handle logout */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={(): void => {
                                handleLogout();
                            }}
                        >
                            <Typography variant="body1">Logout</Typography>
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Grid item xs={12}>
                    <Typography variant="body1" color="error">
                        NOT AVAILABLE UNTIL LOGGED IN
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export { LoginForm, RegisterForm, AccountInfo };
