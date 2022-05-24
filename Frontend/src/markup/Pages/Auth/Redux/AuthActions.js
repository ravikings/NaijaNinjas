export const authActionTypes = {
  LOGIN: "loan-agents/auth/login",
  LOGIN_SUCCESS: "loan-agents/auth/login_success",
  LOGIN_FAILED: "loan-agents/auth/login_failed",

  LOGOUT: "loan-agents/auth/logout",
  LOGOUT_SUCCESS: "loan-agents/auth/logout_success",
  LOGOUT_FAILED: "loan-agents/auth/logout_failed",

  GETTING_CURRENT_USER: "loan-agents/auth/getting_current_user",
  GET_CURRENT_USER: "loan-agents/auth/get_current_user",
  GET_CURRENT_SUCCESS: "loan-agents/auth/get_current_user_success",
  GET_CURRENT_FAILED: "loan-agents/auth/get_current_user_failed",

  VERIFYING_TOKEN: "loan-agents/auth/verifying_token",
  VERIFY_TOKEN: "loan-agents/auth/verify_token",
  VERIFY_TOKEN_SUCCESS: "loan-agents/auth/verify_token_success",
  VERIFY_TOKEN_FAILED: "loan-agents/auth/verify_token_failed",

  GETTING_ACCESS_TOKEN: "loan-agents/auth/getting_access_token",
  GET_ACCESS_TOKEN: "loan-agents/auth/get_access_token",
  GET_ACCESS_TOKEN_SUCCESS: "loan-agents/auth/get_access_token_success",
  GET_ACCESS_TOKEN_FAILED: "loan-agents/auth/get_access_token_failed",

  UPDATE_ACCESS_TOKEN: "loan-agents/auth/update_access_token",

  USER_PROFILE: "loan-agents/auth/get_user_profile",

  GET_USER_RESUME: "loan-agents/auth/get_user_resume",

  GET_USER_STATUS: "loan-agents/auth/get_user_status",
  GET_USER_STATUS_START: "loan-agents/auth/get_user_status_start",
  GET_USER_STATUS_SUCCESS: "loan-agents/auth/get_user_status_success",
  GET_USER_STATUS_FAILED: "loan-agents/auth/get_user_status_failed",

  LOGOUT_SUCCESS: "loan-agents/auth/logout_success",
};

export function loginAction(history, loginDetails) {
  return { type: authActionTypes.LOGIN, history, loginDetails };
}

export function logout(handleClose) {
  return { type: authActionTypes.LOGOUT, handleClose };
}

export function getCurrentUser() {
  return { type: authActionTypes.GET_CURRENT_USER };
}

export function verifyToken(token) {
  return { type: authActionTypes.VERIFY_TOKEN, token };
}

export function getUserStatus(id) {
  return { type: authActionTypes.GET_USER_STATUS, id };
}

export function setProfileData(data) {
  console.log(data, "setProfileData");
  return { type: authActionTypes.USER_PROFILE, data };
}
