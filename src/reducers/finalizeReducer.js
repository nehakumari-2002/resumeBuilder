const initialState ={
    doc: {
        color: 1,
        fontsize: 1,
        fontfamily: 1,
    }
};

const finalizeReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'doc_STYLE_CHANGE': 
        // console.log(action.payload);
        return {
            ...state,
           doc: action.payload
        };
    
        default : return state;
    }
}
export default finalizeReducer;