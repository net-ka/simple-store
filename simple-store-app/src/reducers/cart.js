const initialState = {
    items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case 'CHANGE_CART_NUMBER':
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id !== action.payload.id) {
                        return item;
                    }
                    item.number = action.payload.number;
                    return item;
                })
            };
        default:
            return state;
    }
}