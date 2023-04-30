let initialState={
    // name:'',
    // email:'',
    // streetAddress:'',
    // city:'',
    // country:'',
    // phonenumber:'',
    // phonenumber2:'',

city: "",
country: "",
email: "",
name: "",
phonenumber: "",
phonenumber2: "",
streetAddress: "",

} 

const ContactUpdate=(state=initialState,action)=>{
    if(action.type=="ContactFill"){
        console.log(action.payload);
        return {
            ...state,
            name:action.payload.name,
            email:action.payload.email,
            streetAddress:action.payload.streetAddress,
            city:action.payload.city,
            country:action.payload.country,
            phonenumber:action.payload.phonenumber,
            phonenumber2:action.payload.phonenumber2,
        }
    }else{
        return state
    }
}
export default ContactUpdate;