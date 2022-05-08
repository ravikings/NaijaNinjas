export const authActionTypes = {
    LOGIN: 'loan-agents/auth/login',
    LOGIN_SUCCESS: 'loan-agents/auth/login_success',
    LOGIN_FAILED: 'loan-agents/auth/login_failed',

    LOGOUT: 'loan-agents/auth/logout',
    LOGOUT_SUCCESS: 'loan-agents/auth/logout_success',
    LOGOUT_FAILED: 'loan-agents/auth/logout_failed',

    GET_CURRENT_USER: 'loan-agents/auth/get_current_user',
    GET_CURRENT_SUCCESS: 'loan-agents/auth/get_current_user_success',
    GET_CURRENT_FAILED: 'loan-agents/auth/get_current_user_failed',
};

export function login(history, loginDetails) {
    return { type: authActionTypes.LOGIN, history, loginDetails };
}

export function logout(handleClose) {
    return { type: authActionTypes.LOGOUT, handleClose };
}

export function getCurrentUser() {
    return { type: authActionTypes.GET_CURRENT_USER };
}