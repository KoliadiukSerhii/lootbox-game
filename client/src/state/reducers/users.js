import {
    LOGOUT,
    SET_USER,
    SET_TOP_USERS,
    SET_ONLINE_USERS,
    SET_CURRENT_USER_POINTS
} from '../constants';

const initialState = {
    topUsers: [],
    onlineUsers: [],
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        }

        case SET_TOP_USERS: {
            return {
                ...state,
                topUsers: action.payload
            }
        }

        case SET_ONLINE_USERS: {
            return {
                ...state,
                onlineUsers: action.payload
            }
        }

        case SET_CURRENT_USER_POINTS: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    winsCount: action.payload
                }
            }
        }

        case LOGOUT: {
            localStorage.removeItem('token');

            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        }

        default:
            return state
    }
}