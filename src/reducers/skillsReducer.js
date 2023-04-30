

let intialState = [""];
const skillsReducer = (state = intialState, action)=>{
    
    if (action.type == "skillsUpdate") {
        console.log(action.payload);
        
        var data ={};
        for(var i in action.payload){
            console.log(i,action.payload[i]);
           data[i] = action.payload[i]
        }
        
        return {
            ...state,
            ...data,

        }
    } else {
        return state
      }

}

export default skillsReducer;