import {applyMiddleware,createStore,combineReducers} from "redux"
import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import reducer from "./Reducers"


const middleware = applyMiddleware(promise(),thunk,createLogger())
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

export const store =  createStore(persistedReducer,middleware)
export const persistor = persistStore(store)