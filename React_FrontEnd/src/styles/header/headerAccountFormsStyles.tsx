// Material UI
import { makeStyles } from "@material-ui/core";

// CSS constants.
const DIALOG_FORM_WIDTH: number | string = "100%";
const DIALOG_FORM_TEXTFIELD_MINIMUM_WIDTH: number | string = "50%";

// Styling options to use for elements within LoginForm, RegisterForm, and AccountInfo component.
const useHeaderAccountFormsStyles = makeStyles(() => ({
    dialogForm: {
        width: DIALOG_FORM_WIDTH,
    },
    dialogFormTextField: {
        minWidth: DIALOG_FORM_TEXTFIELD_MINIMUM_WIDTH,
    },
    hideError: {
        display: "none",
    },
}));

export { useHeaderAccountFormsStyles };
