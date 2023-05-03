import { ADD_TASK, API_CALL } from "./constant";
import { DELETE_TODO } from "./constant";
import { EDIT_TODO } from "./constant";
import { CHECK_BOX } from "./constant";
import { FETCH_TODO } from "./constant";

export const addTask = (task) => {
    console.log("Inside action.js : ", task);
    return {
        type: ADD_TASK,
        payload: {
            id: Math.floor(Math.random() * 1000),
            title: task,
            isCompleted: false
        }
    };
}
export const deleteTodo = (id) => {
    console.log("Action deleteTodo :", id);
    return {
        type: DELETE_TODO,
        id
    };
}
export const checkBox = (id) => {
    console.log("checkBox action:", id)
    return {
        type: CHECK_BOX,
        id
    }
}
export const editTodo = (id, text) => {
    console.log("editTodo action:", id)
    console.log("editTodo action:", text)
    return {
        type: EDIT_TODO,
        id,
        title: text
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
