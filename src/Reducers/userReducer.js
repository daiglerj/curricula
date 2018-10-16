const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    ID: '',
    teacher:''
    
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case "SET_USERNAME": {
            return {...state,username:action.payload}
        }
        case "SET_FIRST_NAME": {
            return {...state,firstName:action.payload}
        }
        case "SET_LAST_NAME":{
            return {...state,lastName:action.payload}
        }
        case "SET_ID":{
            return {...state, ID:action.payload}
        }
        case "SET_TEACHER":{
            return {...state, teacher:action.payload}
        }
        case "SIGN_OUT":{
            return {
                username: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                teacher: ''
            }
        }
    
        default:{
            return state
        }
    }
}
export default userReducer