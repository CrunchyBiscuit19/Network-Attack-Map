// Redux
import { LogData } from "./AttackMapState";
// Material UI
import { GridColDef } from "@material-ui/data-grid";

interface ProcessedLogsData {
    rows: LogData[];
    columns: GridColDef[];
}

interface AttackTableState {
    processedLogsData: ProcessedLogsData;
}

export type { AttackTableState };
