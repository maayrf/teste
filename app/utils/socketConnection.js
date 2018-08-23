import io from 'socket.io-client';
import { SOCKET_URL } from './constants';

const headers = {
  transportOptions: {
    polling: {
      extraHeaders: {
        'x-clientid': 'asdASDASdSADASd',
      },
    },
  },
};

export const createSocketConnection = (path, options = null) =>
  io(`${SOCKET_URL}${path}`, { ...options });
