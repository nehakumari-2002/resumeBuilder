import React,{useState} from 'react'
import styles from "../../Styles/finalpage.module.css"
import{useSelector}from"react-redux"

export default function Template1() {

    const { ContactUpdate } = useSelector((state) => state)
    const { workExpReducer } = useSelector((state) => state)
    const { educationUpdate } = useSelector((state) => state)
    const { skillsReducer } = useSelector((state) => state)
    const { summaryUpdate } = useSelector((state) => state)


    const data = Object.values(skillsReducer);

    const finalizeReducer = useSelector((state) => state.finalizeReducer);
    // const [doc, setdoc] = useState(finalizeReducer.doc)
    

    const colorClass = "color" + finalizeReducer.doc.color;
    const fontsizeClass = "fontsize" + finalizeReducer.doc.fontsize;
    const fontfamilyClass = "fontfamily" + finalizeReducer.doc.fontfamily;



    function getDate(month, year) {
        console.log(month, year);
        var date = new Date(`1-${month}-${year}`)
        var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var month = monthName[date.getMonth()]
        return `${month} ${year}`
      }
  return (
    <div>
       <div className={styles.left} >
        <div id ="resumeCapture" className={`${styles.leftcontainer} ${fontfamilyClass}`}>
                                                 {/* contactinfo */}
          {ContactUpdate.name &&
            (<div><div style={{ display: 'flex' }}><div className={`${styles.box} ${colorClass}`
            }>BP</div>
              <h1>{ContactUpdate.name}</h1></div>

              <p className={fontsizeClass}>{ContactUpdate.streetAddress},{ContactUpdate.city},{ContactUpdate.country},{ContactUpdate.phonenumber},{ContactUpdate.phonenumber2}</p>
              <p className={fontsizeClass}>{ContactUpdate.email}</p></div>)
          }

                               {/* experience */}
                               {/* render this section  if  experience containg company name */}

          {workExpReducer.company &&
            (<div className={`${styles.experience} ${fontsizeClass}`}>
              <div style={{ fontWeight: 'bolder', padding: "10px", color:"white" }} className={`${styles.heading} ${colorClass}`
              }>EXPERIENCE</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p >{workExpReducer.jobTitle}</p>
                <p>{getDate(workExpReducer.startMonth, workExpReducer.startYear)}- {getDate(workExpReducer.endMonth, workExpReducer.endYear)}</p>

              </div>
              <p style={{ fontSize: "small", marginTop: "0px" }}>{workExpReducer.company} | {workExpReducer.city}, {workExpReducer.country}</p>
              <div className={styles.description}>{workExpReducer.description}</div>
            </div>)
          }
                                                      {/* EDUCATION */}

          {educationUpdate.schoolname && (<div className={`${styles.education} ${fontsizeClass}`}>
            <p style={{ marginLeft: "0px", fontWeight: 'bolder', padding: "10px",color:"white" }} className={`${styles.heading} ${colorClass}`
            }>EDUCATION</p>

            <div style={{ display: "flex", justifyContent: "space-between", }}>
              <p>{educationUpdate.degree}</p>
              <p>{educationUpdate.month} - {educationUpdate.year}</p>
            </div>
            <p style={{ marginTop: "5px" }} >{educationUpdate.schoolname},{educationUpdate.city},{educationUpdate.country}</p>
            <div className={styles.description}>{educationUpdate.description}</div>
          </div>)}

                                                            {/* SKILLS */}

          <div className={`${fontsizeClass} ${styles.skill}`}>
            <p style={{ marginLeft: "0px", fontWeight: 'bolder', padding: "10px",color:"white" }} className={`${styles.heading} ${colorClass}`
            }>SKILLS</p>
            <div className={styles.skill} >



              <ul className={styles.skills}>
                {data.map((ele,index)=>{
                  return(
                 <li>{ele}</li>
                  )
                })}
               
              </ul>
            </div>
          </div>

                                                                 {/* SUMMARY */}
          {summaryUpdate.value && (<div className={fontsizeClass}>
            <p style={{ marginLeft: "0px", fontWeight: 'bolder', padding: "10px",color:"white" }} className={`${styles.heading} ${colorClass}`
            }>SUMMARY</p>
            <div className={styles.description}>{summaryUpdate.value}</div>
          </div>)}



        </div>

      </div>
    </div>
  )
}
