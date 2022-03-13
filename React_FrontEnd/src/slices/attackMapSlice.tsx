// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttackMapState, LogData } from "../types/state/AttackMapState";
// Material UI
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
// React Color
import { ColorResult } from "react-color";
// Colour Conversion
import hexRgb, { RgbaObject } from "hex-rgb";
import { PRIMARY_COLOR as PRIMARY_COLOR_HEX } from "./userInterfaceSlice";

const PRIMARY_COLOR_RGBA: RgbaObject = hexRgb(PRIMARY_COLOR_HEX);

// Tracks attack map configuration options, as well as the data that should be drawn on the attack map.
const initialAttackMapState: AttackMapState = {
    options: {
        timeFilterStart: null,
        timeFilterEnd: null,
        speed: 1,
        // Default colour uses the theme's primary colour (in RGBA, for adjustable transparency).
        // Hex code and HSL don't need to match the primary color's RGBA value,
        // it is only there to satisfy the ColorResult type react-color uses.
        color: {
            hex: "#000000",
            rgb: {
                r: PRIMARY_COLOR_RGBA.red,
                g: PRIMARY_COLOR_RGBA.green,
                b: PRIMARY_COLOR_RGBA.blue,
                a: PRIMARY_COLOR_RGBA.alpha,
            },
            hsl: {
                h: 0,
                s: 0,
                l: 0,
                a: 1,
            },
        },
        showTooltips: true,
    },
    logsData: [],
    animationStatus: {
        animationStarted: false,
        logsDataPointer: null,
        logsDataDone: false,
        errorMessage: null,
    },
};

// Creates corresponding actions and reducers to modify the state.
const attackMapSlice = createSlice({
    name: "attackMap",
    initialState: initialAttackMapState,
    reducers: {
        setTimeFilterStart: (attackMapState, newTimeFilterStart: PayloadAction<MaterialUiPickersDate>): void => {
            attackMapState.options.timeFilterStart = newTimeFilterStart.payload;
        },
        setTimeFilterEnd: (attackMapState, newTimeFilterEnd: PayloadAction<MaterialUiPickersDate>): void => {
            attackMapState.options.timeFilterEnd = newTimeFilterEnd.payload;
        },
        setSpeed: (attackMapState, newSpeed: PayloadAction<number>): void => {
            attackMapState.options.speed = newSpeed.payload;
        },
        setColor: (attackMapState, newColor: PayloadAction<ColorResult>): void => {
            attackMapState.options.color = newColor.payload;
        },
        setShowTooltips: (attackMapState, isShowTooltips: PayloadAction<boolean>): void => {
            attackMapState.options.showTooltips = isShowTooltips.payload;
        },
        updateLogsData: (attackMapState, newLogsData: PayloadAction<LogData[]>): void => {
            newLogsData.payload = newLogsData.payload.map((newLogData: LogData): LogData => {
                return {
                    ...newLogData,
                    sourceCoordinatesString: newLogData.sourceCoordinates.map((sourceCoordinate: number): string =>
                        sourceCoordinate.toFixed(2)
                    ) as [string, string],
                    destCoordinatesString: newLogData.destCoordinates.map((destCoordinate: number): string =>
                        destCoordinate.toFixed(2)
                    ) as [string, string],
                };
            });
            attackMapState.logsData = attackMapState.logsData.concat(newLogsData.payload);
            if (attackMapState.animationStatus.logsDataPointer === null) {
                attackMapState.animationStatus.logsDataPointer = 0;
            }
        },
        setAnimationStarted: (attackMapState, isAnimationStarted: PayloadAction<boolean>): void => {
            attackMapState.animationStatus.animationStarted = isAnimationStarted.payload;
        },
        setLogsDataPointer: (attackMapState, newLogsDataPointer: PayloadAction<number | null>): void => {
            if (newLogsDataPointer.payload === null) {
                attackMapState.animationStatus.logsDataPointer = newLogsDataPointer.payload;
                return;
            }
            if (attackMapState.logsData[newLogsDataPointer.payload] === undefined) {
                if (attackMapState.animationStatus.logsDataDone) {
                    attackMapState.animationStatus.animationStarted = false;
                }
                return;
            }
            attackMapState.animationStatus.logsDataPointer = newLogsDataPointer.payload;
        },
        setLogsDataDone: (attackMapState, isLogsDataDone: PayloadAction<boolean>): void => {
            attackMapState.animationStatus.logsDataDone = isLogsDataDone.payload;
        },
        setErrorMessage: (attackMapState, newErrorMessage: PayloadAction<string | null>): void => {
            attackMapState.animationStatus.errorMessage = newErrorMessage.payload;
        },
        deleteLogsData: (attackMapState): void => {
            attackMapState.logsData = [];
        },
    },
});

const attackMapActions = attackMapSlice.actions;
const attackMapReducer = attackMapSlice.reducer;

export { attackMapActions, attackMapReducer };
