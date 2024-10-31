import axios from 'axios'

import { API_URL } from '../config';
import { setTopUsers } from '../state/actionCreaters';

export const getTopUsers = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/api/users/top-10`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch(setTopUsers(response.data.data));
        } catch (error) {
            dispatch(setTopUsers([]));
            console.log('Error', error);
        }
    }
}