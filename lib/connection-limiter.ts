/**
 * Global connection limiter to prevent too many simultaneous database connections
 */

// Maximum number of concurrent connections
const MAX_CONCURRENT_CONNECTIONS = 2;

// Current number of active connections
let activeConnections = 0;

// Queue of pending connection requests
type ConnectionRequest = {
  resolve: () => void;
  reject: (error: Error) => void;
};
const connectionQueue: ConnectionRequest[] = [];

// Function to acquire a connection slot
export async function acquireConnectionSlot(): Promise<void> {
  // If we have available connection slots, use one immediately
  if (activeConnections < MAX_CONCURRENT_CONNECTIONS) {
    activeConnections++;
    return Promise.resolve();
  }

  // Otherwise, queue the request
  return new Promise<void>((resolve, reject) => {
    // Add a timeout to prevent indefinite waiting
    const timeoutId = setTimeout(() => {
      // Remove this request from the queue
      const index = connectionQueue.findIndex(req => req.resolve === resolve);
      if (index !== -1) {
        connectionQueue.splice(index, 1);
      }
      reject(new Error('Connection request timed out'));
    }, 5000); // 5 second timeout

    // Add the request to the queue with a wrapper that clears the timeout
    connectionQueue.push({
      resolve: () => {
        clearTimeout(timeoutId);
        activeConnections++;
        resolve();
      },
      reject: (error) => {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  });
}

// Function to release a connection slot
export function releaseConnectionSlot(): void {
  // Decrement the active connection count
  if (activeConnections > 0) {
    activeConnections--;
  }

  // If there are pending requests and we have available slots, process the next request
  if (connectionQueue.length > 0 && activeConnections < MAX_CONCURRENT_CONNECTIONS) {
    const nextRequest = connectionQueue.shift();
    if (nextRequest) {
      nextRequest.resolve();
    }
  }
}

// Function to get the current connection status
export function getConnectionStatus(): { active: number, queued: number } {
  return {
    active: activeConnections,
    queued: connectionQueue.length
  };
}
