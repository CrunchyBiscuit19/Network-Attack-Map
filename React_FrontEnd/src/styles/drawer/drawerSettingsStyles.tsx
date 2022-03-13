// Material UI
import { makeStyles, Theme } from "@material-ui/core";

// CSS constants.
const TIMEPICKER_WIDTH: number | string = "100%";
const COLORPICKER_WIDTH: number | string = "100%";

// Styling options to use for elements within TimeFilter, SpeedSlider, and ColorPicker component.
const useDrawerSettingsStyles = makeStyles((theme: Theme) => ({
    timeFilter: {
        width: TIMEPICKER_WIDTH,
    },
    // ColorPicker is not a normal Material UI component,
    // !important is used to force styles to apply.
    colorPicker: {
        width: `${COLORPICKER_WIDTH}!important`,
        backgroundColor: `${theme.palette.background.default.toString()}!important`,
        "& label": {
            color: `${theme.palette.text.primary.toString()}!important`,
        },
    },
    textSize: {
        fontSize: "1.15rem",
        fontWeight: "bold",
    },
}));

export { useDrawerSettingsStyles };
