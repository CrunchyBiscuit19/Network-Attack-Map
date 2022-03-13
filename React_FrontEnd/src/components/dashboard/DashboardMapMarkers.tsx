// React & Defined Components
import React, { ReactElement, useState, useEffect } from "react";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LogData } from "../../types/state/AttackMapState";
// Leaflet
import { Marker, Tooltip } from "react-leaflet";
import { PointExpression, Icon as LeafletIcon } from "leaflet";
// Material UI
import { Typography } from "@material-ui/core";
import { useDashboardMapmarkersStyles } from "../../styles/dashboard/dashboardMapMarkersStyles";
// Others
import greenPin from "../../assets/greenPin.png";
import redPin from "../../assets/redPin.png";
import bluePin from "../../assets/bluePin.png";

// Values used to adjust position and size of markers on the map.
const TOOLTIP_OFFSET: PointExpression = [0, 5];
const ICON_SIZE_SCALING: PointExpression = [25, 70];

// The start and end icons.
const startIcon = new LeafletIcon({ iconUrl: greenPin, iconSize: ICON_SIZE_SCALING });
const endIcon = new LeafletIcon({ iconUrl: redPin, iconSize: ICON_SIZE_SCALING });
const samePositionIcon = new LeafletIcon({ iconUrl: bluePin, iconSize: ICON_SIZE_SCALING });

interface Props {}
/**
 * Shows the green and red markers on the map according to where the attack line starts and ends.
 * @returns {ReactElement} React Leaflet Marker and Tooltip components to annotate the network attack lines.
 */
const MapMarkers: React.FC<Props> = (): ReactElement => {
    const classes = useDashboardMapmarkersStyles();

    const logsDataPointer: number = useSelector(
        (state: RootState) => state.attackMap.animationStatus.logsDataPointer as number
    );
    const logEntry: LogData = useSelector((state: RootState): LogData => state.attackMap.logsData[logsDataPointer]);
    const [sameCoordinates, setSameCoordinates] = useState<boolean>(false);
    const showTooltips: boolean = useSelector((state: RootState): boolean => state.attackMap.options.showTooltips);

    // Flag attack data with same start and end positions.
    useEffect(() => {
        setSameCoordinates(JSON.stringify(logEntry.sourceCoordinates) === JSON.stringify(logEntry.destCoordinates));
    }, [logEntry]);

    return (
        <div>
            {/* One marker at the start, another at the end. */}
            {/* If log entries have same start and end, replace with single blue pin. */}
            {/* Do not use array map. The coordinates do not output correctly. */}
            {sameCoordinates ? (
                <div>
                    <Marker position={logEntry.sourceCoordinates} icon={samePositionIcon}>
                        {showTooltips ? (
                            <Tooltip offset={TOOLTIP_OFFSET} direction="bottom" permanent>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    {logEntry.sourceCountry}
                                    {" [LOCAL]"}
                                </Typography>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    [{logEntry.sourceCoordinatesString[0]}, {logEntry.sourceCoordinatesString[1]}]
                                </Typography>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    {`${logEntry.sourceAddress} : ${logEntry.sourcePort} => ${logEntry.destAddress} : ${logEntry.destPort}`}
                                </Typography>
                            </Tooltip>
                        ) : (
                            <div></div>
                        )}
                    </Marker>
                </div>
            ) : (
                <div>
                    <Marker position={logEntry.sourceCoordinates} icon={startIcon}>
                        {showTooltips ? (
                            <Tooltip offset={TOOLTIP_OFFSET} direction="bottom" permanent>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    {logEntry.sourceCountry}
                                </Typography>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    [{logEntry.sourceCoordinatesString[0]}, {logEntry.sourceCoordinatesString[1]}]
                                </Typography>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    {`${logEntry.sourceAddress} : ${logEntry.sourcePort}`}
                                </Typography>
                            </Tooltip>
                        ) : (
                            <div></div>
                        )}
                    </Marker>
                    <Marker position={logEntry.destCoordinates} icon={endIcon}>
                        {showTooltips ? (
                            <Tooltip offset={TOOLTIP_OFFSET} direction="bottom" permanent>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    {logEntry.destCountry}
                                </Typography>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    [{logEntry.destCoordinatesString[0]}, {logEntry.destCoordinatesString[1]}]
                                </Typography>
                                <Typography variant="subtitle2" className={classes.textCenter}>
                                    {`${logEntry.destAddress} : ${logEntry.destPort}`}
                                </Typography>
                            </Tooltip>
                        ) : (
                            <div></div>
                        )}
                    </Marker>
                </div>
            )}
        </div>
    );
};

export { MapMarkers };
