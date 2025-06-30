import React from 'react'
import './Navbar.css'
import '../../index.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
    <nav>
        <div className="nav-logo">
        <Link to="/">
    <h1 className='nav-links'>IMS</h1>
</Link>
        </div>
        <div className="nav-items">
           <ul>
            <Link to="/inventory" className='nav-links'>Inventory</Link>
            </ul>
            <ul>
            <Link to="/login" className='nav-links'>Login/Signup</Link>
            </ul>
        </div>
        </nav>
        </>
  )
}

export default Navbar