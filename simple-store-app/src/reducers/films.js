const initialState = {
    isReady: false,
    items: null,
    filterBy: {
        filter: 'all',
        filteredItems: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILM':
            return {
                ...state,
                items: action.payload,
                isReady: true
            };
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.payload
            };
        case 'SET_IS_READY':
            return {
                ...state,
                isReady: action.payload
            };
            break;
        default:
            return state;
    }
}