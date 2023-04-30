import React, { useState } from 'react'
import Template1 from '../Components/subComponents/Template1'
import Sidebar from '../Components/subComponents/Sidebar'
import Template from '../Components/subComponents/Template'
// import Slider from '../Components/subComponents/Slider'


export default function Finalpage() {
const [template,setTemplate] = useState(<Template1/>)
  function changeTemplate(layout){
 setTemplate(layout)
  }
 
  return (
    <div>
      
     <Template template={template}/>
     <Sidebar changeTemplate={changeTemplate} />
     {/* <Slider/> */}

     
    </div>
  )
}
