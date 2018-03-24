import {combineReducers} from "redux"
import user from "./userReducer"
import app from "./appReducer"

export default combineReducers({
    user,
    app
})
