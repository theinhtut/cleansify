// Job Requests Reducer
const requestsReducerDefaultState = [];

const requestsReducer =(state = requestsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_REQUEST':
        return [...state, action.request];
        default:
            return state;
    }
};

export default requestsReducer;