import { fork } from 'redux-saga/effects';
import watchUserAuthentication from './watcher';

export default function* startForman() {
    yield fork(watchUserAuthentication);
}
