interface PolylineDimensions {
    width: number;
    height: number;
}

/**
 * Uses the Pythagoras theorem (width^2 + height^2)^0.5 to calculate polyline's length as a hypothenuse on a right-angled triangle.
 * @param polylineDimensions A Leaflet polyline's dimension information.
 * @returns {number} The length of a leaflet polyline, in pixels.
 */
const calculatePolylineLength = (polylineDimensions: PolylineDimensions | undefined): number => {
    if (polylineDimensions === undefined) {
        return 0;
    }
    const { width, height } = polylineDimensions;
    return Math.pow(Math.pow(width, 2) + Math.pow(height, 2), 0.5);
};

export { calculatePolylineLength };
