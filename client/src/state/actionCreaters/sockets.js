import {
    SET_WS_SOCKET
} from '../constants';

export const setWsSocket = (socket) => ({
    type: SET_WS_SOCKET,
    payload: socket
});
