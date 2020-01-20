export const addToFavorites = obj => ({
    type: 'ADD_TO_FAVORITES',
    payload: obj
});

export const removeFromFavorites = id => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: id
});
