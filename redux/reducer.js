import { DELETE_TODO_SUCCESS, CHECK_BOX_SUCCESS, EDIT_TODO_SUCCESS, FETCH_TODO, ADD_TASK_SUCCESS, SIGN_UP, LOG_IN } from "./constant";
const initialState = {
    todoList: []
}

console.log("INITIAL STATE", initialState)
export const reducertodo = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK_SUCCESS:
            console.log("INSIDE ADD_TASK_SUCCESS:", initialState, action.payload)
            return {
                ...state,
                todoList: [

                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        isCompleted: false,
                        date: action.payload.date,
                        time: action.payload.time
                    },
                    ...state.todoList,
                ]
            };
        case DELETE_TODO_SUCCESS:
            console.log("reducer DELETE_TODO", action.id)

            return {
                ...state,
                todoList: state.todoList.filter(item => item.id !== action.id)
            };
        case EDIT_TODO_SUCCESS:
            console.log("reducer EDIT_TODO:", action.id)
            const editTodoList = state.todoList.map((item) => {
                if (item.id === action.id) {
                    return { ...item, title: action.title, date: action.date, time: action.time }
                }
                return item;
            });
            state.todoList = []
            state.todoList.push(...editTodoList);
            return {
                ...state,
                ...state.todoList
            };

        case CHECK_BOX_SUCCESS:
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

            // using filter method
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
        // case SIGN_UP:
        //     console.log("INSIDE REDUCER sign_up:", action.payload)
        //     return {
        //         ...state,
        //         user: action.payload
        //     }
        // case LOG_IN:
        //     const { email, password } = action.payload;

        //     const user = state.users.find(
        //         user => user.email === email && user.password === password
        //     );

        //     if (user) {
        //         navigation.navigate('MyTabs')
        //         return { ...state, loggedInUser: user };
        //     } else {
        //         return state;
        //     }

        default:
            return state;
    }
}