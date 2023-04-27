import { ADD_TASK, DELETE_TODO, CHECK_BOX, EDIT_TODO, FETCH_TODO } from "./constant";
const initialState = {
    todoList: []
}
export const reducertodo = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            console.log("Inside Reducer ADD_TASK:", action.payload)
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        isCompleted: false
                    }
                ]
            };
        case DELETE_TODO:
            console.log("reducer DELETE_TODO", action.id)

            return {
                ...state,
                todoList: state.todoList.filter(item => item.id !== action.id)
            };
        case EDIT_TODO:
            console.log("reducer EDIT_TODO:", action.id)
            const editTodoList = state.todoList.map((item) => {
                if (item.id === action.id) {
                    return { ...item, title: action.title }
                }
                return item;
            });
            state.todoList = []
            state.todoList.push(...editTodoList);
            return { ...state, ...state.todoList };

        case CHECK_BOX:
            // using map method
            // console.log("inside reducer CHECK_BOX action:", action.id)
            // const newTodoList = state.todoList.map(item => {
            //     if (item.id === action.id) {
            //         return { ...item, isCompleted: !item.isCompleted }
            //     }
            //     return item;
            // });
            // state.todoList = []
            // state.todoList.push(...newTodoList);
            // return { ...state, ...state.todoList };

            //using filter method
            console.log("inside reducer CHECK_BOX action:", action.id)
            const newTodoList = state.todoList.filter(item => item.id === action.id)
            newTodoList[0].isCompleted = !newTodoList[0].isCompleted;
            state.todoList = [... new Set([...state.todoList, ...newTodoList])]
            return { ...state }

        case FETCH_TODO:
            console.log("INSIDE REDUCER FETCH_TODO:", action.payload)
            return {
                ...state,
                todoList: action.payload
            }
        
        default:
            return state;
    }
}
