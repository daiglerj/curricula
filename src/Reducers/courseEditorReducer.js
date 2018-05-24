const initialState = {
    title: "",
    subTitle: "",
    description: "",
    difficulty: "",
    requiredMaterials: "",
    prerequisites: "",
    courseID: ""
    
}

const courseEditor = (state=initialState,action)=>{
    switch(action.type){
        case "SET_TITLE":{
            return {...state,title:action.payload}
        }
        case "SET_SUBTITLE":{
            return {...state,subTitle:action.payload}
        }    
        case "SET_DESCRIPTION":{
            console.log(action.payload)
            return {...state,description:action.payload}
        }
        case "SET_DIFFICULTY":{
            return {...state,difficulty:action.payload}
        }
        case "SET_REQUIRED_MATERIALS":{
            return {...state,requiredMaterials: action.payload} 
        }
        case "SET_PREREQUISITES":{
            return {...state, prerequisites:action.payload}
        }
        case "SET_COURSE_ID":{
            return {...state, courseID: action.payload}
        }
        case "SET_PRICE":{
            return {...state,Price:action.payload}
        }
        case "SET_AUTHOR_NAME":{
            return {...state, authorName:action.payload}
        }
        default:{
            return state
        }
    }
}
export default courseEditor