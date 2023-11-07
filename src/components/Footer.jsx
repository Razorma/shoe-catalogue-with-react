import React from 'react'

const Footer = () => {
  return (
    <footer className=" bg-dark footer-dark">
      <div className="col contact-links container-fluid justify-content-center">
        <a href="https://www.linkedin.com/in/bheka-lushaba-0a6a0021a/" id="profile-link" target="_blank">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a id="profile-link" href="mailto:bheka.bj@gmail.com" className="contact-details">
          <i className="fa-solid fa-envelope c-light"></i>
        </a>
      </div>
      <div className="footerMessage">
        <p>© 2022 BJkicks, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer