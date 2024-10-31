import {
    SET_LOOT_HISTORY,
    SET_LOOT_CHESTS,
    SET_LOOT_CHESTS_OPEN
} from '../constants';

const initialState = {
    chests: [],
    openedChests: [],
    lootHistory: []
}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOOT_HISTORY: {
            return {
                ...state,
                lootHistory: action.payload
            }
        }

        case SET_LOOT_CHESTS: {
            return {
                ...state,
                chests: action.payload
            }
        }

        case SET_LOOT_CHESTS_OPEN: {
            return {
                ...state,
                openedChests: action.payload
            }
        }

        default:
            return state
    }
}