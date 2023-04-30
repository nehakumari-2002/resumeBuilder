import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/contact.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { contfill } from '../Actions/contactAction'
import { doc, setDoc,getFirestore,getDoc } from "firebase/firestore";

export default function Contact() {
    const dispatch = useDispatch()
    const{signinReducer} = useSelector((state)=>state)
    const { ContactUpdate } = useSelector((state) => state)

    // console.log(email);
    // console.log(ContactUpdate);
    const [form, setForm] = useState({
        name: ContactUpdate.name,
        email: ContactUpdate.email,
        streetAddress: ContactUpdate.streetAddress,
        city: ContactUpdate.city,
        country: ContactUpdate.country,
        phonenumber: ContactUpdate.phonenumber,
        phonenumber2: ContactUpdate.phonenumber2,
    })

    const db = getFirestore();

    let obj = {}

    function handlechange(e) {
        let { id, value } = e.target;
        setForm({
            ...form,
            [id]: value
        })
        // if (name == 'name') {

        //     setForm({
        //         ...form,
        //         name:value

        //     })

        // } else if (name == 'email') {

        //     setForm({
        //         ...form,
        //         email: value
        //     })

        // }

    }
    async function submit() {

        //add validation to check empty fields
        obj.name = form.name;
        obj.email = form.email;
        obj.streetAddress = form.streetAddress;
        obj.city = form.city;
        obj.country = form.country;
        obj.phonenumber = form.phonenumber;
        obj.phonenumber2 = form.phonenumber2;
        dispatch(contfill(obj))
     
       try { const userdoc = doc(db, "user",signinReducer.uid );
        var user = await getDoc(userdoc);
        user = user.data() 
        
        await setDoc(userdoc,{...user,contact:form});
    }catch(err){

        console.error(err);

    }

    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.Contact_info}>
                    <span>Tell us about yourself</span>
                </div>
                <div className={styles.headertitle}>With this info, recruiters will be able to find you.</div>
                <div className={styles.label}>Name</div>
                <div className={styles.inputbox}><input type='text' placeholder='*Required' onChange={handlechange} id="name" name='name' value={form.name} /></div>
                <div className={styles.label}>Email</div>
                <div className={styles.inputbox} style={{ display: "flex" }}>
                    <input type='email' className={styles.small} placeholder='*Required' onChange={handlechange} id="email" name='email' value={form.email} />
                    <div className={styles.label}>
                        <input type='checkbox' style={{ height: '20px', width: '20px', marginTop: '5px', marginLeft: '20px' }} />
                        <label>Don't show on my resume</label>

                    </div>

                </div>
                <div className={styles.label}  >Street Address</div>
                <div className={styles.inputbox}><input type='text' value={form.streetAddress} id="streetAddress" onChange={handlechange} /></div>
                <div className={styles.label}>City</div>
                <div className={styles.inputbox}>
                    <input type='text' style={{ width: '50%' }} onChange={handlechange} id="city" value={form.city} />
                </div>

                <div className={styles.label}>Country</div>
                <div className={styles.inputbox}><input type='text' onChange={handlechange} id="country" value={form.country} /></div>

                <div className={styles.label}>Phone Number</div>
                <div className={styles.inputbox}>
                    <input type='text' style={{ width: '48%' }} onChange={handlechange} id="phonenumber" value={form.phonenumber} />
                    <input type='text' style={{ marginLeft: "20px", width: '48%' }} onChange={handlechange} id="phonenumber2" value={form.phonenumber2} />
                </div>

                <div className={styles.submit}>
                    <Link to='/workexp'><input type="submit" value="Enter Job Description" onClick={submit} /></Link>
                </div>
                <div className={styles.back}>
                    <Link to='/' style={{ textDecoration: "none" }}><a style={{ color: '#03acbb', fontWeight: 'bold' }}> Back </a></Link>
                </div>

            </div>
        </div>
    )
}
