export function setUsername(username){
    return{
        type: "SET_USERNAME",
        payload: username
    }
}

export function setFirstName(name){
    return{
        type: "SET_FIRST_NAME",
        payload: name
    }
}

export function setLastName(name){
    return{
        type: "SET_LAST_NAME",
        payload:name
    }
}

export function setID(id){
    return{
        type: "SET_ID",
        payload:id
    }
}

export function signOut(){
    return{
        type: "SIGN_OUT"
    }
}

