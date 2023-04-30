import React,{useState} from 'react'
import {Navigate} from "react-router-dom"
import styles from '../Styles/login.module.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useDispatch,useSelector} from "react-redux"
import {loginAction} from "../Actions/loginAction"
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function Login() {

    const auth = getAuth();
    const emaillog = React.createRef(null);
    const passwordlog = React.createRef(null);
    const[success,setSuccess] = useState(false);
    const db = getFirestore();



    const dispatch = useDispatch();
    const {signinReducer} = useSelector((state)=>state);
    const [form,setForm] = useState({
        
        email: signinReducer.email,
        password: signinReducer.password
    })
    const obj = {};

    function handleChange(user){
       
   signInWithEmailAndPassword(auth, emaillog.current.value, passwordlog.current.value)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("login successfull")
    console.log(user);
    emaillog.current.value = "";
    passwordlog.current.value = "";

    const docRef = doc(db, "user", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data().name);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

    
    obj.email = form.email;
    obj.password = form.password;
   obj.name = docSnap.data().name;
   obj.uid = user.uid
    dispatch(loginAction(obj))
    setSuccess(true)
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
    }

    function change (e){
        let { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    if(success){
        return <Navigate to = "/" replace={true}/>
    }

    return (
        <div className={styles.page}>
            <div className={styles.Login}>
            <h2 >Enter Login details</h2>
            <div>
                <div> 
                    <label>Email</label>
                    <div>
                        <input type="text" name="email" ref={emaillog} onChange={change} value={form.email} className={styles.box} />
                    </div>
                </div>
                <div className="input-group full">
                    <label>Password</label>
                    <div className="effect">
                        <input type="text" name="password"  ref={passwordlog} onChange={change} value={form.password} className={styles.box} />
                    </div>
                </div>
                <div >
                    <button className={styles.btn} type="button" onClick={handleChange} >Login</button>
                </div>
                
            </div>
            </div>
        </div>
    )
}
