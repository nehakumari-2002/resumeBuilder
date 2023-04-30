import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/home.module.css'

export default function Home() {
  return (
    <div>
      <Link to='/contactinfo' style={{ textDecoration: "none" }}>
                        Start
                    </Link>
      
    </div>
  )
}
