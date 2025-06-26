import React from 'react'
import navLogo from '../../assets/verisk_h_white_logo.png'
import './Navbar.css'
import '../../index.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
    <nav>
        <div className="nav-logo">
        <Link to="/">
  <img className="logo-img" src={navLogo} alt="verisk white logo" />
</Link>
        </div>
        <div className="nav-items">
            <ul>
            <Link to="/login" className='nav-links'>Login/Signup</Link>
            </ul>
        </div>
        </nav>
        </>
  )
}

export default Navbar