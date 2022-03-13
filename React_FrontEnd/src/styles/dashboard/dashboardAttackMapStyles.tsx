// Material UI
import { makeStyles, Theme } from "@material-ui/core";

// CSS constants.
const MAP_WIDTH: number | string = "100%";
const MAP_HEIGHT_MOBILE: number | string = "55vh"; // vh used instead of % as parent container has 0 height.
const MAP_HEIGHT_COMPUTER: number | string = 800;

// Styling options to use for elements within AttackMap component.
const useDashboardAttackMapStyles = makeStyles((theme: Theme) => ({
    attackMap: {
        width: MAP_WIDTH,
        height: MAP_HEIGHT_MOBILE,
        [theme.breakpoints.up("md")]: {
            height: MAP_HEIGHT_COMPUTER,
        },
    },
}));

export { useDashboardAttackMapStyles };
