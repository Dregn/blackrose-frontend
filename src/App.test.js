const { io } = require("socket.io-client");

// Server URL
const serverUrl = "http://localhost:8000";

// JWT Token
const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXR0YSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJleHAiOjE3MzY4ODczMDV9.3ARmd56f0HcJ62QtePihPYAtdAS0vq1IKKcqmCSZ--g";

// Connect to the Socket.IO server with WebSocket-only transport and custom headers
const socket = io(serverUrl, {
  extraHeaders: {
    Authorization: authToken,
  },
  transports: ["websocket"], // Force WebSocket transport
});

console.log(socket)

// Listen for connection
socket.on("connect", () => {
  console.log("Connected to the server");
  // Start OHLC stream
  socket.emit("ohlc-stream", { message: "Start streaming OHLC data" });
});

// Listen for OHLC data
socket.on("ohlc-data", (data) => {
  console.log("Received OHLC data:", data);
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

// Handle connection errors
socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});
