const initialState = {
    items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            };
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
}