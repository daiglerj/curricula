const initialState = {
    username: '',
    name: ''
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case "SET_USERNAME": {
            return {...state,username:action.payload}
        }
        case "SET_NAME": {
            return {...state,name:action.payload}
        }
        default:{
            return state
        }
    }
}
export default userReducer