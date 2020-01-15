// export const setFilter = filter => ({
//     type: 'SET_FILTER',
//     payload: filter
// });

export const setFilter = (filter, filteredItems) => ({
    type: 'SET_FILTER',
    payload: {
        filter: filter,
        filteredItems: filteredItems
    }
});
