import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// const ENDPOINT = 'http://localhost:3000';
const ENDPOINT = process.env.REACT_APP_BACKEND;
let socket;

const useSocket = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    socket = io(ENDPOINT);

    socket.on('connect', () => {
      setSocketConnected(true);
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, socketConnected };
};

export default useSocket;
