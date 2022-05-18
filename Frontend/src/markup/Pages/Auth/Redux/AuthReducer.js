import { authActionTypes } from "./AuthActions";

const initialState = {
  loading: false,
  currentUser: null,
  isAuthenticated: false,
  accessToken: null,
  isVerified: false,
  gettingToken: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.VERIFYING_TOKEN:
      return {
        ...state,
        loading: true,
      };

    case authActionTypes.VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        loading: false,
        isAuthenticated: true,
        isVerified: true,
        gettingToken: false,
      };

    case authActionTypes.VERIFY_TOKEN_FAILED:
      return {
        ...state,
        isVerified: false,
        loading: false,
        gettingToken: false,
      };

    case authActionTypes.GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.accessToken,
        isAuthenticated: true,
        isVerified: true,
      };
    case authActionTypes.GET_ACCESS_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isVerified: false,
      };
    case authActionTypes.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.user,
        accessToken: action.accessToken,
        isVerified: true,
        isAuthenticated: true,
      };

    case authActionTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        currentUser: null,
        accessToken: null,
        isAuthenticated: false,
      };
    case authActionTypes.GETTING_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.GET_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.user,
        isAuthenticated: true,
      };
    case authActionTypes.GET_CURRENT_FAILED:
      return {
        ...state,
        loading: false,
        currentUser: null,
        isAuthenticated: false,
      };
    case authActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: null,
        accessToken: null,
        isAuthenticated: false,
        isVerified: false,
      };
    default:
      return state;
  }
}

export default reducer;
