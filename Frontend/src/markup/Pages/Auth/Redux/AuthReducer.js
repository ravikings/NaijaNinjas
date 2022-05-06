import { authActionTypes } from './AuthActions';

const initialState = {
    loading: false,
    currentUser:null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case authActionTypes.LOGIN:
            return {
                ...state,
                loading: true,
            };
        case authActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.user
            };
        case authActionTypes.GET_CURRENT_SUCCESS:
            return {
                ...state,
                currentUser: action.user
            };
        case authActionTypes.GET_CURRENT_FAILED:
            return {
                ...state,
                currentUser: null
            };
        default:
            return state;
    }
}

export default reducer;
