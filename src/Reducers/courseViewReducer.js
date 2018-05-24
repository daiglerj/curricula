const initialState = {
	courseViewID: 0,
	coursePurchaseID: 0,   
}

const courseView = (state=initialState,action)=>{
    switch(action.type){
        case "SET_COURSE_VIEW_ID":{
            return {...state, courseViewID:action.payload}
        }
        case "SET_COURSE_PURCHASE_ID":{
        	return {...state, coursePurchaseID:action.payload}
        }
        default:{
            return state
        }
    }
}
export default courseView