import {
    LOGOUT,
    SET_USER,
    SET_TOP_USERS,
    SET_ONLINE_USERS,
    SET_CURRENT_USER_POINTS
} from '../constants';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setCurrentUserPoints = (points) => ({
    type: SET_CURRENT_USER_POINTS,
    payload: points
});

export const setTopUsers = (users) => ({
    type: SET_TOP_USERS,
    payload: users
});

export const setOnlineUsers = (users) => ({
    type: SET_ONLINE_USERS,
    payload: users
});

export const logout = () => ({
    type: LOGOUT
});

