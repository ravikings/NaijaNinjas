import {
  put,
  takeEvery,
  call,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import { authActionTypes } from "./AuthActions";
import { toast } from "react-toastify";
import createRequest from "../../../../utils/axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export function* verify(token) {

  yield put({ type: authActionTypes.VERIFYING_TOKEN });
  try {
    const tokens = localStorage.getItem("access_token");
    const mfa = localStorage.getItem("mfa");
    if (mfa) {
      yield createRequest().post("/api/v1/mfa/auth/verify/", tokens)
        .then((res) => {
          localStorage.setItem("userID", res?.data?.pk);
          localStorage.setItem("userData", JSON.stringify(res?.data));
          localStorage.setItem("checker", res?.data?.is_a_runner)
        });
      yield put({
        type: authActionTypes.LOGIN_SUCCESS,
        accessToken: tokens,
      });
      yield put({
        type: authActionTypes.VERIFY_TOKEN_SUCCESS,
      });
      yield put({
        type: authActionTypes.VERIFY_RUNNER,
      });
    } else {
      yield createRequest().get("/api/auth/v1.0/apiaccess/", tokens)
      yield put({
        type: authActionTypes.VERIFY_TOKEN_SUCCESS,
        accessToken: tokens,
      });
      yield put({
        type: authActionTypes.VERIFY_RUNNER,
      });
    }

  } catch (e) {
    yield put({ type: authActionTypes.VERIFY_TOKEN_FAILED });
    // localStorage.removeItem("userID");
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("userData");
    // localStorage.removeItem("mfa");
  }
}

export function* generateAccessToken() {
  const token = Cookies.get("refresh_token");
  if (token) {
    try {
      const { data } = yield createRequest().post(
        "/dj-rest-auth/token/refresh/",
        {
          refresh: token,
        }
      );

      const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set("access_token", data.access, {
        expires: inFiveMinutes,
      });
      yield put({
        type: authActionTypes.GET_ACCESS_TOKEN_SUCCESS,
        accessToken: data.access,
      });
    } catch (e) {
      yield put({ type: authActionTypes.GET_ACCESS_TOKEN_FAILED });
    }
  }
}

export function* login({ history, loginDetails }) {
  try {
    const { data } = yield createRequest().post(
      "/dj-rest-auth/login/",
      loginDetails
    );
    yield put({
      type: authActionTypes.LOGIN_SUCCESS,
      user: data.user,
      accessToken: data.access_token,
    });
    history.push("/");
  } catch (e) {
    toast.error(
      e.response.data?.password?.join(",") ||
      e.response.data?.non_field_errors?.join(",") ||
      "Unknown Error"
    );
    yield put({ type: authActionTypes.LOGIN_FAILED });
  }
}

export function* getCurrentUser() {
  yield put({ type: authActionTypes.GETTING_CURRENT_USER });

  try {
    //const { data } = yield createRequest().get("/dj-rest-auth/user/");
    const data = localStorage.getItem("userData");
    console.log(data, "userData");
    yield put({ type: authActionTypes.GET_CURRENT_SUCCESS, user: data });
    //yield call(getUserStatus, data.pk);
    // yield put({ type: authActionTypes.GET_USER_STATUS, id: data.pk });
  } catch (e) {
    yield put({ type: authActionTypes.GET_CURRENT_FAILED });
    console.log(e, "userData");
  }
}

// export function* getUserStatus({ id }) {
//   yield put({ type: authActionTypes.GET_USER_STATUS_START });
//   try {
//     // const { data } = yield createRequest().get(
//     //   `/api/v1/user-status/${id}/login`
//     // );
//     console.log(data, "userStatus");
//     yield put({ type: authActionTypes.GET_USER_STATUS_SUCCESS, status: data });
//   } catch (e) {
//     yield put({ type: authActionTypes.GET_USER_STATUS_FAILED });
//     console.log(e, "userStatus");
//   }
// }

export function* setProfileData({ data }) {
  yield put({ type: authActionTypes.USER_PROFILE, data });
}

export function* gettingAccessToken() {
  try {
    const { data } = localStorage.getItem("userData");
    console.log(data, "userData");
    yield put({ type: authActionTypes.GET_CURRENT_SUCCESS, user: data });
  } catch (e) {
    yield put({ type: authActionTypes.GET_CURRENT_FAILED });
    console.log(e, "userData");
  }
}

export function* logout({ handleClose }) {
  try {
    console.log("logging out")
    const id = localStorage.getItem("userID");
    const mfa = localStorage.getItem("mfa");
    // yield createRequest().post("/dj-rest-auth/logout/");
    if (!mfa) {
      yield createRequest().post("/api/auth/v1.0/logout/");
    }
    localStorage.removeItem('access_token');
    yield createRequest().get(`/api/v1/user-status/${id}/logout/`);
    localStorage.removeItem('userID');
    localStorage.removeItem('mfa');
    localStorage.removeItem('checker');
    localStorage.removeItem('userData');
    yield call(handleClose);
    // yield call(getCurrentUser);
    Cookies.remove("access_token", { path: "/" });
    //Cookies.remove("refresh_token", { path: "/" });
    yield put({ type: authActionTypes.LOGOUT_SUCCESS });
  } catch (e) {
    console.log(e.response.data);
    const id = localStorage.getItem("userID");
    yield createRequest().get(`/api/v1/user-status/${id}/logout/`);
    //toast.error("Logout Failed");
    localStorage.removeItem('access_token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userData');
    localStorage.removeItem('mfa');
    localStorage.removeItem('checker');
    yield call(handleClose);
    Cookies.remove("access_token", { path: "/" });
    //Cookies.remove("refresh_token", { path: "/" });
    yield put({ type: authActionTypes.LOGOUT_SUCCESS });
  }
}

function* watchHomePageActionSagas() {
  yield takeEvery(authActionTypes.LOGIN, login);
  yield takeEvery(authActionTypes.GET_CURRENT_USER, getCurrentUser);
  yield takeEvery(authActionTypes.LOGOUT, logout);
  yield takeEvery(authActionTypes.VERIFY_TOKEN, verify);
  yield takeEvery(authActionTypes.GET_ACCESS_TOKEN, generateAccessToken);
  // yield takeEvery(authActionTypes.GET_USER_STATUS, getUserStatus);
  //yield takeEvery(authActionTypes.USER_PROFILE, setProfileData);
}

export default [watchHomePageActionSagas];
