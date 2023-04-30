let initialState={
    jobTitle:'',
    company:'',
    city:'',
    country:'',
    startMonth:'',
    startYear:'',
    endMonth:'',
    endYear:'',
    description:''
}
const workExpReducer=(state=initialState,action)=>{
    if(action.type=="workexpUpdate"){
        console.log(action.payload);
        return{
            ...state,
            jobTitle:action.payload.jobTitle,
            company:action.payload.company,
            city:action.payload.city,
            country:action.payload.country,
            startMonth:action.payload.startMonth,
            startYear:action.payload.startYear,
            endMonth:action.payload.endMonth,
            endYear:action.payload.endYear,
            description: action.payload.description
                }
    }else{
        return state
    }
}
export default workExpReducer;