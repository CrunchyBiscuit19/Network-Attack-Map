// Material UI
import { makeStyles } from "@material-ui/core";

// CSS constants.
const DIALOG_FORM_PADDING: number | string = 0;
const DIALOG_FORM_TITLE_FONT_SIZE: number | string = "1rem";

// Styling options to use for elements within AccountDialog component.
const useHeaderAccountDialogStyles = makeStyles(() => ({
    dialogForm: {
        padding: DIALOG_FORM_PADDING,
        "&:first-child": {
            padding: DIALOG_FORM_PADDING,
        },
    },
    dialogTabName: {
        fontSize: DIALOG_FORM_TITLE_FONT_SIZE,
    },
}));

export { useHeaderAccountDialogStyles };
