import {combineReducers} from "redux"
import user from "./userReducer"
import app from "./appReducer"
import courseEditor from "./courseEditorReducer"
export default combineReducers({
    user,
    app,
    courseEditor
})
