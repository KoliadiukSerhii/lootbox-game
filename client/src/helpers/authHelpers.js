import axios from 'axios'

import { API_URL } from '../config';
import {
    setUser,
    setWsSocket,
    setTopUsers,
    setLootChests,
    setOnlineUsers,
    setLootHistory,
    setLootChestsOpened,
    setCurrentUserPoints
} from '../state/actionCreaters';
import { WEBSOCKET_API_URL } from '../config';

export const registration = ({ username, password }) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/registration`, {
                username,
                password
            });

            dispatch(setUser(response.data.user));

            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert(error.response?.data?.message || 'Error');
        }
    }
}

export const login = ({ username, password }) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                username,
                password
            });

            dispatch(setUser(response.data.user));

            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert(error.response?.data?.message || 'Error');
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch(setUser(response.data.user));

            localStorage.setItem('token', response.data.token);
        } catch (error) {
            localStorage.removeItem('token');
        }
    }
}

export const wsConnection = (username) => {
    return async dispatch => {
        try {
            const socket = new WebSocket(WEBSOCKET_API_URL);

            socket.onopen = () => {
                socket.send(JSON.stringify({
                    username: username,
                    method: 'connection'
                }));
            }

            socket.onclose = () => {
                socket.send(JSON.stringify({
                    username: username,
                    method: 'leave'
                }));
            }

            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                switch (msg.method) {
                    case 'connection':
                        dispatch(setOnlineUsers(msg.onlineUsers));
                        break;
                    case 'leave':
                        dispatch(setOnlineUsers(msg.onlineUsers));
                        break;
                    case 'update':
                        dispatch(setLootChests(msg.chests));
                        dispatch(setLootChestsOpened(msg.openedChests));
                        break;
                    case 'addChest':
                        dispatch(setLootChests(msg.chests));
                        dispatch(setLootChestsOpened(msg.openedChests));
                        dispatch(setCurrentUserPoints(msg.currentUserPoints));
                        dispatch(setLootHistory(msg.formattedLootHistory));
                        dispatch(setTopUsers(msg.topUsers));
                        break;
                }
            }

            dispatch(setWsSocket(socket));
        } catch (error) {

        }
    }
}