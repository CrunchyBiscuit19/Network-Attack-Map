// React
import React, { ReactElement, useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { attackTableActions } from "../../slices/attackTableSlice";
import { LogData } from "../../types/state/AttackMapState";
// Material UI
import { DataGrid, GridToolbar, GridColDef } from "@material-ui/data-grid";
import { DataGridTable } from "../../types/reusable/DataGridTable";
import { useDashboardLogsTableStyles } from "../../styles/dashboard/dashboardLogsTableStyles";

interface Props {}
/**
 * Displays the network logs data as they are being animated on the Network Attack Map.
 * @returns {ReactElement} A DataGrid component displaying the network logs data as lines are being animated on the Netowrk Attack Map.
 */
const LogsTable: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();
    const classes = useDashboardLogsTableStyles();

    // Get data to display in table.
    const processedLogsDataRows: LogData[] = useSelector(
        (state: RootState): LogData[] => state.attackTable.processedLogsData.rows
    );
    const processedLogsDataColumns: GridColDef[] = useSelector(
        (state: RootState): GridColDef[] => state.attackTable.processedLogsData.columns
    );

    // Clear data in table on next round of animation.
    const animationStarted: boolean = useSelector(
        (state: RootState): boolean => state.attackMap.animationStatus.animationStarted
    );
    useEffect(() => {
        if (animationStarted) {
            dispatch(attackTableActions.setProcessedLogsDataRows([]));
        }
    }, [animationStarted, dispatch]);

    // Update the rows in the table entry by entry as animation goes on.
    const logsDataPointer: number | null = useSelector(
        (state: RootState): number | null => state.attackMap.animationStatus.logsDataPointer
    );
    const logData: LogData | null | undefined = useSelector((state: RootState): LogData | null | undefined => {
        if (logsDataPointer === null) {
            return null;
        }
        return state.attackMap.logsData[logsDataPointer];
    });
    useEffect(() => {
        if (logData === null || logData === undefined) {
            return;
        }
        dispatch(attackTableActions.setProcessedLogsDataRows(processedLogsDataRows.concat(logData)));
    }, [logData, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps
    // No need for processedLogsDataRows to be included as well.

    const LogsDataTable: DataGridTable = {
        rows: processedLogsDataRows
            .map((processedLogData, logDataIndex) => ({
                ...processedLogData,
                id: logDataIndex + 1,
                sourceCoordinatesString: `${processedLogData.sourceCoordinatesString[0]}, ${processedLogData.sourceCoordinatesString[1]}`,
                destCoordinatesString: `${processedLogData.destCoordinatesString[0]}, ${processedLogData.destCoordinatesString[1]}`,
            }))
            .reverse(),
        columns: processedLogsDataColumns,
    };

    return (
        <DataGrid
            className={classes.dataTable}
            rows={LogsDataTable.rows}
            columns={LogsDataTable.columns}
            components={{
                Toolbar: GridToolbar,
            }}
            density="compact"
        />
    );
};

export { LogsTable };
