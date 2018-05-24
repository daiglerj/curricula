const initialState = {
    search: ""
    
}

const courseSearch = (state=initialState,action)=>{
    switch(action.type){
        case "CHANGE_SEARCH":{
            return {...state, search:action.payload}
        }
        default:{
            return state
        }
    }
}
export default courseSearch