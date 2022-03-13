// Material UI
import { makeStyles } from "@material-ui/core";

// CSS constants.
const TABLE_HEIGHT: number | string = "30vh"; // vh used instead of % as parent container has 0 height.

// Styling options to use for elements within DataTable component.
const useDashboardLogsTableStyles = makeStyles(() => ({
    dataTable: {
        "&.MuiDataGrid-root .MuiDataGrid-window": {
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none",
            },
        },
        height: TABLE_HEIGHT,
    },
}));

export { useDashboardLogsTableStyles };
