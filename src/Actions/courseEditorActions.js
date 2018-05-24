export function setTitle(title){
    return{
        type:"SET_TITLE",
        payload: title
    }
}

export function setSubtitle(subTitle){
    return{
        type: "SET_SUBTITLE",
        payload: subTitle
    }
}

export function setDescription(description){
    return{
        type: "SET_DESCRIPTION",
        payload: description
    }
}

export function setDifficulty(difficulty){
    return{
        type:"SET_DIFFICULTY",
        payload: difficulty
    }
}

export function setRequiredMaterials(materials){
    return{
        type: "SET_REQUIRED_MATERIALS",
        payload: materials
    }
}

export function setPrerequisites(prerequisites){
    return{
        type: "SET_PREREQUISITES",
        payload: prerequisites 
    }
}
export function setCourseID(id){
    return{
        type:"SET_COURSE_ID",
        payload:id
    }
}
export function setPrice(price){
    return{
        type: "SET_PRICE",
        payload:price
    }
}
export function setAuthor(authorName){
    return{
        type: "SET_AUTHOR",
        payload: authorName
    }
}