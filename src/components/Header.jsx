import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Header = ({logInStatus,currentUser,setCurrentUser}) => {
  function closeNavbar() {
    var navNavbar = document.getElementById("navNavbar");
    var bootstrapButton = document.querySelector(".navbar-toggler");
    if (navNavbar.classList.contains("show")) {
      bootstrapButton.click(); // Click the button to close the Navbar
    }
  }
  function closeSearchbar() {
    var navNavbar = document.getElementById("mynavbar");
    var bootstrapButton = document.querySelector(".search-toggler");
    if (navNavbar.classList.contains("show")) {
      bootstrapButton.click(); // Click the button to close the search
    }
  }
  function logOut() {
    setCurrentUser("")
    location.reload()
    
  }
  return (
    <header className="p-0 m-0 container-fluid fixed-top">
      <nav className="navbar navbar-light fixed-top  navbar-expand-sm p-0 justify-content-space-between bg-dark navbar-dark">
        <div className="container-fluid">
          <div className="shoeLogo navbar-text text-light ms-2 navbar-brand h1">
            BJ Kicks
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navNavbar"
            aria-controls="navNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navNavbar"
          >
            <ul className="navbar-nav">
              <li className="nav-item mx-2 ">
                <a
                  className="nav-link text-light logoutElem"
                  onClick={closeNavbar}
                >
                  {logInStatus&& <i className="bi bi-box-arrow-left " id="logoutIcon" onClick={logOut}> {currentUser}</i>}
                  {!logInStatus&& <i
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    className="bi bi-person-circle"
                  ></i>}
                  
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link text-light navPro"
                  href="#Products"
                  onClick={closeNavbar}
                >
                  Products
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link text-light navContacts"
                  href="#contacts"
                  onClick={closeNavbar}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
