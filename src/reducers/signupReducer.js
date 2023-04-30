let intialState = {
    name:"",
    email: "",
    password:"",
}

const signupReducer = (state = intialState, action)=>{

    if(action.type == "REGISTER"){
    console.log(action.payload);

    return{
        ...state,
        name : action.payload.name,
        email: action.payload.email,
        password: action.payload.password
    }
}else{
    return state;
}

}
export default signupReducer;