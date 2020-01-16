export const addToCart = (obj, number) => ({
    type: 'ADD_TO_CART',
    payload: {... obj, number}
});

export const removeFromCart = id => ({
    type: 'REMOVE_FROM_CART',
    payload: id
});
