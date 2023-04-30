import React,{useEffect, useState} from 'react'
import styles from '../../Styles/finalpage.module.css'
import {useDispatch,useSelector} from "react-redux"
import { finalizeAction } from '../../Actions/finalizeAction';
import Slider from './Slider';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Template1 from './Template1';

export default function Sidebar(props) {

    const finalizeReducer = useSelector((state) => state.finalizeReducer);
    const [doc, setdoc] = useState(finalizeReducer.doc)
    
   const [Layout,setLayout] = useState(<Template1/>)
  
  
    const dispatch = useDispatch();
  
    function handleChange(e) {
      const { name, value } = e.target;
      console.log(name, value);
      setdoc({
        ...doc,
        [name]: value,
  
      })
      // console.log(doc);
  
  
    }
    React.useEffect(() => {
      dispatch(finalizeAction(doc))
    }, [doc])
  
  
    let colorArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const[slider,setSlider] = useState(false)

function buttonChange(){
  setSlider(
     true
    
  )

  

}
useEffect(()=>{
  
},[slider])

function cross(){
  
  setSlider(false
  )
  console.log("cross",slider);
}

function changeTemplate(layout){
  setLayout(layout)

}

useEffect(()=>{
  props.changeTemplate(Layout)
},[Layout])

 if(slider){
   return <Slider cross={cross} temp={changeTemplate}/>



 } 
 
 const downloadResume = () => {
  const input = document.getElementById("resumeCapture");
  html2canvas(input).then((canvas) => {
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    pdf.addImage(img, "JPEG", 0, 0, width, height);
    pdf.save("resume.pdf");
  });
};
 
 return (
    <div>
       {/* right side styling */}
       <div className={styles.right}>
        <div className={styles.rightcontainertop}>
          <h1 className={styles.header}>Here's Your Resume</h1>
          <p className={styles.headertitle}>What do you want to do next?</p>
          <h4 style={{ marginLeft: "20px" }}>Export Options</h4>
          <div className={styles.button}>
            <div><button className={styles.btn1} style={{ background: "#8cc53e" }} onClick={downloadResume}>Download</button></div>
            <div><button className={styles.btn1} >Print</button></div>
            <div><button className={styles.btn1}>Email</button></div>
            <hr></hr>


          </div>
          <div className={styles.formatting}>
            <h4 style={{ marginBottom: "10px" }}>Formatting Options</h4>
            <div className={styles.layout}>
              <div>Layout</div>
              <button className={styles.layoutbutton}>CONDENSED</button>
              <button className={styles.layoutbutton}>STANDARD</button>
              <button className={styles.layoutbutton}>EXPANDADE</button>


            </div>

            <div className={styles.font}>
              <div>
                <p style={{ marginBottom: "5px" }}>Font Style</p>

                <select className={styles.drop} name="fontfamily" onChange={handleChange}>

                  <option value={1}>Raleway</option>
                  <option value={2}>Ubuntu</option>
                  <option value={3}>Montserrat</option>
                  <option value={4}>Source Sans Pro</option>
                  <option value={5}>Hind</option>
                  <option value={6}>Times New Roman</option>
                  <option value={7}>Roboto</option>
                </select>
              </div>
              <div><p style={{ marginBottom: "5px" }}>Font Size</p>
                <select className={styles.drop} name="fontsize" onChange={handleChange} >

                  <option value={1}  >Small</option>
                  <option value={2} >Medium</option>
                  <option value={3}>Large</option>
                </select>
              </div>
            </div>
            <div className={styles.color}>
              <p style={{ marginBottom: "5px" }}>Colors</p>
              <div className={styles.font}>
                {

                  colorArr.map(ele => (
                    <div key={ele}><input type='checkbox' name="color" value={ele} onClick={handleChange} className={`${styles.ckbx} color${ele}`} /></div>
                  ))
                }
                {/* <div><input type='checkbox' onClick={handleChange} name='color' value={1} className={styles.ckbx} style={{ background: "green" }} /></div>
                <div><input type='checkbox' onClick={handleChange} name='color' value={2} className={styles.ckbx} style={{ background: "aqua" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "hotpink" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "mediumspringgreen" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "darkturquoise" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "orange" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "lightblue" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "lightgreen" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "yellow" }} /></div>
                <div><input type='checkbox' className={styles.ckbx} style={{ background: "#305fec" }} /></div> */}

              </div>

            </div>

          </div>
          <hr></hr>
          <div><button className={styles.btn1} >+Add New Section</button></div>
          <div><button className={styles.btn1} onClick={buttonChange} >Change Template</button></div>
        </div>

      </div>
    </div>
  )
}
