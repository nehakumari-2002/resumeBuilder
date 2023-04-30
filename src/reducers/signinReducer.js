let intialState = {
    name:"",
    email: "",
    password:"",
    uid:""
}

const signinReducer = (state = intialState, action)=>{

    if(action.type === "LOGIN"){
    console.log(action.payload);

    return{
        ...state,

       name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        uid: action.payload.uid,
    }
}else{
    return state;
}

}
export default signinReducer;