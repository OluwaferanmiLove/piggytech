import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';

type LayoutDimensions = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type UseLayoutHeightReturn = {
  height: number | null,
  onLayout: (event: LayoutChangeEvent) => void,
  dimensions: LayoutDimensions | null,
  flexStyle: {flex: number} | undefined
};

/**
 * Custom hook to measure the height and other dimensions of a view in React Native
 * with a debounced update
 * @param delay - Delay in milliseconds before updating dimensions (default: 1000ms)
 * @returns {UseLayoutHeightReturn} A tuple containing the height, onLayout handler, and full dimensions
 */
const useLayoutHeight = (delay: number = 700): UseLayoutHeightReturn => {
  const [height, setHeight] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<LayoutDimensions | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onLayout = useCallback(
    (event: LayoutChangeEvent): void => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      const { layout } = event.nativeEvent;
      timeoutRef.current = setTimeout(() => {
        const layoutDimensions: LayoutDimensions = {
          height: layout.height,
          width: layout.width,
          x: layout.x,
          y: layout.y,
        };

        setHeight(layout.height);
        setDimensions(layoutDimensions);
      }, delay);
    },
    [delay],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const screenHeight = Dimensions.get('screen').height;

  const flexStyle = useMemo(() => {
    const viewHeight = height ?? 0;

    // calculate that the view container height is overflowing
    const isHeightRequireFlex = viewHeight >= 0.67 * screenHeight;
    // if (isKeyboardVisible === true) {
    //   return { flex: 1 };
    // }

    if (isHeightRequireFlex === true) {
      return { flex: 1 };
    }

    return undefined;
  }, [height]);

  return {height, onLayout, dimensions, flexStyle};
};

export default useLayoutHeight;
