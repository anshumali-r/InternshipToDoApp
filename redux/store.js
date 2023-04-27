import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga'
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "./rootReducer";


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)
console.log("!!!!!INSIDE STORE!!!!")
sagaMiddleware.run(rootSaga)
export default store;


//Earlier code till redux persist implemented

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// export const store = createStore(persistedReducer)
// export const persistor = persistStore(store)
