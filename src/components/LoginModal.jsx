import { useState } from "react"
import React  from 'react'
import shoes from "../apiCalls/requests"
import axios from "axios"

const shoesRequests = shoes(axios)

const LoginModal = ({setLogInStatus,setCurrentUser,setUserRole}) => {
    const [loginFormData, setLoginFormData] = useState(
        {username: "", password: ""}
    )
    
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setLoginFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function hanleSubmit(event){
        event.preventDefault()
        shoesRequests.login(loginFormData.username,loginFormData.password)
        .then((results) => {
            setLogInStatus(true)
            let response = results.data;
            // if (response.role === 'admin') {
                
            //     addShoeCanvasButton.style.display = 'flex'
            // }


            // if (response.error) {
            //     loginMess.innerHTML = response.error
            //     setTimeout(() => {
            //         loginMess.innerHTML = ""
            //     }, 3000)
            //     return
            // }
            if (response.status === 'success') {
                const bootstrapLoginModal = document.querySelector(".btn-close")
                // localStorage.setItem("loginUser", name);
              
                bootstrapLoginModal.click()
                // location.reload()
               setUserRole(response.role)
               setCurrentUser(response.username)

            }
        }).catch((error)=> {
            // handle error
            console.error(error);
          })
        


    }

    
  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="login-box ">
              <div className="error text-center">
                <p className="loginMess text-danger "></p>
              </div>
              <div className="usename-box form-group mt-2">
                <label htmlFor="usename" className="loginLabel">Name</label>
                <input type="text" name="username" id="usename" className="form-control login-username"onChange={handleChange} value={loginFormData.username} required/>
              </div>
              <div className="password-box form-group mt-3">
                <label htmlFor="password" className="loginLabel">Password</label>
                <input value={loginFormData.password} type="password" name="password" id="password" className="form-control login-password"onChange={handleChange} required/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal"
              data-bs-target="#signUpModal">SignUp</button>
            <button type="button" className="btn btn-primary logInButton" onClick={hanleSubmit}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal