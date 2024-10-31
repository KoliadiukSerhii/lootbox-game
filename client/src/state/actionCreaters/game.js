import {
    SET_LOOT_HISTORY,
    SET_LOOT_CHESTS,
    SET_LOOT_CHESTS_OPEN
} from '../constants';

export const setLootChests = (chests) => ({
    type: SET_LOOT_CHESTS,
    payload: chests
});

export const setLootChestsOpened = (openedChests) => ({
    type: SET_LOOT_CHESTS_OPEN,
    payload: openedChests
});

export const setLootHistory = (lootHistory) => ({
    type: SET_LOOT_HISTORY,
    payload: lootHistory
});