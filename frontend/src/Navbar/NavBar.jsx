import React from 'react'
import { useNavigate } from "react-router-dom";
import "./NavBar.css"

function NavBar() {
    let navigate = useNavigate();
  return (
    <div className='nav-bar'>
        <ul>
            <li><button onClick={() => navigate('/home')} >Home</button></li>
            <li><button onClick={() => navigate('/practice')} >Practice</button></li>
            <li><button onClick={() => navigate('/all-words')} >All Words</button></li>
            <li><button onClick={() => navigate('/test')} >Test</button></li>
            <li><button onClick={() => navigate('/stats')} >Stats</button></li>
        </ul>
    </div>
  )
}

export default NavBar