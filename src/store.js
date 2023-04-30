import{createStore} from 'redux';
import rootreducer from './reducers/index';
const store = createStore(rootreducer);
store.subscribe(()=>{
    console.log(store.getState());
})
export default store;