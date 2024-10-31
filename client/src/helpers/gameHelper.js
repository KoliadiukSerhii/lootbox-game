import axios from 'axios'

import { API_URL } from '../config';
import { setLootHistory } from '../state/actionCreaters';

export const getLootHistory = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/game/loot-history`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch(setLootHistory(response.data.data));
        } catch (error) {
            dispatch(setLootHistory([]));
            console.log('Error', error);
        }
    }
}