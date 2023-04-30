import React, { useState } from 'react'
import styles from "../Styles/education.module.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { eduAction } from '../Actions/educationAction'
import { doc,getDoc, setDoc,getFirestore } from "firebase/firestore";
export default function Education() {
   const db = getFirestore();
   const { educationUpdate } = useSelector((state) => state)
   const{signinReducer} = useSelector((state)=>state)
   // console.log(educationUpdate);
   const dispatch = useDispatch();
   const [form, setForm] = useState({
      schoolname: educationUpdate.schoolname,
      city: educationUpdate.city,
      country: educationUpdate.country,
      degree: educationUpdate.degree,
      month: educationUpdate.month,
      year: educationUpdate.year,
      description: educationUpdate.description,
   })

   let obj = {};
   function handlechange(e) {
      let { id, value } = e.target;
      setForm({
         ...form,
         [id]: value
      })
   }

   async function submit(){
      obj.schoolname=form.schoolname
      obj.city = form.city
      obj.country = form.country
      obj.degree = form.degree
      obj.month = form.month
      obj.year = form.year
      obj.description = form.description
      dispatch(eduAction(obj))
      // console.log(obj);
      const userdoc = doc(db, "user",signinReducer.uid );
      var user = await getDoc(userdoc);
      user = user.data() 
      
      await setDoc(userdoc,{...user,Education:obj});
   }
   return (
      <div>
         <div className={styles.container}>
            <div className={styles.Education}>
               <span>Education</span>
            </div>
            <div className={styles.headertitle}>Start with your most recent educational institution.</div>
            
            <div className={styles.label}>School Name</div>
            <div className={styles.inputbox}><input type='text' onChange={handlechange} id='schoolname' value={form.schoolname} /></div>
            <div className={styles.flex}>
               <div className={styles.label} style={{ display: "flex" }}>City/Town
                  <div className={styles.label2}>Country</div>
               </div>
               <div className={styles.inputbox}>
                  <input type='text' className={styles.small}onChange={handlechange} id='city' value={form.city} />
                  <input type='text' className={styles.small} style={{ marginLeft: "20px" }} onChange={handlechange} id='country' value={form.country}/>
               </div>
               <div className={styles.label}>Degree</div>
               <div className={styles.inputbox}><input type='text' onChange={handlechange} id='degree' value={form.degree} /></div>
               <div className={styles.label}>Graduation Date</div>
               <div className={styles.inputbox}>
                  <select className={styles.Month} onChange={handlechange} id='month' value={form.month}>
                     <option value="" disabled selected>Month</option>
                     <option value="jan">January</option>
                     <option value="feb">February</option>
                     <option value="mar">March</option>
                     <option value="apr">April</option>
                     <option value="may">May</option>
                     <option value="jun">June</option>
                     <option value="jul">July</option>
                     <option value="aug">August</option>
                     <option value="sep">September</option>
                     <option value="oct">October</option>
                     <option value="nov">November</option>
                     <option value="dec">December</option>
                  </select>
                  <select className={styles.Year} onChange={handlechange} id='year' value={form.year}>
                     <option value="" disabled selected>Year</option>
                     <option>2022</option>
                     <option>2021</option>
                     <option>2020</option>
                     <option>2019</option>
                     <option>2018</option>
                     <option>2017</option>
                     <option>2016</option>
                     <option>2015</option>
                     <option>2014</option>
                     <option>2013</option>
                     <option>2012</option>
                     <option>2011</option>
                  </select>
               </div>
               <div className={styles.label}>Description</div>
               <textarea rows="10" cols="78" name="comment" placeholder='Enter education description' onChange={handlechange} id='description' value={form.description} style={{ paddingTop: '10px', paddingLeft: '5px' }}/>
               

               <div className={styles.submit}>
                  <Link to='/skills'><input type="submit" value="SAVE & CONTINUE" onClick={submit} /></Link>
               </div>
               <div className={styles.back}>
                  <Link to='/workexp' style={{ textDecoration: "none" }}><a style={{ color: '#03acbb', fontWeight: 'bold' }}> Back </a></Link>
               </div>

            </div>
         </div>
      </div>
   )
}
