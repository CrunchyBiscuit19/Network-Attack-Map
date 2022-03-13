// Material UI
import { makeStyles, Theme } from "@material-ui/core";

// CSS constants.
const DRAWER_WIDTH_MINIMUM: number | string = 240;
const DRAWER_WIDTH_MOBILE: number | string = "40%";
const DRAWER_WIDTH_COMPUTER: number | string = "17.5%";

// Styling options to use for elements within App component.
const useAppStyles = makeStyles((theme: Theme) => ({
    // Offset the space taken up by the toolbar on top to avoid overlapping.
    toolbarOffset: {
        ...theme.mixins.toolbar,
    },
    drawerPaperMobile: {
        width: DRAWER_WIDTH_MOBILE,
        minWidth: DRAWER_WIDTH_MINIMUM,
    },
    drawerPaperComputer: {
        zIndex: theme.zIndex.drawer,
        width: DRAWER_WIDTH_COMPUTER,
    },
}));

export { useAppStyles, DRAWER_WIDTH_COMPUTER };
