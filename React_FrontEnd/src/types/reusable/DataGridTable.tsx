// Material UI
import { GridRowData, GridColDef } from "@material-ui/data-grid";

// For objects representing the rows and columns data Material UI's DataGrid component needs.
interface DataGridTable {
    rows: GridRowData[];
    columns: GridColDef[];
}

export type { DataGridTable };
