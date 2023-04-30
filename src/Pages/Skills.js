import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/skills.module.css"
import { useDispatch, useSelector } from "react-redux"
import skillsfill from '../Actions/skillsAction'
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

export default function Skills() {
  const [skill, setSkill] = useState(["","","",""])
  

  const db = getFirestore();
  const { signinReducer } = useSelector((state) => state)
  const { skillsReducer } = useSelector((state) => state)
  const dispatch = useDispatch();
  
  const [form, setForm] = useState({})

  let obj = {};
  function handleChange(e) {
    let { id, value } = e.target;
    // [id]=value;
    console.log("new",id);
    console.log("sk",skill);
    // const upskill = skill.splice(id,0,value);
  //   console.log("length",skill.length);
  //   const upskill =   [
  //     ...skill.arr.slice(0,id),
  //     value,
  //     ...skill.arr.slice(id+1),
  // ]

    // console.log(upskill);

skill[id] = value
    setSkill([
      ...skill
    ])
    console.log("sklast",skill);
  }

  async function submit() {
   

    dispatch(skillsfill(skill));

    const userdoc = doc(db, "user", signinReducer.uid);
    console.log(signinReducer.uid);
    var user = await getDoc(userdoc);
    user = user.data()
    console.log(user);
    await setDoc(userdoc, { ...user, skills: obj });



  }
  function add() {
    setSkill(
       [...skill,""]
    
    )

  }

  function remove(i) {

    var data = skill.arr;
    data.splice(i, 1);
console.log(data);
    setSkill({arr:[
      ...data,
    ]})
   
  }
  console.log(skill);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.Skills}>
          <span>Skills</span>
        </div>
        <div className={styles.headertitle}>Add a few skills to show employers what you're good at.</div>

        {

          skill.map((element, index) => {
            console.log("in",index);
            return (<div key={index} className={styles.inputbox}>
              <input type='text' placeholder={`skill${index + 1}`} onChange={(e)=>handleChange(e)} id={index}  value={element.index} />
              <i onClick={() => remove(index)} className="fa fa-trash"></i>
            </div>)

          })
        }
        {/* <div className={styles.inputbox}><input type='text' placeholder='Skill2' onChange={handleChange} id='skill2' value={form.skill2} /><i class="fa fa-trash"></i></div> */}
        {/* <div className={styles.inputbox}><input type='text' placeholder='Skill3' onChange={handleChange} id='skill3' value={form.skill3} /><i class="fa fa-trash"></i></div>
        <div className={styles.inputbox}><input type='text' placeholder='Skill4' onChange={handleChange} id='skill4' value={form.skill4} /><i class="fa fa-trash"></i></div>
        <div className={styles.inputbox}><input type='text' placeholder='Skill5' onChange={handleChange} id='skill5' value={form.skill5} /><i class="fa fa-trash"></i></div>
        <div className={styles.inputbox}><input type='text' placeholder='Skill6' onChange={handleChange} id='skill6' value={form.skill6} /><i class="fa fa-trash"></i></div>
        <div className={styles.inputbox}><input type='text' placeholder='Skill7' onChange={handleChange} id='skill7' value={form.skill7} /><i class="fa fa-trash"></i></div> */}
        <button onClick={add} >Add more Skills ++</button>
        <div className={styles.submit}>
          <Link to='/summary'><input type="submit" onClick={submit} value="SAVE & CONTINUE" /></Link>
        </div>
        <div className={styles.back}>
          <Link to='/education' style={{ textDecoration: "none", color: '#03acbb', fontWeight: 'bold' }} >  Back </Link>
        </div>
      </div>
    </div>
  )
}
