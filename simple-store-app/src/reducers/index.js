import { combineReducers } from 'redux';

import films from './films';
import cart from './cart';
import favorites from './favorites';

export default combineReducers({
    films,
    cart,
    favorites
});