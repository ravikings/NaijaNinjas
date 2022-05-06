import { put, takeEvery ,call} from 'redux-saga/effects';
import { authActionTypes } from './AuthActions';
import { toast } from 'react-toastify';
import createRequest from "../../../../utils/axios";

export function* login({history,loginDetails}) {
    try {
        const { data } = yield createRequest().post("/dj-rest-auth/login/",loginDetails);
        localStorage.setItem("userID", data?.user?.pk);
        localStorage.setItem("access_token", data?.access_token);
        yield put({ type: authActionTypes.LOGIN_SUCCESS, user:data.user });
        history.push("/");
    } catch (e) {
        toast.error(e.response.data?.password?.join(',') || e.response.data?.non_field_errors?.join(',') || "Unknown Error");
        yield put({ type: authActionTypes.LOGIN_FAILED });
    }
}

export function* getCurrentUser() {
    try {
        const { data } = yield createRequest().get("/dj-rest-auth/user/");
        yield put({ type: authActionTypes.GET_CURRENT_SUCCESS, user:data });
    } catch (e) {
        yield put({ type: authActionTypes.GET_CURRENT_FAILED });
    }
}

export function* logout({handleClose}) {
    try {
        yield createRequest().post("/dj-rest-auth/logout/");
        yield call(handleClose)
        yield call(getCurrentUser);
    } catch (e) {
        console.log(e.response.data)
        toast.error("Logout Failed");
    }
}

function* watchHomePageActionSagas() {
    yield takeEvery(authActionTypes.LOGIN, login);
    yield takeEvery(authActionTypes.GET_CURRENT_USER, getCurrentUser);
    yield takeEvery(authActionTypes.LOGOUT, logout);
}

export default [watchHomePageActionSagas];