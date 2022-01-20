import { takeLatest } from 'redux-saga/effects';
import {loginSaga, logOutSaga, registerSaga} from './authenticationSaga';

import * as types from "../actions/types";


export default function* watchUserAuthentication() {
    yield takeLatest(types.REGISTER, registerSaga);

    yield takeLatest(types.LOGIN, loginSaga);
    yield takeLatest(types.LOGOUT, logOutSaga);
}
