import { all, put, takeEvery, call, takeLatest } from 'redux-saga/effects'
import { addTask, checkBox, deleteTodo, editTodo, fetchTodo } from './action'
import { API_CALL } from './constant';
import { useSelector, useDispatch } from 'react-redux';

function* todoApiCall() {
    try {
        const response = yield call(fetch, "https://run.mocky.io/v3/74e186eb-2e98-4e62-8426-b0032334aaea")
        const data = yield response.json();
        yield put(fetchTodo(data));
        console.log("INSIDE TODOAPICALL :", data)
    } catch (err) {
        console.log("Error inside todoApiCall:", err)
    }
}

function* watchTodoApiCall() {
    console.log("INSIDE WATCHER")
    yield takeEvery(API_CALL, todoApiCall)
}
export default function* rootSaga() {
    yield all([
        watchTodoApiCall(),
    ])
}