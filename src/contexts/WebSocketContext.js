import React, { createContext, useContext, useEffect, useState } from 'react';
import createSocketConnection from '../services/createSocketConnection';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ endpoint, children }) => {
  const [data, setData] = useState(null);
  const [socket, setSocket] = useState(null);
  const reconnectInterval = 120000; // Retry after 2 minutes

  useEffect(() => {
    let reconnectTimeout;

    const handleReconnect = () => {
      reconnectTimeout = setTimeout(() => {
        connect();
      }, reconnectInterval);
    };

    const handleSetData = (newData) => {
      setData((prevData) => ({ ...prevData, ...newData }));
    };

    const connect = () => {
      const ws = createSocketConnection(
        endpoint,
        (message) => handleSetData(message), // Update state with received data
        handleReconnect,
        (error) => console.error('WebSocket error:', error)
      );
      setSocket(ws);
    };

    connect();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [endpoint,socket]);

  const sendMessage = (event, message) => {
    if (socket) {
      socket.send(event, message);
    } else {
      console.error('WebSocket is not connected. Cannot send message.');
    }
  };

  return (
    <WebSocketContext.Provider value={{ data, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};
