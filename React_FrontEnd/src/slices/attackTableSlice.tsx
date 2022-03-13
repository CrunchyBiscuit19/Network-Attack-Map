// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogData } from "../types/state/AttackMapState";
// Material UI
import { AttackTableState } from "../types/state/AttackTableState";

const initialAttackTableState: AttackTableState = {
    processedLogsData: {
        rows: [],
        columns: [
            { field: "timestamp", headerName: "Timestamp", flex: 1.1 },
            { field: "severity", headerName: "Severity", flex: 0.9 },
            { field: "type", headerName: "Type", flex: 0.8 },
            { field: "threatContentName", headerName: "Threat Content Name", flex: 1.45 },
            { field: "threatContentType", headerName: "Threat Content Type", flex: 1.4 },
            { field: "urlFilename", headerName: "URL / Filename", flex: 1.25 },
            { field: "application", headerName: "Application", flex: 1.1 },
            { field: "repeatCount", headerName: "Repeat Count", flex: 1.15 },
            { field: "ipProtocol", headerName: "IP Protocol", flex: 1 },
            { field: "sourceAddress", headerName: "Src. IP", flex: 0.9 },
            { field: "sourcePort", headerName: "Src. Port", flex: 1 },
            { field: "sourceCountry", headerName: "Src. Country", flex: 1 },
            { field: "sourceCoordinatesString", headerName: "Src. Lat-Long", flex: 1 },
            { field: "destAddress", headerName: "Dst. IP", flex: 0.9 },
            { field: "destPort", headerName: "Dst. Port", flex: 1 },
            { field: "destCountry", headerName: "Dst. Country", flex: 1 },
            { field: "destCoordinatesString", headerName: "Dst. Lat-Long", flex: 1 },
        ],
    },
};

const attackTableSlice = createSlice({
    name: "attackTable",
    initialState: initialAttackTableState,
    reducers: {
        setProcessedLogsDataRows: (attackTableState, newProcessedLogsDataRows: PayloadAction<LogData[]>) => {
            attackTableState.processedLogsData.rows = newProcessedLogsDataRows.payload;
        },
    },
});

const attackTableActions = attackTableSlice.actions;
const attackTableReducer = attackTableSlice.reducer;

export { attackTableActions, attackTableReducer };
