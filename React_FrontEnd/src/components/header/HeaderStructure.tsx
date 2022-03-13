// React & Defined Components
import React, { ReactElement } from "react";
import { AccountDialog } from "./HeaderAccountDialog";
// Redux
import { useDispatch } from "react-redux";
import { userInterfaceActions } from "../../slices/userInterfaceSlice";
// Material UI
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import { Settings as SettingsIcon, ExitToApp as ExitToAppIcon, Brightness3 as MoonIcon } from "@material-ui/icons";
import { useHeaderStructureStyles } from "../../styles/header/headerStructureStyles";
// Others
import cyberTestSystemslogo from "../../assets/cyberTestSystemsLogo.png";

interface Props {}
/**
 * Puts together the different components and functionalities responsible by the web application header.
 * @returns {ReactElement} A single component that can be included in the web application as the entire header.
 */
const HeaderStructure: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useHeaderStructureStyles();
    return (
        <AppBar className={classes.header}>
            <Toolbar disableGutters={true}>
                <Grid container justify="space-between">
                    {/* Button to open and close the drawer. */}
                    <Grid item xs={2}>
                        <IconButton onClick={() => dispatch(userInterfaceActions.toggleDrawerOpen())}>
                            <SettingsIcon />
                        </IconButton>
                    </Grid>
                    {/* Display the Company's logo prominently. */}
                    <Grid item container justify="center" xs={2}>
                        <img src={cyberTestSystemslogo} alt="Cyber Test Systems Logo" />
                    </Grid>
                    <Grid item container justify="flex-end" xs={4} sm={2}>
                        {/* Button to turn on and off dark mode. */}
                        <IconButton onClick={() => dispatch(userInterfaceActions.toggleDarkMode())}>
                            <MoonIcon />
                        </IconButton>
                        {/* Button to open and close the account dialog. */}
                        <IconButton onClick={() => dispatch(userInterfaceActions.toggleAccountDialogOpen())}>
                            <ExitToAppIcon />
                        </IconButton>
                        <AccountDialog />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export { HeaderStructure };
