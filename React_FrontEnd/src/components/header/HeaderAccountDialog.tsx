// React & Defined Components
import React, { ReactElement } from "react";
import { LoginForm, RegisterForm, AccountInfo } from "./HeaderAccountForms";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { userInterfaceActions } from "../../slices/userInterfaceSlice";
// Material UI
import { Paper, Dialog, DialogContent, Tab } from "@material-ui/core";
import { TabContext, TabPanel, TabList } from "@material-ui/lab";
import { TabPanelContent } from "../../types/reusable/TabPanelContent";
import { useHeaderAccountDialogStyles } from "../../styles/header/headerAccountDialogStyles";

// Content of the panels to be viewed in the dialog.
const tabPanels: TabPanelContent[] = [
    {
        name: "loginForm",
        title: "Login",
        component: <LoginForm />,
    },
    {
        name: "registerForm",
        title: "Register",
        component: <RegisterForm />,
    },
    {
        name: "accountInfo",
        title: "Account Info",
        component: <AccountInfo />,
    },
];

interface Props {}
/**
 * A dialog interface in which users can login, register, and view their account information.
 * @returns {ReactElement} Dialog component controlled by button in header.
 */
const AccountDialog: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useHeaderAccountDialogStyles();

    const dialogOpen: boolean = useSelector(
        (state: RootState): boolean => state.userInterface.accountDialogOptions.open
    );
    const accountDialogTab: string | null = useSelector(
        (state: RootState): string | null => state.userInterface.accountDialogOptions.tab
    );

    return (
        <Dialog
            maxWidth="lg"
            fullWidth
            open={dialogOpen}
            onClose={() => dispatch(userInterfaceActions.toggleAccountDialogOpen())}
        >
            <DialogContent classes={{ root: classes.dialogForm }}>
                {/* Gives a context in which tab panels can be uniquely identified and controlled. */}
                <TabContext value={accountDialogTab === null ? "loginForm" : accountDialogTab}>
                    <Paper>
                        <TabList
                            variant="fullWidth" // Must be set to "fullWidth" else display problems start to occur.
                            onChange={(event: React.ChangeEvent<{}>, newTab: string) =>
                                dispatch(userInterfaceActions.setAccountDialogTab(newTab))
                            }
                        >
                            {/* Names of tabs included programmatically (from tabPanels) to avoid repetitive boilerplate code. */}
                            {tabPanels.map(
                                (tabPanel): ReactElement => (
                                    <Tab
                                        label={<span className={classes.dialogTabName}>{tabPanel.title}</span>}
                                        value={tabPanel.name}
                                        key={tabPanel.name}
                                    />
                                )
                            )}
                        </TabList>
                    </Paper>
                    {/* Content of tab panels included programmatically (from tabPanels) to avoid repetitive boilerplate code. */}
                    {tabPanels.map(
                        (tabPanel): ReactElement => (
                            <TabPanel value={tabPanel.name} key={tabPanel.name}>
                                {tabPanel.component}
                            </TabPanel>
                        )
                    )}
                </TabContext>
            </DialogContent>
        </Dialog>
    );
};

export { AccountDialog };
