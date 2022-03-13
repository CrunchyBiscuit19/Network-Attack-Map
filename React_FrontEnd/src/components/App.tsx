// React & Defined Components
import React, { ReactElement, useEffect } from "react";
import { HeaderStructure } from "./header/HeaderStructure";
import { DrawerStructure } from "./drawer/DrawerStructure";
import { DashboardStructure } from "./dashboard/DashboardStructure";
import { PageNotFound } from "./error/PageNotFound";
// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { userInterfaceActions } from "../slices/userInterfaceSlice";
import { accountInformationActions } from "../slices/accountInformationSlice";
// Axios
import axios from "axios";
import { axiosRequestsConfiguration } from "../helpers/axiosRequestsConfiguration";
// Material UI
import { Drawer, Hidden, ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";
import { useAppStyles } from "../styles/appStyles";

// Adds headers and allow credentials when sending HTTP requests.
axiosRequestsConfiguration();

interface Props {}
/**
 * Top-level component that brings together the major elements of the web application.
 * @returns {ReactElement} A single component that can be rendered in the React DOM as the web application.
 */
const App: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useAppStyles();

    const drawerOpen: boolean = useSelector((state: RootState): boolean => state.userInterface.drawerOptions.open);

    // Defines the theme in use by the web application. Can change depending on user options.
    const darkMode: boolean = useSelector((state: RootState): boolean => state.userInterface.themeOptions.darkMode);
    const primaryColor: string = useSelector(
        (state: RootState): string => state.userInterface.themeOptions.primaryColor
    );
    const secondaryColor: string = useSelector(
        (state: RootState): string => state.userInterface.themeOptions.secondaryColor
    );
    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
        },
    });

    const loggedIn: boolean = useSelector((state: RootState): boolean => state.accountInformation.loggedIn);

    // Check if user is logged in every time the page is reloaded.
    useEffect(() => {
        const isLoggedIn = (): void => {
            axios
                .get("http://localhost:8000/api/auth/check/")
                .then((res) => {
                    dispatch(accountInformationActions.setLoggedIn(res.data.authenticated));
                    if (loggedIn) {
                        dispatch(
                            accountInformationActions.setUserInfo({
                                username: res.data.username,
                                email: res.data.email,
                            })
                        );
                    }
                })
                .catch((err) => {
                    dispatch(accountInformationActions.setLoggedIn(false));
                });
        };
        isLoggedIn();
    }, [loggedIn, dispatch]);

    return (
        // Provides components with access to the theme object created.
        <ThemeProvider theme={theme}>
            {/* Base styles Material UI applies to all elements. */}
            <CssBaseline />
            <Router>
                <Switch>
                    {/* Main Page. */}
                    <Route exact path={["/", "/index"]}>
                        <HeaderStructure />
                        {/* Offset the space taken up by the header on top to avoid overlapping. */}
                        <div className={classes.toolbarOffset}></div>
                        {/*Drawer for mobile devices*/}
                        <Hidden mdUp>
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaperMobile,
                                }}
                                variant="temporary" // Set drawer on mobile devices to be overlapping menu.
                                open={drawerOpen}
                                onClose={() => dispatch(userInterfaceActions.toggleDrawerOpen())}
                                ModalProps={{
                                    keepMounted: true, // Better performance on mobile.
                                }}
                            >
                                <DrawerStructure />
                            </Drawer>
                        </Hidden>
                        {/*Drawer for computers*/}
                        <Hidden smDown>
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaperComputer,
                                }}
                                variant="persistent" // Set drawer on computers to be retractable side menu.
                                open={drawerOpen}
                            >
                                {/* Offset the space taken up by the header on top to avoid overlapping. */}
                                <div className={classes.toolbarOffset}></div>
                                <DrawerStructure />
                            </Drawer>
                        </Hidden>
                        <DashboardStructure />
                    </Route>
                    {/* Non-existent pages. */}
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export { App };
