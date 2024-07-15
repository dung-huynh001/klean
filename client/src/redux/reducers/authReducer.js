import { LOGIN_SUCCESS, LOGOUT } from '../types/authTypes';

const initialState = {
    isAuthenticated: false,
    user: {}
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            };
        default:
            return state;
    }
}

export default authReducer;