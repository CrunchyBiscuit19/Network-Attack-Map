// React & Defined Components
import React, { ReactElement, useEffect } from "react";
import { AttackMap } from "./DashboardAttackMap";
import { LogsTable } from "./DashboardLogsTable";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { attackMapActions } from "../../slices/attackMapSlice";
import { accountInformationActions } from "../../slices/accountInformationSlice";
// Axios
import axios from "axios";
import cookieParser from "cookie";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { useDashboardStructureStyles } from "../../styles/dashboard/dashboardStructureStyles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
// Others
import clsx from "clsx";
import reactLeafletLogo from "../../assets/reactLeafletLogo.png";

const MINUTES: number = 60;
const MILLISECONDS: number = 1000;

interface Props {}
/**
 * Puts together the 2 main functionalities of the web application, the Network Attack Map and its Network Logs Table.
 * @returns {ReactElement} A single component that can be included in the web application as the entire dashboard.
 */
const DashboardStructure: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useDashboardStructureStyles();

    const drawerOpen = useSelector((state: RootState): boolean => state.userInterface.drawerOptions.open);

    const loggedIn: boolean = useSelector((state: RootState): boolean => state.accountInformation.loggedIn);

    const animationStarted: boolean = useSelector(
        (state: RootState): boolean => state.attackMap.animationStatus.animationStarted
    );
    const errorMessage: string | null = useSelector(
        (state: RootState): string | null => state.attackMap.animationStatus.errorMessage
    );

    const timeFilterStart: MaterialUiPickersDate = useSelector(
        (state: RootState): MaterialUiPickersDate => state.attackMap.options.timeFilterStart
    );
    const timeFilterEnd: MaterialUiPickersDate = useSelector(
        (state: RootState): MaterialUiPickersDate => state.attackMap.options.timeFilterEnd
    );

    // Requests for network log data once animation is started, or clear all network logs related data once animation is over or disrupted by user.
    useEffect((): void => {
        // Reset settings for attack map animation logic.
        const logsDataCleanup = (): void => {
            dispatch(attackMapActions.deleteLogsData());
            dispatch(attackMapActions.setLogsDataPointer(null));
            dispatch(attackMapActions.setLogsDataDone(false));
        };

        if (animationStarted) {
            logsDataCleanup();
            // Reset error message after another round of animation starts.
            dispatch(attackMapActions.setErrorMessage(null));

            // Send HTTP requests to get logs from backend recursively, until there are no more logs to be sent.
            const logsRequests = (): void => {
                axios
                    .get("http://localhost:8000/api/files/logs/")
                    .then((res) => {
                        // Base cases.
                        if (res.data.message === "completed") {
                            dispatch(attackMapActions.setLogsDataDone(true));
                            return;
                        }
                        if (res.data.message === "terminated") {
                            logsDataCleanup();
                            return;
                        }
                        // Recursive case.
                        dispatch(attackMapActions.updateLogsData(res.data));
                        logsRequests();
                    })
                    .catch((err) => {
                        dispatch(attackMapActions.setAnimationStarted(false));
                        if (err.response !== undefined) {
                            if (err.response.status === 403) {
                                dispatch(accountInformationActions.setLoggedIn(false));
                            }
                            dispatch(attackMapActions.setErrorMessage(err.response.data.message));
                            return;
                        }
                        dispatch(attackMapActions.setErrorMessage(err.message));
                    });
            };

            // Request backend API to request from Logstash, before requesting recursively for logs.
            axios
                .post(
                    "http://localhost:8000/api/files/retrieve/",
                    {
                        start_time:
                            timeFilterStart === null
                                ? null
                                : new Date(
                                      timeFilterStart.getTime() -
                                          timeFilterStart.getTimezoneOffset() * MINUTES * MILLISECONDS
                                  ),
                        end_time:
                            timeFilterEnd === null
                                ? null
                                : new Date(
                                      timeFilterEnd.getTime() -
                                          timeFilterEnd.getTimezoneOffset() * MINUTES * MILLISECONDS
                                  ),
                    },
                    {
                        headers: {
                            "X-CSRFToken": cookieParser.parse(document.cookie).csrftoken,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.message === "no logs to be animated") {
                        dispatch(attackMapActions.setAnimationStarted(false));
                        dispatch(attackMapActions.setErrorMessage("No logs matched the time filter values"));
                    }
                    if (res.data.message === "invalid time") {
                        dispatch(attackMapActions.setAnimationStarted(false));
                        dispatch(attackMapActions.setErrorMessage("Invalid time values for time filters"));
                    }
                    logsRequests();
                })
                .catch((err) => {
                    dispatch(attackMapActions.setAnimationStarted(false));
                    if (err.response !== undefined) {
                        if (err.response.status === 403) {
                            dispatch(accountInformationActions.setLoggedIn(false));
                        }
                        dispatch(attackMapActions.setErrorMessage(err.response.data.message));
                        return;
                    }
                    dispatch(attackMapActions.setErrorMessage(err.message));
                });
        } else {
            axios
                .get("http://localhost:8000/api/files/terminate/")
                .then((res) => {})
                .catch((err) => {
                    if (err.response !== undefined) {
                        dispatch(attackMapActions.setErrorMessage(err.response.data.message));
                        return;
                    }
                    dispatch(attackMapActions.setErrorMessage(err.message));
                });
            logsDataCleanup();
        }
    }, [animationStarted, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        // Apply different styles depending on if the drawer is opened or closed.
        <div
            className={clsx(classes.dashboard, {
                [classes.dashboardDrawerClose]: !drawerOpen,
                [classes.dashboardDrawerOpen]: drawerOpen,
                [classes.dashboardShift]: drawerOpen,
            })}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h6">NETWORK ATTACK MAP</Typography>
                </Grid>
                {/* Include logo of React-Leaflet to represent its identity. */}
                <Grid item container justify="flex-end" xs={6}>
                    <img src={reactLeafletLogo} alt="React Leaflet Logo" />
                </Grid>
                <Grid item xs={12} container justify="center">
                    <AttackMap />
                </Grid>
                {/* Network Logs Table only shown if user is logged in. */}
                <Grid item xs={12} container justify="center" alignItems="center">
                    {loggedIn ? (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="error" gutterBottom>
                                {errorMessage}
                            </Typography>
                            <LogsTable />
                        </Grid>
                    ) : (
                        <Typography variant="h6" color="error">
                            ATTACK DATA TABLE NOT AVAILABLE UNTIL LOGGED IN
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export { DashboardStructure };
