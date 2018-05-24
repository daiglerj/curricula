const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    ID: ''
    
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
        case "SIGN_OUT":{
            return {
                username: '',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            }
        }
    
        default:{
            return state
        }
    }
}
export default userReducer