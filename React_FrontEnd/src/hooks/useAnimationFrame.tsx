// React & Defined Components
import { useEffect, useRef } from "react";

/**
 * Handles the animation frames of React components.
 * @param callback To change corresponding values in the component the hook is used in.
 */
const useAnimationFrame = (callback: (deltaTime: number) => void) => {
    const requestAnimationFrameRef = useRef<number>(0);
    const previousTimeRef = useRef<number>(0);

    useEffect(() => {
        const animateFrame = (time: number) => {
            // Calculates time between previous and current frame.
            if (previousTimeRef.current !== 0) {
                const deltaTime = time - previousTimeRef.current;
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            // Call the next frame in the animation.
            requestAnimationFrameRef.current = requestAnimationFrame(animateFrame);
        };
        // Starts the animation.
        requestAnimationFrameRef.current = requestAnimationFrame(animateFrame);
        // Stop animation when the polyline is removed.
        return () => cancelAnimationFrame(requestAnimationFrameRef.current);
    }, [callback]);
};

export { useAnimationFrame };
