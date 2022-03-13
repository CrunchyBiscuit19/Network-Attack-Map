// React & Defined Components
import React, { ReactElement, useState, useEffect, useRef } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { attackMapActions } from "../../slices/attackMapSlice";
import { LogData } from "../../types/state/AttackMapState";
// Leaflet
import { Polyline, useMapEvents } from "react-leaflet";
import { Polyline as PolylineType } from "leaflet";
// React Color
import { RGBColor } from "react-color";
// Colour Conversion
import rgbHex from "rgb-hex";
// Hooks
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
// Helper functions
import { calculatePolylineLength } from "../../helpers/calculatePolylineLength";

// Controls the speed range (lowest and highest speeds) of the network line animation.
const SPEED_FACTOR: number = 0.0001;
// Used to reverse the drawn in direction to from start to end.
const DIRECTION: number = -1;
// Used to double the animation time for trailing line effect.
const ANIMATION_TIME: number = 2;

interface Props {}
/**
 * Draws the network attack lines on the Network Attack Map based on the parsed logs.
 * @returns {ReactElement} A component that utilises the base Polyline leaflet component to animate it.
 */
const PolylineAnimation: React.FC<Props> = (): ReactElement => {
    const dispatch = useDispatch();

    // Get the positions that the lines should be drawn to and from.
    const logsDataPointer: number = useSelector(
        (state: RootState) => state.attackMap.animationStatus.logsDataPointer as number
    );
    const logEntry: LogData = useSelector((state: RootState) => state.attackMap.logsData[logsDataPointer]);

    // Used to extract the dimensions (horizontal width & vertical height) of the network attack line.
    const animatedPolylineRef = useRef<PolylineType>(null);
    const [polylineLength, setPolylineLength] = useState<number>(0);
    const [animationProgress, setAnimationProgress] = useState<number>(0);
    const speed: number = useSelector((state: RootState): number => state.attackMap.options.speed);
    // Converts RGBA to hex code, since Polyline color only accepts a string.
    const COLOR_HEX: string = useSelector((state: RootState): string => {
        const COLOR_RGBA: RGBColor = state.attackMap.options.color.rgb;
        return `#${rgbHex(COLOR_RGBA.r, COLOR_RGBA.g, COLOR_RGBA.b, COLOR_RGBA.a)}`;
    });

    // Controls progress of animation frames.
    useAnimationFrame((deltaTime: number): void => {
        setAnimationProgress(
            (previousAnimationProgress) => previousAnimationProgress + deltaTime * (speed * SPEED_FACTOR)
        );
        // Once animation of one line has ended, reset animation progress and update positions of next line.
        if (animationProgress >= 1) {
            setAnimationProgress(0);
            dispatch(attackMapActions.setLogsDataPointer(logsDataPointer + 1));
        }
    });
    // Determine length of polyline to be animated.
    useEffect(() => {
        setPolylineLength(
            calculatePolylineLength((animatedPolylineRef.current as PolylineType).getElement()?.getBoundingClientRect())
        );
    }, [logEntry]);
    // Calculate propotional length of polyline when map is zoomed in and out.
    useMapEvents({
        zoom: (): void => {
            setPolylineLength(
                calculatePolylineLength(
                    (animatedPolylineRef.current as PolylineType).getElement()?.getBoundingClientRect()
                )
            );
        },
    });

    // Cleanup on unmount.
    useEffect(() => {
        return () => {
            setPolylineLength(0);
            setAnimationProgress(0);
        };
    }, []);

    return (
        <Polyline
            positions={[logEntry.sourceCoordinates, logEntry.destCoordinates]}
            pathOptions={{
                color: COLOR_HEX,
                // Offsets the line to replace the gap, giving impression line is drawn in.
                // Subtract by length of line, to show dashArray gap initially before offsetted line is brought into view.
                dashOffset: `${animationProgress * polylineLength * DIRECTION * ANIMATION_TIME - polylineLength}px`,
                // Creates gap in the line the length of the line itself, that can be brought into view to hide the line.
                dashArray: `${polylineLength}px`,
            }}
            ref={animatedPolylineRef}
        />
    );
};

export { PolylineAnimation };
