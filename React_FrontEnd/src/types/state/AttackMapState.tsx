// Material UI
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
// Leaflet
import { LatLngTuple } from "leaflet";
// React Color
import { ColorResult } from "react-color";

// Configuration options to modify how the Network Attack Map animates lines.
interface Options {
    timeFilterStart: MaterialUiPickersDate;
    timeFilterEnd: MaterialUiPickersDate;
    speed: number;
    color: ColorResult;
    showTooltips: boolean;
}

// Details of each network log file entered by users.
interface LogData {
    id: number;
    timestamp: Date;
    severity: string;
    type: string;
    threatContentName: string;
    threatContentType: string;
    urlFilename: string;
    application: string;
    repeatCount: number;
    ipProtocol: string;
    sourceAddress: string;
    sourceCoordinates: LatLngTuple;
    sourceCoordinatesString: [string, string];
    sourcePort: number;
    sourceCountry: string;
    destAddress: string;
    destCoordinates: LatLngTuple;
    destCoordinatesString: [string, string];
    destPort: string;
    destCountry: string;
}

interface AnimationStatus {
    animationStarted: boolean;
    logsDataPointer: number | null; // Points to data in logsData that should be animated / shown.
    logsDataDone: boolean;
    errorMessage: string | null;
}

interface AttackMapState {
    options: Options;
    logsData: LogData[];
    animationStatus: AnimationStatus;
}

export type { AttackMapState, LogData };
