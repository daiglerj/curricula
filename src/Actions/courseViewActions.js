export function setCourseViewID(id){
    return{
        type:"SET_COURSE_VIEW_ID",
        payload: id
    }
}
export function setCoursePurchaseID(id){
	console.log("TEst: " + id)
    return{
        type:"SET_COURSE_PURCHASE_ID",
        payload: id
    }
}