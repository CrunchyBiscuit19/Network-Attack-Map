// Material UI
import { makeStyles, Theme } from "@material-ui/core";

// CSS constants.
const BUTTON_WIDTH: number | string = "100%";
const BUTTON_PADDING_SIDES: number = 0.75;
const BUTTON_PADDING_TOP: number = 1.5;

const ACCORDION_PADDING: number = 0.75;
const ACCORDION_MARGIN_TOP: number | string = 0;
const ACCORDION_MARGIN_BOTTOM: number | string = 0;

// Styling options to use for elements within DrawerStructure component.
const useDrawerStructureStyles = makeStyles((theme: Theme) => ({
    drawerStructure: {
        overflow: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    button: {
        width: BUTTON_WIDTH,
    },
    buttonGridItem: {
        paddingLeft: theme.spacing(BUTTON_PADDING_SIDES),
        paddingRight: theme.spacing(BUTTON_PADDING_SIDES),
        paddingTop: theme.spacing(BUTTON_PADDING_TOP),
    },
    accordion: {
        "&.MuiAccordion-root:before": {
            display: "none",
        },
        "&.Mui-expanded": {
            marginTop: ACCORDION_MARGIN_TOP,
            marginBottom: ACCORDION_MARGIN_BOTTOM,
        },
        padding: theme.spacing(ACCORDION_PADDING), // Padding for accordions, to avoid momentary scrollbar when expanding or collapsing.
    },
}));

export { useDrawerStructureStyles };
