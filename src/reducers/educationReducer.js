let initialState = {
    schoolname: '',
    city: '',
    country: '',
    degree: '',
    month: '',
    year:'',
    description: ''
}
const educationUpdate = (state = initialState, action) => {
    if (action.type == "educationUpdate") {
        console.log(action.payload);
        return {
            ...state,
            schoolname: action.payload.schoolname,
            city: action.payload.city,
            country: action.payload.country,
            degree: action.payload.degree,
            month: action.payload.month,
            year: action.payload.year,
            description: action.payload.description,
        }
    } else {
        return state;
    }
}
export default educationUpdate;