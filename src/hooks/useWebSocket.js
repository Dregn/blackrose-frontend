import { useWebSocketContext } from '../contexts/WebSocketContext';

const useWebSocket = () => {
  return useWebSocketContext();
};

export default useWebSocket;
