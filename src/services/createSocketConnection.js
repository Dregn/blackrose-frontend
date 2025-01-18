import { io } from "socket.io-client";

const createSocketConnection = (endpoint, onData, onReconnect, onError) => {
  const serverUrl = "https://blackrose-assignment.onrender.com"; // Update with your backend URL
  const retryInterval = 120000; // Retry after 2 minutes (120,000 ms)
  let socket = null; // Global socket instance
  let isManuallyClosed = false;

  const connect = () => {
    const authToken = sessionStorage.getItem("token"); // Fetch the token from sessionStorage

    if (!authToken) {
      console.error("No auth token found in sessionStorage. Retrying in 2 minutes...");
      setTimeout(connect, retryInterval); // Retry after 2 minutes
      return;
    }

    try {
      // Initialize the Socket.IO connection with WebSocket-only transport and custom headers
      socket = io(serverUrl, {
        extraHeaders: {
            Authorization: `Bearer ${authToken}`,
        },
        transports: ["polling"], // Force WebSocket transport
      });

      console.log(onData)

      // Listen for connection
      socket.on("connect", () => {
        console.log("Connected to the server");
        socket.emit("ohlc-stream", { message: "Start streaming OHLC data" });
      });

      // Listen for incoming data
      socket.on("ohlc-data", (data) => {
        console.log("Received OHLC data:", data);
        if (onData) onData(data); // Pass the data to the callback
      });

      // Handle connection errors
      socket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error.message);
        if (!isManuallyClosed) {
          console.log("Retrying WebSocket connection in 2 minutes...");
          if (onReconnect) onReconnect(); // Trigger reconnect logic
          setTimeout(connect, retryInterval);
        }
      });

      // Handle disconnection
      socket.on("disconnect", (reason) => {
        console.log("WebSocket disconnected. Reason:", reason);
        if (!isManuallyClosed) {
          console.log("Retrying WebSocket connection in 2 minutes...");
          if (onReconnect) onReconnect(); // Trigger reconnect logic
          setTimeout(connect, retryInterval);
        }
      });
    } catch (error) {
      console.error("Unexpected error in WebSocket connection:", error);
      console.log("Retrying WebSocket connection in 2 minutes...");
      if (onError) onError(error);
      setTimeout(connect, retryInterval); // Retry after 2 minutes
    }
  };

  const close = () => {
    isManuallyClosed = true;
    if (socket) {
      console.log("Closing WebSocket connection...");
      socket.disconnect();
    }
  };

  const send = (event, data) => {
    if (socket && socket.connected) {
      socket.emit(event, data);
    } else {
      console.error("Socket is not connected. Cannot send message.");
    }
  };

  // Start the connection
  connect();

  return { send, close };
};

export default createSocketConnection;
