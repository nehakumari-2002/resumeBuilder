export const finalizeAction = (doc)=>{
    return {
        type: "doc_STYLE_CHANGE",
        payload: doc
    };
}