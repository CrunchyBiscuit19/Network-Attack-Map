// React & Defined Components
import React, { ReactElement } from "react";
import { PolylineAnimation } from "./DashboardPolylineAnimation";
import { MapMarkers } from "./DashboardMapMarkers";
// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { LogData } from "../../types/state/AttackMapState";
// Leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngBoundsExpression, LatLngTuple } from "leaflet";
// Material UI
import { StylesProvider } from "@material-ui/core";
import "../../styles/dashboard/dashboardAttackMapStyles.css";

// Constants to mark boundaries of which part of the Network Attack Map to display.
const MAP_CORNER_TOP_RIGHT: LatLngTuple = [85, 190];
const MAP_CORNER_BOTTOM_LEFT: LatLngTuple = [-60, -170];
const MAP_BOUNDARY: LatLngBoundsExpression = [MAP_CORNER_TOP_RIGHT, MAP_CORNER_BOTTOM_LEFT];

interface Props {}
/**
 * Puts together the React-Leaflet components to form the Network Attack Map.
 * @returns {ReactElement} The Network Attack Map component on which lines can be animated.
 */
const AttackMap: React.FC<Props> = (): ReactElement => {
    const animationStarted: boolean = useSelector(
        (state: RootState): boolean => state.attackMap.animationStatus.animationStarted
    );
    const logsDataPointer: number | null = useSelector(
        (state: RootState): number | null => state.attackMap.animationStatus.logsDataPointer
    );
    const logEntry: LogData = useSelector((state: RootState) => state.attackMap.logsData[logsDataPointer as number]);

    // Must use CSS here, map will disappear when UI updates in production build if using Material UI makeStyles .
    // JSS class does not update correctly using Material UI makeStyles, so styles applied are removed on UI updates.
    return (
        <StylesProvider injectFirst>
            <MapContainer
                className="attackMap"
                center={[0, 0]}
                zoom={2}
                minZoom={1}
                zoomDelta={0.25}
                doubleClickZoom={false}
                maxBounds={MAP_BOUNDARY}
                maxBoundsViscosity={1}
                worldCopyJump={false}
            >
                <TileLayer
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Lines will only start animating if there are attack data logs already received. */}
                {/* Markers can only point to start and end of lines when the coordinates are known. */}
                {animationStarted && logsDataPointer !== null && logEntry !== undefined ? (
                    <div>
                        <PolylineAnimation />
                        <MapMarkers />
                    </div>
                ) : (
                    <div></div>
                )}
            </MapContainer>
        </StylesProvider>
    );
};

export { AttackMap };
