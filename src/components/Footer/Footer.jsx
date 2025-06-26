import React from 'react';
import './Footer.css';
import '../../index.css'


const Footer = () => {
  return (
    <>
    <footer>
        <div className="footer-logo container-margin">
          <h1>IMS</h1>
        </div>
        <div className="rights">
            <p>Privacy Notice</p>
            <p>© 2025 Verisk Nepal Pvt. Ltd. All rights reserved.</p>
        </div>
        <div className="company-name container-margin">
            <h5>VERISK ANALYTICS ®</h5>
        </div>
    </footer>
    </>
  )
}

export default Footer