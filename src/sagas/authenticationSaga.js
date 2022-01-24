import { put, call } from 'redux-saga/effects';
import { register, login } from '../services/auth.service';

import * as types from "../actions/types";
import {logout} from "../actions/auth";

export function* registerSaga(payload) {
    try {
        const response = yield call(register, payload);
        yield [
            put({ type: types.REGISTER_SUCCESS, response })
        ];
    } catch(error) {
        yield put({ type: types.REGISTER_FAIL, error });
    }
}
export function* loginSaga(payload) {
    try {
        const response = yield call(login, payload);
        yield [
            put({ type: types.LOGIN, response })
        ];
    } catch(error) {
        yield put({ type: types.LOGIN_FAIL, error });
    }
}
export function* logOutSaga(payload) {
    try {
        const response = yield call(logout, payload);
        yield [
            put({ type: types.LOGIN, response })
        ];
    } catch(error) {
        yield put({ type: types.LOGIN_FAIL, error });
    }
}
