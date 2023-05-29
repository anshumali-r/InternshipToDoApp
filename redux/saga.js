import { all, put, takeEvery, call, takeLatest, take } from 'redux-saga/effects'
import { fetchTodo, addTaskRequest, deleteTodoRequest, editTodoRequest, checkBoxRequest } from './action'
import { EDIT_TODO_REQUEST, ADD_TASK_REQUEST, API_CALL, DELETE_TODO_REQUEST, CHECK_BOX_REQUEST } from './constant';

function* todoApiCall() {
    try {
        const response = yield call(fetch, "https://run.mocky.io/v3/10d3787f-130b-4317-8876-b0c327c406bd")
        const data = yield response.json();
        yield put(fetchTodo(data));
        // console.log("INSIDE TODOAPICALL :", data)
    } catch (err) {
        console.log("Error inside todoApiCall():", err)
    }
}
function* watchTodoApiCall() {
    // console.log("INSIDE WATCHER")
    yield takeEvery(API_CALL, todoApiCall)
}

function* addTaskWorker(action) {
    try {
        const { task } = action.payload
        console.log("ADD TASK SAGA")
        yield put(addTaskRequest(task))
    } catch (err) {
        console.log("Error Inside addTaskWorker():", err)
    }
}
function* watchAddTaskWatcher() {
    yield takeEvery(ADD_TASK_REQUEST, addTaskWorker)
}

function* deleteTaskWorker(id) {
    try {
        yield put(deleteTodoRequest(id))
    } catch (err) {
        console.log("Error in deleteTaskWorker():", err)
    }
}
function* deleteTaskWatcher() {
    yield takeEvery(DELETE_TODO_REQUEST, deleteTaskWorker)
}

function* editTaskWorker(id, text) {
    try {
        yield put(editTodoRequest(id, text))
    } catch (err) {
        console.log("Error in editTaskWatcher():", err)
    }
}
function* editTaskWatcher() {
    yield takeEvery(EDIT_TODO_REQUEST, editTaskWorker)
}

function* checkBoxWorker(id) {
    try {
        yield put(checkBoxRequest(id, text))
    } catch (err) {
        console.log("Error in checkBoxWatcher():", err)
    }
}
function* checkBoxWatcher() {
    yield takeEvery(CHECK_BOX_REQUEST, checkBoxWorker)
}

export default function* rootSaga() {
    yield all([
        watchTodoApiCall(),
        watchAddTaskWatcher(),
        deleteTaskWatcher(),
        editTaskWatcher(),
        checkBoxWatcher()
    ])
}