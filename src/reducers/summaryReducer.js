let initialState={
    value:''
}

const summaryUpdate=(state=initialState,action)=>{
    if(action.type=="summaryUpdate"){
        console.log(action.payload);
        return{
            value:action.payload.value
        }
    }else{
        return state
    }
}
export default summaryUpdate;
