import React,{useState} from 'react'
import {Navigate} from "react-router-dom"
import styles from "../Styles/signup.module.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useDispatch,useSelector} from "react-redux"
import {signupAction} from "../Actions/signupAction"
import { doc,setDoc, getFirestore } from "firebase/firestore";

export default function Signup() {
    

    const name = React.createRef(null);
    const email = React.createRef(null);
    const password = React.createRef(null);
    const auth = getAuth();

    const dispatch = useDispatch();
    const {signupReducer} = useSelector((state)=>state);
    const[success,setSuccess] = useState(false);
    const [form,setForm] = useState({
        name: signupReducer.name,
        email: signupReducer.email,
        password: signupReducer.password
    })

    const obj = {};
    const db = getFirestore();

    function handleChange(user) {
        
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                alert("Signup Successful")

                obj.name = form.name;
                obj.email = form.email;
                obj.password = form.password;

                dispatch(signupAction(obj));

               

                // const docRef = await addDoc(collection(db, "User",), {
                //     name: form.name,
                //     uid: user.uid
        
                //   });
                await setDoc(doc(db, "user", user.uid), {
                    name: form.name,
                    email: form.email,
                    password: form.password
                    
                  });
                  
                  setSuccess(true);

                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            console.log(errorMessage);

                // ..
            });
            name.current.value = "";
            email.current.value = "";
            password.current.value = "";

           

    }

    function change (e){
        let { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
 if(success){
     return <Navigate to = "/login" replace={true}/>
 }

    return (
        <div className={styles.page}>
        <div className={styles.signup} >
            <h1 style={{marginTop:"0px",marginLeft:"55px"}}>signup</h1>
            <h2 style={{marginLeft:"20px"}} >Enter your details</h2>
            <div >
                <div>

                <label>Name</label>
                    <div>
                        <input type="text" name="name" ref={name} onChange={change} value={form.name} className={styles.box} />
                    </div>

                    <label>Email</label>
                    <div>
                        <input type="text" name="email" onChange={change} ref={email} value={form.email} className={styles.box} />
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div>
                        <input type="text" name="password" onChange={change} ref={password} value={form.password} className={styles.box}  />
                    </div>
                </div>
                <div>
                    <button className={styles.btn} type="button" onClick={handleChange} >Signup</button>
                </div>
            </div>
        </div>
        </div>
    )
}
