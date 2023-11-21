import { useState } from "react";
import React from "react";
import shoes from "../apiCalls/requests";
import axios from "axios";
axios.defaults.withCredentials = true;
const shoesRequests = shoes(axios);

const LoginModal = ({ setCurrentUser, setUserRole,logInError,setLogInError }) => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value} = event.target;
    setLoginFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function hanleSubmit(event) {
    event.preventDefault();
    await shoesRequests
      .login(loginFormData.email, loginFormData.password)
      .then((results) => {
        
        let response = results.data;

        if (response.error) {
          setLogInError(response.error)
            setTimeout(() => {
              setLogInError("")
            }, 3000)
            return
        }
        if (response.status === "success") {
          const bootstrapLoginModal = document.querySelector(".btn-close");
          bootstrapLoginModal.click();
          if(response.role==="admin"){
            localStorage.setItem("role",response.role)
            setUserRole(response.role);
          }
          localStorage.setItem("CurrentUser",response.username)
          setCurrentUser(response.username);
          location.reload()
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="loginModalLabel">
              Login
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="login-box ">
              <div className="error text-center">
                <p className="loginMess text-danger ">{logInError}</p>
              </div>
              <div className="usename-box form-group mt-2">
                <label htmlFor="usename" className="loginLabel">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="loginEmail"
                  className="form-control login-username"
                  onChange={handleChange}
                  value={loginFormData.email}
                  required
                />
              </div>
              <div className="password-box form-group mt-3">
                <label htmlFor="password" className="loginLabel">
                  Password
                </label>
                <input
                  value={loginFormData.password}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control login-password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#signUpModal"
            >
              SignUp
            </button>
            <button
              type="button"
              className="btn btn-primary logInButton"
              onClick={hanleSubmit}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
