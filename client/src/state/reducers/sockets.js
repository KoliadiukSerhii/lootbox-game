import {
    SET_WS_SOCKET
} from '../constants';

const initialState = {
    socket: null
};

export default function sockets(state = initialState, action) {
    switch (action.type) {
        case SET_WS_SOCKET: {
            return {
                ...state,
                socket: action.payload
            };
        }

        default:
            return state;
    }
}
