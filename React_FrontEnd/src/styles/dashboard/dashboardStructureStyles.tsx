// Material UI
import { makeStyles, Theme } from "@material-ui/core";
// Others
import { DRAWER_WIDTH_COMPUTER } from "../appStyles";

// CSS constants.
const DASHBOARD_PADDING: number = 2;

// Styling options to use for elements within DashboardStructure component.
const useDashboardStructureStyles = makeStyles((theme: Theme) => ({
    dashboard: {
        padding: theme.spacing(DASHBOARD_PADDING),
    },
    // Specify margin to shift dashboard to create space for opened drawer, when on computer screens.
    dashboardShift: {
        [theme.breakpoints.up("md")]: {
            marginLeft: DRAWER_WIDTH_COMPUTER,
        },
    },
    // Smoother movement of dashboard content when drawer is opened.
    dashboardDrawerOpen: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    // Smoother movement of dashboard content when drawer is closed.
    dashboardDrawerClose: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export { useDashboardStructureStyles };
