import { put, takeEvery, call, select } from "redux-saga/effects";
import { authActionTypes } from "./AuthActions";
import { toast } from "react-toastify";
import createRequest from "../../../../utils/axios";
import Cookies from "js-cookie";

export function* verify(token) {
  yield put({ type: authActionTypes.VERIFYING_TOKEN });
  try {
    yield createRequest().post("/dj-rest-auth/token/verify/", token);
    console.log(token, "Done once");
    const { data } = yield createRequest().post(
      "/dj-rest-auth/token/refresh/",
      { refresh: token.token }
    );
    const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
    Cookies.set("access_token", data.access, {
      expires: inFiveMinutes,
    });
    yield put({
      type: authActionTypes.VERIFY_TOKEN_SUCCESS,
      accessToken: data.access,
    });
  } catch (e) {
    yield put({ type: authActionTypes.VERIFY_TOKEN_FAILED });
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
    const { data } = yield createRequest().get("/dj-rest-auth/user/");
    console.log(data, "userData");
    yield put({ type: authActionTypes.GET_CURRENT_SUCCESS, user: data });
  } catch (e) {
    yield put({ type: authActionTypes.GET_CURRENT_FAILED });
    console.log(e, "userData");
  }
}

export function* gettingAccessToken() {
  try {
    yield createRequest().post("/dj-rest-auth/token/verify/");
    const { data } = yield createRequest().get("/dj-rest-auth/user/");
    console.log(data, "userData");
    yield put({ type: authActionTypes.GET_CURRENT_SUCCESS, user: data });
  } catch (e) {
    yield put({ type: authActionTypes.GET_CURRENT_FAILED });
    console.log(e, "userData");
  }
}

export function* logout({ handleClose }) {
  try {
    yield createRequest().post("/dj-rest-auth/logout/");
    yield call(handleClose);
    yield call(getCurrentUser);
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    yield put({ type: authActionTypes.LOGOUT_SUCCESS });
  } catch (e) {
    console.log(e.response.data);
    toast.error("Logout Failed");
  }
}

function* watchHomePageActionSagas() {
  yield takeEvery(authActionTypes.LOGIN, login);
  // yield takeEvery(authActionTypes.GET_CURRENT_USER, getCurrentUser);
  yield takeEvery(authActionTypes.LOGOUT, logout);
  yield takeEvery(authActionTypes.VERIFY_TOKEN, verify);
  yield takeEvery(authActionTypes.GET_ACCESS_TOKEN, generateAccessToken);
}

export default [watchHomePageActionSagas];
