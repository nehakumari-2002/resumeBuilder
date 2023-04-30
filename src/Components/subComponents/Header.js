import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from '../../Styles/header.module.css'
import{useSelector}from 'react-redux'

export default function Header() {
const{signinReducer} = useSelector((state)=>state)
   const location = useLocation();
    

console.log(signinReducer);



    return (
        <>
            <div  className={styles.logo}>
                <Link to="/">

                    <img src='images/images/applogo.png' style={{height:"50px"}}/>
                </Link>
            </div>
            <div className={styles.contents}>
                <div >
                    Resume Templates
                </div>
                <div >
                    About Us
                </div>
                {!signinReducer.uid && <div  className={`${styles.signupbtn} ${location.pathname=='/signup'? styles.active:''}`}>
                    <Link to='/signup' style={{ textDecoration: "none",color:"Black" }}>
                        Create Account
                    </Link>
                </div> }
                
                <div  className={`${styles.loginbtn} ${location.pathname=='/login'?  styles.active:'' }`}>
                    <Link to='/login' style={{ textDecoration: "none",color:"Black" }}>
                        {signinReducer.name? signinReducer.name:'Login'}
                    </Link>
                </div>
            </div>
        </>
    )
}
