import { combineReducers } from 'redux';
import sockets from './sockets';
import users from './users';
import game from './game';

const rootReducer = combineReducers({
    sockets: sockets,
    users: users,
    game: game
});

export default rootReducer;