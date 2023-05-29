import { ADD_TASK_SUCCESS, API_CALL } from "./constant";
import { DELETE_TODO_SUCCESS } from "./constant";
import { EDIT_TODO_SUCCESS } from "./constant";
import { CHECK_BOX_SUCCESS } from "./constant";
import { FETCH_TODO } from "./constant";
export const addTaskRequest = (task, selectedDate, selectedTime, id) => {
    console.log("Inside action.js : ", task);
    console.log("typeof selected date and selected time from action:", typeof (selectedDate), typeof (selectedTime))
    return {
        type: ADD_TASK_SUCCESS,
        payload: {
            // id: Math.floor(Math.random() * 100000),
            id: id,
            title: task,
            isCompleted: false,
            date: selectedDate,
            time: selectedTime
        }
    };
}
export const deleteTodoRequest = (id) => {
    console.log("Action deleteTodo :", id);
    return {
        type: DELETE_TODO_SUCCESS,
        id
    };
}
export const checkBoxRequest = (id) => {
    console.log("checkBox action:", id)
    return {
        type: CHECK_BOX_SUCCESS,
        id
    }
}
export const editTodoRequest = (id, text, date, time) => {
    console.log("editTodo action:", id)
    console.log("editTodo action:", text)
    return {
        type: EDIT_TODO_SUCCESS,
        id,
        title: text,
        date: date,
        time: time
    }
}
export const fetchTodo = (data) => {
    console.log("ACTION.JS fetchTodo")
    return {
        type: FETCH_TODO,
        payload: data
    }
}
export const apiCall = () => {

    return {
        type: API_CALL,

    }
}
