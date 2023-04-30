import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/workexp.module.css"
import { useDispatch, useSelector } from "react-redux"
import { workexpAction } from '../Actions/workExpAction'
import { doc,getDoc, setDoc,getFirestore } from "firebase/firestore";


export default function Workexp() {
    const db = getFirestore();
    const{signinReducer} = useSelector((state)=>state)
    const { workExpReducer } = useSelector((state) => state);
    const month = {'January':1,'February':2,'March':3,'April':4,'May':5,'June':6,'July':7,'August':8,'September':9,'October':10,'November':11,'December':12};
    

    // console.log(workExpReducer);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        jobTitle: workExpReducer.jobTitle,
        company: workExpReducer.company,
        city: workExpReducer.city,
        country: workExpReducer.country,
        startMonth: workExpReducer.startMonth,
        startYear: workExpReducer.startYear,
        endMonth: workExpReducer.endMonth,
        endYear: workExpReducer.endYear,
        description: workExpReducer.description,
        isInvalid:false
    })
    

    let obj = {}

    function change(e) {
        let { id,value } = e.target
        
        setForm({
            ...form,
            [id]: value
           
        })
        console.log(value);
    }

 
    
 
 
 
    

    async function  handleChange() {
        let isInvalid = false;
       console.log("before if",parseInt(form.startYear) <= parseInt(form.endYear));
       console.log("before if",form.startYear==form.endYear && form.startMonth>form.endMonth);
       console.log("before if",form.startYear, form.endYear,typeof parseInt(form.startYear));
    //    console.log("before if",form.startYear==form.endYear && form.startMonth>form.endMonth);
     if(parseInt(form.startYear) <= parseInt(form.endYear)){
         if(parseInt(form.startYear)==parseInt(form.endYear) && parseInt(form.startMonth)>parseInt(form.endMonth)){
             isInvalid = true;
         }
     }else{
         isInvalid = true;
     }
     console.log("51",form.isInvalid);
     form.isInvalid = isInvalid;
     await setForm({
        ...form,  

    })
    console.log(form.isInvalid);
       if(!isInvalid){
        obj.jobTitle = form.jobTitle
        obj.company = form.company
        obj.city = form.city
        obj.country= form.country
        obj.startMonth=form.startMonth
        obj.startYear= form.startYear
        obj.endMonth = form.endMonth
        obj.endYear = form.endYear
        obj.description = form.description
        obj.isInvalid = form.isInvalid
    }
         

        dispatch(workexpAction(obj));
        
        const userdoc = doc(db, "user",signinReducer.uid );
        var user = await getDoc(userdoc);
        user = user.data() 
        
        await setDoc(doc(db, "user",signinReducer.uid ),{...user,Workexp:form});

     
    //    console.log(obj);

    //    obj.isInvalid = isInvalid;
        // console.log(obj);

    }

    

    // let date = new Date();
    // let currentYear = date.getFullYear();

    // let currentmonth = date.getMonth();
    // let years = [];
    // for(let i = 1947; i<= currentYear;i++){
    //      years.push(i);
    // }
    // const Year =  years.map((item)=>{
    //     console.log(item);
    //     <option key={item.toString()}>{item}</option>
        
        
    // })
    

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.Workexp}>
                    <span>Work Experience</span>
                </div>
                <div className={styles.headertitle}>Start with your most recent position</div>

                <div className={styles.label}>Job Title</div>
                <div className={styles.inputbox}><input type='text' onChange={change} id='jobTitle' value={form.jobTitle} /></div>
                <div className={styles.label}>Company</div>
                <div className={styles.inputbox}><input type='text'onChange={change} id='company' value={form.company} /></div>
                <div className={styles.flex}>
                    <div className={styles.label} style={{ display: "flex" }}>City/Town
                        <div className={styles.label2}>Country</div>
                    </div>
                    <div className={styles.inputbox}>
                        <input type='text' className={styles.small} onChange={change} id='city' value={form.city}  />
                        <input type='text' className={styles.small} style={{ marginLeft: "20px" }} onChange={change} id='country' value={form.country} />
                    </div>
                    <div className={styles.label}>Start Date</div>
                    <div className={styles.inputbox}>
                        <select className={styles.Month} onChange={change} id='startMonth'value={form.startMonth}>
                            <option  value=""disabled selected>Month</option>
                            <option >January</option>
                            <option >February</option>
                            <option >March</option>
                            <option >April</option>
                            <option >May</option>
                            <option >June</option>
                            <option >July</option>
                            <option >August</option>
                            <option >September</option>
                            <option >October</option>
                            <option >November</option>
                            <option >December</option>
                        </select>
                        <select className={styles.Year} onChange={change} id='startYear'value={form.startYear}>
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
                    <div className={styles.label}>End Date</div>
                    <div className={styles.inputbox}>
                        <select className={styles.Month}onChange={change} id='endMonth'value={form.endMonth}>
                            <option value ="" disabled selected>Month</option>
                            <option >January</option>
                            <option >February</option>
                            <option >March</option>
                            <option >April</option>
                            <option >May</option>
                            <option >June</option>
                            <option >July</option>
                            <option >August</option>
                            <option >September</option>
                            <option >October</option>
                            <option >November</option>
                            <option >December</option>
                        </select>
                        <select className={styles.Year} onChange={change} id='endYear'value={form.endYear}>
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
                    <div className={styles.label}>
                        <input type='checkbox' style={{ height: '20px', width: '20px', marginTop: '5px' }} />
                        <label>  Currently Work Here</label>

                        <div className={styles.label}>Description</div>
               <textarea rows="10" cols="78" name="comment" placeholder='Enter work experience description' onChange={change} id='description' value={form.description} style={{ paddingTop: '10px', paddingLeft: '5px' }}/>
               

                    </div>

                    <div className={styles.submit}>

                        <Link to={!form.isInvalid ?'/education':''}><input type="submit" onClick={handleChange}  /></Link>
                    </div>
                    <div className={styles.back}>
                        <Link to='/contactinfo' style={{ textDecoration: "none" }}><a style={{ color: '#03acbb', fontWeight: 'bold' }}> Back </a></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

