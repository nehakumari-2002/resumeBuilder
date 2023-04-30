import React, { useState } from 'react'
import styles from "../../Styles/finalpage.module.css"
import Template1 from './Template1'
import Template2 from './Template2'
import Template3 from './Template3';

export default function Slider(props) {
 const [defaultTemplate,setDefaultTemplate] = useState(<Template1/>);
  var diffTemp = [
    {temp:<Template1  />,name:"temp1"}, {temp:<Template2 />, name:"temp2"},{temp:<Template3/> , name:"temp3"}
  ]
  function tempSet(layout) {
    props.temp(layout)
  }

  return (
    <div>
      <div className={styles.rightcontainertop} >
      {
        diffTemp.map((ele,index) => {
          
          return (
            
            <div key={index}>
              <button onMouseOver={() => tempSet(ele.temp)} onMouseLeave={() => tempSet(defaultTemplate)} onClick={()=>setDefaultTemplate(ele.temp)} >{ele.name}</button>
              
            </div>
          )
        })
      }
      <button onClick={props.cross}>x</button>
</div>
    </div>
  )
}
