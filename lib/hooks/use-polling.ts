/**
 * Custom hook for polling data
 * 
 * This hook provides a more efficient way to refresh data periodically.
 * It uses a single interval for all components that need to poll the same data.
 */

import { useEffect, useRef } from 'react';

// Map of active polling intervals
const activePolling = new Map<string, {
  interval: NodeJS.Timeout;
  count: number;
  callback: () => void;
}>();

/**
 * Custom hook for polling data
 * 
 * @param key A unique key for this polling interval
 * @param callback The function to call on each interval
 * @param interval The interval in milliseconds (default: 30000)
 */
export function usePolling(
  key: string,
  callback: () => void,
  interval: number = 30000
): void {
  // Keep track of the callback in a ref
  const callbackRef = useRef(callback);
  
  // Update the callback ref when the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    // Create a new polling interval if one doesn't exist for this key
    if (!activePolling.has(key)) {
      const intervalId = setInterval(() => {
        const polling = activePolling.get(key);
        if (polling) {
          polling.callback();
        }
      }, interval);
      
      activePolling.set(key, {
        interval: intervalId,
        count: 1,
        callback: () => callbackRef.current(),
      });
    } else {
      // Increment the count for this polling interval
      const polling = activePolling.get(key)!;
      polling.count++;
      polling.callback = () => callbackRef.current();
    }
    
    // Clean up when the component unmounts
    return () => {
      const polling = activePolling.get(key);
      if (polling) {
        polling.count--;
        
        // If this is the last component using this polling interval, clear it
        if (polling.count <= 0) {
          clearInterval(polling.interval);
          activePolling.delete(key);
        }
      }
    };
  }, [key, interval]);
}
